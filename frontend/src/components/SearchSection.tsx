import React, { useState } from 'react'
import SearchBar from './SearchBar'
import FilterSort from './FilterSort'
import { type SearchFilters } from '../types/artwork'
import ResultsSection from './ResultsSection'
import { type Artwork } from '../types/artwork'

const SearchSection = () => {
  const [results, setResults] = useState<Artwork[]>([])
  console.log('SearchSection results', results)
  const [filters, setFilters] = useState<SearchFilters>({
    query: '',
    museum: 'harvard',
    sortBy: 'relevance',
    sortOrder: 'asc',
    hasImage: true
  })

const onFilterChange = (selectedFilters: SearchFilters) => {
  setFilters(selectedFilters)
}

  return (
    <div>
        <SearchBar 
        filters={filters}
        setFilters={setFilters}
        setResults={setResults}
        />
        
        <FilterSort 
        filters={filters} 
        setFilters={setFilters} 
        onFilterChange={onFilterChange} 
        />

        <ResultsSection results={results} />
    </div>
  )
}

export default SearchSection