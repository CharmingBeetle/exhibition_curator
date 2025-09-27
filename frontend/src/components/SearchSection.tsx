import { useState } from 'react'
import SearchBar from './SearchBar'
import FilterSort from './FilterSort'
import { type SearchFilters } from '../types/artwork'
import ResultsSection from './ResultsSection'
import { type Artwork } from '../types/artwork'
import { searchArtworks } from '../services/museumApi'

function SearchSection(props: { addToExhibition: (artwork: Artwork) => void, removeFromExhibition: (artwork: Artwork) => void, exhibition: Artwork[] }) {
  const { addToExhibition, removeFromExhibition, exhibition } = props //funcs destructuring from props

  const [results, setResults] = useState<Artwork[]>([])
  const [filters, setFilters] = useState<SearchFilters>({
    query: '',
    museum: 'all',
    sortBy: 'relevance',
    sortOrder: 'asc',
    hasImage: true
  })
  const [offset, setOffset] = useState(0)
  const [hasMorePages, setHasMorePages] = useState(true)
  const [loading, setLoading] = useState(false)

 
  // load more results
  const loadMore = async () => {
    setLoading(true)
    
    try {
      const newOffset = offset + 10
      const newResults = await searchArtworks(filters, newOffset)

      if (newResults.length === 0) {
        setHasMorePages(false)
      } else {
        const existingIds = new Set(results.map(result => result.id))
        const uniqueNewResults = newResults.filter(result => !existingIds.has(result.id))
        setResults([...results, ...uniqueNewResults])
        setOffset(newOffset)
      }
    } catch (error) {
      console.error('Error loading more results:', error)
      // TODO: Add user-friendly error message
    } finally {
      setLoading(false)
    }
  }

const handleSearch = async (searchFilters: SearchFilters) => {
  setLoading(true)
  setResults([])
  setOffset(0)
  setHasMorePages(true)
  setFilters(searchFilters) 
  
  try {
    const artworks = await searchArtworks(searchFilters)
    setResults(artworks)
  } catch (error) {
    console.error('Error searching artworks:', error)
  } finally {
    setLoading(false)
  }
}

  

return (
  <section>
  <h2>Search</h2>
  <div>
    <FilterSort
      filters={filters}
      setFilters={setFilters}
    />
 <br />
    <SearchBar
      filters={filters}
      onSearch={handleSearch}
      loading={loading}
    />
    <br />
    <hr />
    <br />
    <ResultsSection
      results={results}
      addToExhibition={addToExhibition}
      removeFromExhibition={removeFromExhibition}
      hasMorePages={hasMorePages}
      loadMore={loadMore}
      loading={loading}
      exhibition={exhibition}
    />
  </div>
  </section>
)
}

export default SearchSection