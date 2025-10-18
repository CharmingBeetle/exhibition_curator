export type Artwork = {
  id: number | string
  title: string
  artist?: string | "Unknown"
  image?: string
  department?: string
  date?: string
  period?: string
  country?: string  
  culture?: string
  objectName?: string
  medium?: string
  dimensions?: string
  thumbnailURL?: string
  description?: string
  classification?: string
  museum: "met" | "harvard"
  museumUrl?: string
  isHighlight?: boolean
  tags?: ArtworkTag[]
  score?: number
}

export type SearchFilters = {
  query: string
  museum: 'all' | 'met' | 'harvard'
  artist: string
  department: string
  medium: string
  classification: string
  country: string
  dateFrom: number | null
  dateTo: number | null
  sortBy: 'relevance' | 'artist' | 'title'
  sortOrder: 'asc' | 'desc'
  hasImage: boolean
}

export type ArtworkTag = {
  term: string
}
