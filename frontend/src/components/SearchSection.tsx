import { useState, useMemo, useEffect } from 'react'
import SearchBar from './SearchBar'
import FilterSort from './FilterSort'
import { type SearchFilters } from '../types/artwork'
import ResultsSection from './ResultsSection'
import { type Artwork } from '../types/artwork'
import { searchArtworks } from '../services/museumApi'
import { applyFilters } from '../utils/applyFilters'
import ArtworkDetailModal from './ArtworkDetailModal'
import Toast from './Toast'

type SearchSectionProps = {
  addToExhibition: (artwork: Artwork) => void
  removeFromExhibition: (artwork: Artwork) => void
  exhibition: Artwork[]
}

const initialFilters: SearchFilters = {
  query: '',
  museum: 'all',
  artist: '',
  department: '',
  medium: '',
  classification: '',
  country: '',
  dateFrom: null,
  dateTo: null,
  sortBy: 'relevance',
  sortOrder: 'asc',
  hasImage: true
}

function SearchSection({ addToExhibition, removeFromExhibition, exhibition }: SearchSectionProps) {
  const [rawResults, setRawResults] = useState<Artwork[]>([])
  const [filters, setFilters] = useState<SearchFilters>(initialFilters)
  const [offset, setOffset] = useState(0)
  const [hasMorePages, setHasMorePages] = useState(true)
  const [loading, setLoading] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)
  const [lastQuery, setLastQuery] = useState('')
  const [resetKey, setResetKey] = useState(0)
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null)
  const [toast, setToast] = useState({ visible: false, message: '', type: 'error' as const})

  const filteredResults = useMemo(() => applyFilters(rawResults, filters), [rawResults, filters])
  const isEmptyResults = hasSearched && !loading && filteredResults.length === 0

  const showErrorToast = (message: string) => {
    setToast({ 
      visible: true, 
      message, 
      type: 'error'
    })
  }

  const handleSearch = async (searchFilters: SearchFilters) => {

    setLoading(true)
    setOffset(0)
    setHasMorePages(true)
    setFilters(searchFilters)
    setHasSearched(true)
    setLastQuery(searchFilters.query)

    try {
      const results = await searchArtworks(searchFilters)
      setRawResults(results)
      setHasMorePages(results.length > 0)
      setToast((prev) => ({ ...prev, visible: false }))
    } catch (error) {
      setRawResults([])
      setHasMorePages(false)
      showErrorToast('Unable to load artwork results. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const loadMore = async () => {
    setLoading(true)

    try {
      const newOffset = offset + 10
      const newResults = await searchArtworks(filters, newOffset)
      if (newResults.length === 0) {
        setHasMorePages(false)
        return
      }

      const existingIds = new Set(rawResults.map((result) => result.id))
      const uniqueNewResults = newResults.filter((result) => !existingIds.has(result.id))

      setRawResults((prev) => [...prev, ...uniqueNewResults])
      setOffset(newOffset)
    } catch (error) {
      setHasMorePages(false)
      showErrorToast('Unable to load more artwork results. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const resetFilters = () => {
    setFilters(initialFilters)
    setResetKey((value) => value + 1) //reset key to force re-render
  }

  useEffect(() => {
    if (hasSearched && filters.query.trim()) {
      handleSearch(filters)
    }
  }, [filters.artist, filters.department, filters.medium, filters.classification, filters.country, filters.dateFrom, filters.dateTo])

  return (

    <section id="search">

      <h2>Search</h2>
      <Toast 
      message={toast.message} 
      type={toast.type} 
      isVisible={toast.visible} 
      onClose={() => setToast((prev) => ({ ...prev, visible: false }))} 
      />
      <div className="search-controls">
        <SearchBar
          filters={filters}
          onQueryChange={(value) => setFilters((prev) => ({ ...prev, query: value }))}
          onSubmit={() => handleSearch(filters)}
          loading={loading}
          resetKey={resetKey}
        />

        <FilterSort
          filters={filters}
          onChange={setFilters}
        />

        <div className="search-actions">
          <button
            type="button"
            onClick={() => handleSearch(filters)}
            disabled={loading}
          >
            Search
          </button>

          <button
            type="button"
            onClick={resetFilters}
            disabled={loading && !hasSearched}
          >
            Reset Filters
          </button>
        </div>
      </div>
      <hr />
      <br />
      <ResultsSection
        results={filteredResults}
        addToExhibition={addToExhibition}
        removeFromExhibition={removeFromExhibition}
        hasMorePages={hasMorePages}
        loadMore={loadMore}
        loading={loading}
        exhibition={exhibition}
        isEmptyResults={isEmptyResults}
        query={lastQuery}
        onArtworkClick={setSelectedArtwork}
      />

      {selectedArtwork &&
        <ArtworkDetailModal
          artwork={selectedArtwork}
          onClose={() => setSelectedArtwork(null)} />}


    </section>

  )
}

export default SearchSection