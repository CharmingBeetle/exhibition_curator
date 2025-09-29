import { type SearchFilters, type Artwork } from '../types/artwork'

//sort artworks by artist or title => returns sorted artworks
const sortArtworks = (artworks: Artwork[], filters: SearchFilters): Artwork[] => {
  const sorted = [...artworks]

  if (filters.sortBy === 'artist') {
    sorted.sort((a, b) => (a.artist ?? '').localeCompare(b.artist ?? '', 'en', { sensitivity: 'base' }))
  } else if (filters.sortBy === 'title') {
    sorted.sort((a, b) => (a.title ?? '').localeCompare(b.title ?? '', 'en', { sensitivity: 'base' }))
  }

  if (filters.sortOrder === 'desc') {
    sorted.reverse()
  }

  return sorted
}

//check if artwork matches query => returns true if artwork matches query
const matchesQuery = (artwork: Artwork, query: string): boolean => {
  const normalizedQuery = query.trim().toLowerCase()
  if (!normalizedQuery) return true //if query is empty, return true

  const fields = [
    artwork.title,
    artwork.artist,
    artwork.culture,
    artwork.period,
    artwork.medium,
    artwork.department,
    artwork.date,
    artwork.objectName,
    artwork.museumUrl
  ] //array of fields to check if artwork matches query
    .map((value) => value?.toLowerCase() ?? '') 

  return fields.some((value) => value.includes(normalizedQuery))
}

//apply filters to artworks => returns filtered artworks
export const applyFilters = (artworks: Artwork[], filters: SearchFilters): Artwork[] => {
  const baseList = artworks.filter((artwork) => {
    //if museum is not all, return false if artwork museum is not the same as the filter museum
    if (filters.museum !== 'all' && artwork.museum !== filters.museum) {
      return false
    }
    //if hasImage is true, return true if artwork has image
    if (filters.hasImage) {
      return Boolean(artwork.image && artwork.image.trim().length > 0)
    }
    //if artist is not empty, return false if artwork artist is not the same as the filter artist
    if (filters.artist.trim()) {
      const artistName = artwork.artist?.toLowerCase() ?? ''
      if (!artistName.includes(filters.artist.trim().toLowerCase())) {
        return false
      }
    }

    if (filters.department.trim()) {
      const department = artwork.department?.toLowerCase() ?? ''
      if (!department.includes(filters.department.trim().toLowerCase())) {
        return false
      }
    }

    if (filters.medium.trim()) {
      const medium = artwork.medium?.toLowerCase() ?? ''
      if (!medium.includes(filters.medium.trim().toLowerCase())) {
        return false
      }
    }

    if (filters.classification.trim()) {
      const classification = artwork.classification?.toLowerCase() ?? ''
      if (!classification.includes(filters.classification.trim().toLowerCase())) {
        return false
      }
    }

    if (filters.country.trim()) {
      const country = artwork.country?.toLowerCase() ?? ''
      const culture = artwork.culture?.toLowerCase() ?? ''
      const target = filters.country.trim().toLowerCase()
      if (!country.includes(target) && !culture.includes(target)) {
        return false
      }
    }

    if (filters.dateFrom !== null || filters.dateTo !== null) {
      const extractYear = (artwork: Artwork): number | null => {
        const tryParse = (text?: string | null): number | null => {
          if (!text) return null
          const match = text.match(/\d{3,4}/)
          return match ? parseInt(match[0], 10) : null
        }

        return (
          tryParse(artwork.date) ??
          tryParse(artwork.period) ??
          tryParse(artwork.title) ??
          null
        )
      }

      const artworkYear = extractYear(artwork)
      if (artworkYear !== null) {
        if (filters.dateFrom !== null && artworkYear < filters.dateFrom) {
          return false
        }
        if (filters.dateTo !== null && artworkYear > filters.dateTo) {
          return false
        }
      }
    }

    return true
  })
  //if query is empty, return sorted artworks
  if (!filters.query.trim()) {
    return sortArtworks(baseList, filters)
  }
  //if query is not empty, return filtered artworks
  const primaryMatches = baseList.filter((artwork) => matchesQuery(artwork, filters.query)) //filter artworks that match query
  const matchedIds = new Set(primaryMatches.map((artwork) => artwork.id.toString()))
  const secondaryMatches = baseList.filter((artwork) => !matchedIds.has(artwork.id.toString())) //filter artworks that do not match query

  if (primaryMatches.length === 0) {
    return sortArtworks(baseList, filters)
  } //if primary matches is empty, return sorted artworks

  return [
    ...sortArtworks(primaryMatches, filters),
    ...sortArtworks(secondaryMatches, filters)
  ] 
}