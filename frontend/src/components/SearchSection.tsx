import React, { useState } from 'react'
import SearchBar from './SearchBar'
import FilterSort from './FilterSort'
import { type SearchFilters } from '../types/artwork'
import ResultsSection from './ResultsSection'
import { type Artwork } from '../types/artwork'

 function SearchSection(props: { addToExhibition: (artwork: Artwork) => void, removeFromExhibition: (artwork: Artwork) => void }) {
  const { addToExhibition, removeFromExhibition } = props

  const [results, setResults] = useState<Artwork[]>([])
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

console.log('SearchSection addToExhibition', addToExhibition)
console.log('SearchSection removeFromExhibition', removeFromExhibition)

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

        <ResultsSection 
        results={results} 
        addToExhibition={addToExhibition} 
        removeFromExhibition={removeFromExhibition} 
        />
    </div>
  )
}

export default SearchSection