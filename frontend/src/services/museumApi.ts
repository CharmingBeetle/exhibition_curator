import type { Artwork, SearchFilters } from "../types/artwork"
import { runSearchEngine } from "./engine"

// Lightweight wrapper that keeps the existing hook API untouched
export const searchArtworks = async (filters: SearchFilters, offset: number = 0): Promise<Artwork[]> => {
  return runSearchEngine(filters, offset)
}
