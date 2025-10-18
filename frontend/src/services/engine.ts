import axios from "axios"
import type { Artwork, SearchFilters } from "../types/artwork"

const MET_API_URL = "https://collectionapi.metmuseum.org/public/collection/v1"
const HARVARD_API_URL = "https://api.harvardartmuseums.org/object"
const HARVARD_API_KEY = import.meta.env?.VITE_HARVARD_API_KEY


const PAGE_SIZE = 10

const MAX_HARVARD_PAGE_SIZE = 20


type RankedArtwork = Artwork & { score: number }


const normalizeText = (value: string | undefined | null): string => {
  if (!value) {
    return ""
  }

  return value
    .toString() 
    .toLowerCase() 
    .normalize("NFD") 
    .replace(/\p{Mn}/gu, "")
}

const tokenize = (value: string): string[] =>
  value
    .split(/[^\p{L}\p{N}]+/u)
    .map((token) => token.trim()) 
    .filter(Boolean) 

const computeTokenMatches = (source: string, tokens: string[], weight: number): number => {
  if (!source || tokens.length === 0 || weight <= 0) { 
    return 0
  }

  let score = 0

  for (const token of tokens) { 
    if (source.includes(token)) { 
    
      const tokenLengthBoost = Math.min(2, token.length / 5) 
      score += weight * (1 + tokenLengthBoost) 
    }
  }
  
  return score 
}

const computePhraseMatch = (source: string, query: string, weight: number): number => {
  if (!source || !query) {
    return 0
  }

  if (source.includes(query)) { 
    const queryLengthBoost = Math.min(3, query.length / 6) 

    return weight * (1.5 + queryLengthBoost) 
  }

  return 0 
}

const calculateScore = (artwork: Artwork, filters: SearchFilters): number => {
  
  const normalizedQuery = normalizeText(filters.query)
  const tokens = tokenize(normalizedQuery)

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

  
  if (tokens.length === 0 && !filters.artist.trim()) {
    
    score += artwork.museum === "harvard" ? 2 : 1
   
    score += artwork.isHighlight ? 0.5 : 0
    score += artwork.image ? 0.25 : 0
    
    return score
  }

  score += computeTokenMatches(title, tokens, 6) 
  score += computeTokenMatches(artist, tokens, 4.5)
  score += computeTokenMatches(medium, tokens, 2)
  score += computeTokenMatches(classification, tokens, 1.8)
  score += computeTokenMatches(culture, tokens, 1.6)
  score += computeTokenMatches(department, tokens, 1.4)
  score += computeTokenMatches(period, tokens, 1.2)
  score += computeTokenMatches(objectName, tokens, 1)
  score += computeTokenMatches(description, tokens, 0.8)

 
  for (const tag of tags) {
    score += computeTokenMatches(tag, tokens, 1.5)
  }

  score += computePhraseMatch(title, normalizedQuery, 4)
  score += computePhraseMatch(artist, normalizedQuery, 3)

  if (filters.artist.trim()) {
    const normalizedArtistFilter = normalizeText(filters.artist)
    if (artist.includes(normalizedArtistFilter)) {
      score += 5
    } else if (title.includes(normalizedArtistFilter)) {

      score += 2
    }
  }

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

  if (artwork.museum === "harvard") {
    score *= 1.05
    score += 2
  }

  if (artwork.isHighlight) {
    score += 0.75
  }

  if (artwork.image) {
    score += 0.5
  }

  return Number(score.toFixed(3))
}

const extractYear = (artwork: Artwork): number | null => {
  const fields = [artwork.date, artwork.period, artwork.title]

  for (const field of fields) {
    const normalized = field?.toString()
    if (!normalized) {
      continue
    }

    const match = normalized.match(/(-?\d{3,4})/)
    if (match) {
     
      return Number.parseInt(match[0], 10)
    }
  }

  return null
}

const searchMetMuseum = async (filters: SearchFilters, offset: number): Promise<Artwork[]> => {
  if (filters.museum === "harvard") {
    return []
  }

  try {
    const params = new URLSearchParams()

    
    const combinedQuery = [filters.query, filters.artist].filter((value) => value && value.trim().length > 0)
    if (combinedQuery.length > 0) {
      params.append("q", combinedQuery.join(" "))
    } else {
      
      params.append("q", "art")
    }

    params.append("hasImages", filters.hasImage ? "true" : "false")

    const searchUrl = `${MET_API_URL}/search?${params.toString()}`
    const response = await axios.get(searchUrl)

    const objectIDs: number[] = response.data?.objectIDs ?? []
    if (!Array.isArray(objectIDs) || objectIDs.length === 0) {
      
      return []
    }

    const start = Math.max(0, offset)
    const end = start + PAGE_SIZE
    const idsToFetch = objectIDs.slice(start, end)

    const artworks = await Promise.all(idsToFetch.map((id) => getMetObjectDetails(id)))
    
    return artworks.filter((artwork): artwork is Artwork => Boolean(artwork))
  } catch (error) {
    console.error("[fromScratchSearch] Error searching Met Museum", error)
    return []
  }
}


const getMetObjectDetails = async (id: number): Promise<Artwork | null> => {
  try {
    const response = await axios.get(`${MET_API_URL}/objects/${id}`)
    const data = response.data

    if (!data) {
      return null
    }

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
  
    const effectivePageSize = filters.query.trim() ? MAX_HARVARD_PAGE_SIZE : PAGE_SIZE
    params.append("size", String(effectivePageSize))

    
    const page = Math.floor(offset / PAGE_SIZE) + 1
    params.append("page", page.toString())

    const url = `${HARVARD_API_URL}?${params.toString()}`
    const response = await axios.get(url)
    const records = Array.isArray(response.data?.records) ? response.data.records : []

    return records
      .map((record: any): Artwork | null => { 
        const imageData = record.images?.[0] 
        let imageUrl: string | undefined 

        
        if (imageData?.iiifbaseuri) {
          if (record.imagepermissionlevel === 1) {
            imageUrl = `${imageData.iiifbaseuri}/full/256,/0/default.jpg`
          } else { 
            imageUrl = `${imageData.iiifbaseuri}/full/full/0/default.jpg` 
          }
        }

        if (!imageUrl && typeof record.primaryimageurl === "string") {
          imageUrl = record.primaryimageurl
        }

        if (!imageUrl && typeof record.baseimageurl === "string") {
          imageUrl = `${record.baseimageurl}?height=512&width=512`
        }

        const tags = Array.isArray(record.titles)
          ? record.titles.map((titleRecord: any) => ({ term: titleRecord?.title ?? "" }))
          : undefined

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


const deduplicateArtworks = (artworks: RankedArtwork[]): RankedArtwork[] => {
  const seen = new Map<string, RankedArtwork>() 

  for (const artwork of artworks) {
    const key = `${artwork.museum}-${artwork.id}`
    const existing = seen.get(key) 

    if (!existing || (existing.score ?? 0) < (artwork.score ?? 0)) {
      seen.set(key, artwork)
    }
  }

  return Array.from(seen.values())
}


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

export const runSearchEngine = async (
  filters: SearchFilters,
  offset: number = 0 
): Promise<Artwork[]> => {

  const [metResults, harvardResults] = await Promise.all([
    searchMetMuseum(filters, offset),
    searchHarvardMuseum(filters, offset),
  ])

  console.log("[SearchEngine] Met results count", metResults.length)
  console.log("[SearchEngine] Harvard results count", harvardResults.length)


  const combined = [...metResults, ...harvardResults]
  console.log("[SearchEngine] Combined results count", combined.length)

  const ranked = combined.map((artwork) => ({
    ...artwork,
    score: calculateScore(artwork, filters),
  }))

  console.log("[SearchEngine] First ranked item", ranked[0])

  const deduped = deduplicateArtworks(ranked)
  const sorted = sortRankedResults(deduped, filters)

  console.log("[SearchEngine] Final sorted count", sorted.length)
  console.log("[SearchEngine] Top 3 scores", sorted.slice(0, 3).map((artwork) => artwork.score))

  return sorted
}

export type { RankedArtwork }

