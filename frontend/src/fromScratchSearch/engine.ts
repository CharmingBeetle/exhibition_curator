import axios from "axios"
import type { Artwork, SearchFilters } from "../types/artwork"

// Base URLs for the external museum APIs we talk to
const MET_API_URL = "https://collectionapi.metmuseum.org/public/collection/v1"
const HARVARD_API_URL = "https://api.harvardartmuseums.org/object"
const HARVARD_API_KEY = import.meta.env?.VITE_HARVARD_API_KEY

// Default number of results we fetch per "page"
const PAGE_SIZE = 10
// Harvard lets us request more per page, so we use a slightly higher cap when searching
const MAX_HARVARD_PAGE_SIZE = 20

// Enriched artwork type that stores the calculated relevance score alongside existing fields
type RankedArtwork = Artwork & { score: number }

// Helper: clean up any text coming from the APIs so comparisons work reliably
const normalizeText = (value: string | undefined | null): string => {
  if (!value) {
    return ""
  }

  // We lower-case, strip accents and ensure everything is in plain ASCII-friendly form
  console.log("value", value)
  return value
    .toString() // Convert the value to a string
    .toLowerCase() // Lowercase the text
    .normalize("NFD") // Normalize the text to remove accents
    .replace(/\p{Mn}/gu, "") // Remove accents
}

// Helper: split a string into individual searchable tokens (words/numbers)
const tokenize = (value: string): string[] =>
  value
    .split(/[^\p{L}\p{N}]+/u) // Split the value into tokens using a regular expression
    .map((token) => token.trim()) // Trim each token
    .filter(Boolean) // Remove any empty tokens

// Scoring helper: reward an artwork when a token from the query shows up in a specific field
const computeTokenMatches = (source: string, tokens: string[], weight: number): number => {
  if (!source || tokens.length === 0 || weight <= 0) { // If the source is empty, the tokens are empty, or the weight is less than or equal to 0, return 0
    return 0
  }

  let score = 0

  for (const token of tokens) { // For each token in the tokens array, check if the source includes the token
    if (source.includes(token)) { // If the source includes the token, add the weight to the score
      // Longer tokens are a bit more specific, so we lightly boost them
      const tokenLengthBoost = Math.min(2, token.length / 5) // The token length boost is the minimum of 2 and the token length divided by 5
      score += weight * (1 + tokenLengthBoost) // Add the weight multiplied by 1 plus the token length boost to the score
    }
  }
  console.log("score", score)
  return score 
}

// Scoring helper: reward exact phrase matches (e.g. the full query appears in the title)
const computePhraseMatch = (source: string, query: string, weight: number): number => {
  if (!source || !query) {
    return 0
  }

  if (source.includes(query)) { // If the source includes the query, return the weight multiplied by 1.5 plus the query length boost
    // Slightly increase the reward for longer queries (they tend to be more precise)
    const queryLengthBoost = Math.min(3, query.length / 6) // The query length boost is the minimum of 3 and the query length divided by 6
    console.log("queryLengthBoost", queryLengthBoost)
    console.log("weight", weight)
    return weight * (1.5 + queryLengthBoost) // Return the weight multiplied by 1.5 plus the query length boost
  }

  return 0 // If the source does not include the query, return 0
}

// Main scoring formula: produce a numeric relevance score for a single artwork
const calculateScore = (artwork: Artwork, filters: SearchFilters): number => {
  // Preprocess the user query once (lowercase, remove accents, split into words)
  const normalizedQuery = normalizeText(filters.query)
  const tokens = tokenize(normalizedQuery)

  // Normalize the artwork fields we care about so comparisons are easier
  const title = normalizeText(artwork.title)
  const artist = normalizeText(artwork.artist)
  const medium = normalizeText(artwork.medium)
  const classification = normalizeText(artwork.classification)
  const culture = normalizeText(artwork.culture)
  const department = normalizeText(artwork.department)
  const period = normalizeText(artwork.period)
  const objectName = normalizeText(artwork.objectName)
  const tags = (artwork.tags ?? []).map((tag) => normalizeText(tag.term))
  const description = normalizeText(artwork.description)

  let score = 0

  // If the user did not type a search term (and no artist filter), gently rank results
  if (tokens.length === 0 && !filters.artist.trim()) {
    // Harvard pieces get a small bonus so they appear near the top when relevant
    score += artwork.museum === "harvard" ? 2 : 1
    // Featured works and images get tiny nudges so nicer entries rise up
    score += artwork.isHighlight ? 0.5 : 0
    score += artwork.image ? 0.25 : 0
    console.log("score", score)
    return score
  }

  // Core scoring: title and artist carry heavy weight, supporting fields earn smaller bumps
  score += computeTokenMatches(title, tokens, 6) 
  score += computeTokenMatches(artist, tokens, 4.5)
  score += computeTokenMatches(medium, tokens, 2)
  score += computeTokenMatches(classification, tokens, 1.8)
  score += computeTokenMatches(culture, tokens, 1.6)
  score += computeTokenMatches(department, tokens, 1.4)
  score += computeTokenMatches(period, tokens, 1.2)
  score += computeTokenMatches(objectName, tokens, 1)
  score += computeTokenMatches(description, tokens, 0.8)

  // Tags (keywords provided by the museums) help when available
  for (const tag of tags) {
    score += computeTokenMatches(tag, tokens, 1.5)
  }

  // Exact phrase matches can give a strong boost (think "harvard portrait gallery")
  score += computePhraseMatch(title, normalizedQuery, 4)
  score += computePhraseMatch(artist, normalizedQuery, 3)

  // Respect the dedicated artist filter by adding a significant bonus when it lines up
  if (filters.artist.trim()) {
    const normalizedArtistFilter = normalizeText(filters.artist)
    if (artist.includes(normalizedArtistFilter)) {
      score += 5
    } else if (title.includes(normalizedArtistFilter)) {
      // Occasionally the artist shows up in the title instead
      score += 2
    }
  }

  // Smaller nudges for matching optional filters (medium, classification, department, etc.)
  if (filters.medium.trim() && medium.includes(normalizeText(filters.medium))) { //
    score += 1.5
  }

  if (filters.classification.trim() && classification.includes(normalizeText(filters.classification))) {
    score += 1.2
  }

  if (filters.department.trim() && department.includes(normalizeText(filters.department))) {
    score += 1.2
  }

  if (filters.country.trim()) {
    const normalizedCountry = normalizeText(filters.country)
    if (culture.includes(normalizedCountry) || normalizeText(artwork.country).includes(normalizedCountry)) {
      score += 1.2
    }
  }

  // Reward pieces whose dates fall inside the selected date range
  if (filters.dateFrom !== null || filters.dateTo !== null) {
    const year = extractYear(artwork) 
    if (year !== null) {
      const inLowerBound = filters.dateFrom === null || year >= filters.dateFrom
      const inUpperBound = filters.dateTo === null || year <= filters.dateTo
      if (inLowerBound && inUpperBound) {
        score += 1
      }
    }
  }

  // Additional small preference for Harvard results so they surface quickly
  if (artwork.museum === "harvard") {
    score *= 1.05
    score += 2
  }

  // Finishing touches: highlights and imagery gently lift a piece
  if (artwork.isHighlight) {
    score += 0.75
  }

  if (artwork.image) {
    score += 0.5
  }

  // Keep the score tidy (few decimals) so downstream sorting is stable
  console.log("score", score)
  return Number(score.toFixed(3))
}

// Tries to infer an approximate year for an artwork using date-like fields
const extractYear = (artwork: Artwork): number | null => {
  const fields = [artwork.date, artwork.period, artwork.title]

  for (const field of fields) {
    const normalized = field?.toString()
    if (!normalized) {
      continue
    }

    // Look for a three or four digit number (possibly negative for BC dates)
    const match = normalized.match(/(-?\d{3,4})/)
    if (match) {
      console.log("match", match)
      return Number.parseInt(match[0], 10)
    }
  }

  return null
}

// Fetch results from the Met API (unless the user explicitly chose Harvard-only)
const searchMetMuseum = async (filters: SearchFilters, offset: number): Promise<Artwork[]> => {
  if (filters.museum === "harvard") {
    return []
  }

  try {
    const params = new URLSearchParams()

    // The Met API accepts a single query string, so we merge text and artist inputs
    const combinedQuery = [filters.query, filters.artist].filter((value) => value && value.trim().length > 0)
    if (combinedQuery.length > 0) {
      params.append("q", combinedQuery.join(" "))
    } else {
      // Their API requires something, so fall back to a generic term when empty
      params.append("q", "art")
    }

    params.append("hasImages", filters.hasImage ? "true" : "false")

    const searchUrl = `${MET_API_URL}/search?${params.toString()}`
    const response = await axios.get(searchUrl)

    const objectIDs: number[] = response.data?.objectIDs ?? []
    if (!Array.isArray(objectIDs) || objectIDs.length === 0) {
      console.log("objectIDs", objectIDs)
      return []
    }

    // Paginate the detailed lookups by slicing the IDs we fetch this round
    const start = Math.max(0, offset)
    const end = start + PAGE_SIZE
    const idsToFetch = objectIDs.slice(start, end)

    const artworks = await Promise.all(idsToFetch.map((id) => getMetObjectDetails(id)))
    // Filter out null entries (e.g. if the API failed for a specific object)
    return artworks.filter((artwork): artwork is Artwork => Boolean(artwork))
  } catch (error) {
    console.error("[fromScratchSearch] Error searching Met Museum", error)
    return []
  }
}

// Retrieve the full detail for a single Met object ID
const getMetObjectDetails = async (id: number): Promise<Artwork | null> => {
  try {
    const response = await axios.get(`${MET_API_URL}/objects/${id}`)
    const data = response.data

    if (!data) {
      return null
    }

    // Map the raw API response into our shared Artwork shape so the UI stays consistent
    console.log("data", data)
    return {
      id: data.objectID?.toString() ?? id.toString(),
      title: data.title ?? "Untitled",
      artist: data.artistDisplayName || "Unknown",
      image: data.primaryImage || data.primaryImageSmall,
      thumbnailURL: data.primaryImageSmall,
      department: data.department,
      classification: data.classification,
      date: data.objectDate,
      period: data.period,
      culture: data.culture,
      country: data.country,
      objectName: data.objectName,
      medium: data.medium,
      dimensions: data.dimensions,
      description: data.creditLine,
      museum: "met",
      museumUrl: data.objectURL,
      isHighlight: Boolean(data.isHighlight),
      tags: Array.isArray(data.tags)
        ? data.tags.map((tag: any) => ({ term: tag?.term ?? "" }))
        : undefined,
    }
  } catch (error) {
    console.error(`[fromScratchSearch] Error fetching Met object ${id}`, error)
    return null
  }
}

// Fetch results from the Harvard API (unless the user explicitly chose Met-only)
const searchHarvardMuseum = async (filters: SearchFilters, offset: number): Promise<Artwork[]> => {
  if (filters.museum === "met") {
    return []
  }

  if (!HARVARD_API_KEY) {
    console.warn("[fromScratchSearch] Harvard API key missing. Add VITE_HARVARD_API_KEY to use Harvard search.")
    return []
  }
  
  try {
    const params = new URLSearchParams()
    params.append("apikey", HARVARD_API_KEY)
    params.append("hasimage", filters.hasImage ? "1" : "0")

    const normalizedQuery = filters.query.trim()
    if (normalizedQuery.length > 0) {
      params.append("q", normalizedQuery)
    }

    if (filters.artist.trim()) {
      params.append("person", filters.artist.trim())
    }

    if (filters.department.trim()) {
      params.append("department", filters.department.trim())
    }

    if (filters.medium.trim()) {
      params.append("medium", filters.medium.trim())
    }

    if (filters.classification.trim()) {
      params.append("classification", filters.classification.trim())
    }

    if (filters.country.trim()) {
      params.append("culture", filters.country.trim())
    }

    if (filters.dateFrom !== null) {
      params.append("datebegin", String(filters.dateFrom))
    }

    if (filters.dateTo !== null) {
      params.append("dateend", String(filters.dateTo))
    }
    console.log("params", params)
    // Harvard can return more per page when a text query is provided (useful for ranking)
    const effectivePageSize = filters.query.trim() ? MAX_HARVARD_PAGE_SIZE : PAGE_SIZE
    params.append("size", String(effectivePageSize))

    // Harvard paginates differently (1-indexed pages), so we convert our offset
    const page = Math.floor(offset / PAGE_SIZE) + 1
    params.append("page", page.toString())

    const url = `${HARVARD_API_URL}?${params.toString()}`
    const response = await axios.get(url)
    const records = Array.isArray(response.data?.records) ? response.data.records : []

    console.log("response", response)
    console.log("records", records)
    return records
      .map((record: any): Artwork | null => { // map the records to the Artwork type
        const imageData = record.images?.[0] // get the first image data
        let imageUrl: string | undefined // define the image url

        // Prefer the high quality IIIF images when available // if the image data has an iiifbaseuri and the image permission level is 1, set the image url to the iiifbaseuri
        if (imageData?.iiifbaseuri) {
          if (record.imagepermissionlevel === 1) {
            imageUrl = `${imageData.iiifbaseuri}/full/256,/0/default.jpg`
          } else { // if the image permission level is not 1, set the image url to the iiifbaseuri with the full size and default quality
            imageUrl = `${imageData.iiifbaseuri}/full/full/0/default.jpg` // set the image url to the iiifbaseuri with the full size and default quality
          }
        }

        // Fall back to other image URLs if the IIIF data is missing
        if (!imageUrl && typeof record.primaryimageurl === "string") {
          imageUrl = record.primaryimageurl
        }

        if (!imageUrl && typeof record.baseimageurl === "string") {
          imageUrl = `${record.baseimageurl}?height=512&width=512`
        }

        const tags = Array.isArray(record.titles)
          ? record.titles.map((titleRecord: any) => ({ term: titleRecord?.title ?? "" }))
          : undefined

        // Shape the Harvard response into our shared Artwork format
        return {
          id: record.id?.toString() ?? crypto.randomUUID(),
          title: record.title ?? "Untitled",
          artist: record.people?.[0]?.name ?? "Unknown",
          image: imageUrl,
          department: record.department ?? undefined,
          classification: record.classification ?? undefined,
          date: record.dated ?? undefined,
          period: record.period ?? undefined,
          culture: record.culture ?? undefined,
          country: record.placeoforigin ?? record.culture ?? undefined,
          objectName: record.objectname ?? undefined,
          medium: record.medium ?? undefined,
          dimensions: record.dimensions ?? undefined,
          description: record.provenance ?? record.creditline ?? undefined,
          museum: "harvard",
          museumUrl: record.url ?? undefined,
          tags,
          isHighlight: record.rank && record.rank >= 5,
        }
      })
      .filter((artwork:any): artwork is Artwork => artwork !== null)
  } catch (error) {
    console.error("[fromScratchSearch] Error searching Harvard Art Museums", error)
    return []
  }
}

// Remove duplicate entries (sometimes both APIs return the same object ID)
const deduplicateArtworks = (artworks: RankedArtwork[]): RankedArtwork[] => {
  const seen = new Map<string, RankedArtwork>() // create a new map to store the seen artworks

  for (const artwork of artworks) {
    const key = `${artwork.museum}-${artwork.id}`
    const existing = seen.get(key) // get the existing artwork from the seen map

    // Keep whichever entry currently has the better score
    if (!existing || (existing.score ?? 0) < (artwork.score ?? 0)) {
      seen.set(key, artwork)
    }
  }

  console.log("seen", seen)
  console.log("Array.from(seen.values())", Array.from(seen.values()))
  return Array.from(seen.values())
}

// Sort by the calculated score only when the user asked for relevance sorting
const sortRankedResults = (artworks: RankedArtwork[], filters: SearchFilters): RankedArtwork[] => {
  if (filters.sortBy !== "relevance") {
    return artworks
  }

  const sorted = [...artworks].sort((a, b) => (b.score ?? 0) - (a.score ?? 0))

  if (filters.sortOrder === "desc") {
    return sorted
  }
  console.log("sorted", sorted)
  return sorted.reverse()
}

// Public entry point: fetch from the APIs, compute scores, dedupe and return sorted results
export const runSearchEngine = async (
  filters: SearchFilters,
  offset: number = 0 
): Promise<Artwork[]> => {
  console.log("[SearchEngine] Incoming filters", filters)
  console.log("[SearchEngine] Incoming offset", offset)

  // Kick off both API requests at the same time so we do not wait for them serially
  const [metResults, harvardResults] = await Promise.all([
    searchMetMuseum(filters, offset),
    searchHarvardMuseum(filters, offset),
  ])

  console.log("[SearchEngine] Met results count", metResults.length)
  console.log("[SearchEngine] Harvard results count", harvardResults.length)

  // Blend the museum lists together before ranking
  const combined = [...metResults, ...harvardResults]
  console.log("[SearchEngine] Combined results count", combined.length)

  // Attach a score to each artwork (the rest of the app still reads the familiar fields)
  const ranked = combined.map((artwork) => ({
    ...artwork,
    score: calculateScore(artwork, filters),
  }))

  console.log("[SearchEngine] First ranked item", ranked[0])

  // Remove duplicates (same museum + ID) and enforce the final ordering
  const deduped = deduplicateArtworks(ranked)
  const sorted = sortRankedResults(deduped, filters)

  console.log("[SearchEngine] Final sorted count", sorted.length)
  console.log("[SearchEngine] Top 3 scores", sorted.slice(0, 3).map((artwork) => artwork.score))

  return sorted
}

export type { RankedArtwork }

