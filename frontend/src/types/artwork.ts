export type Artwork = {
  id: number
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
  museum: "met" | "harvard"
  museumUrl?: string
  isHighlight?: boolean
}

export type SearchFilters = {
  query: string
  museum: 'all' | 'met' | 'harvard'
  sortBy: 'relevance' | 'artist' | 'title'
  sortOrder: 'asc' | 'desc'
  hasImage: boolean
}