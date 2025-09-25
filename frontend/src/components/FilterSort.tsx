import React, { useState } from 'react'
import { type SearchFilters } from '../types/artwork'


function FilterSort({filters, setFilters, onFilterChange}: {filters: SearchFilters, setFilters: (filters: SearchFilters) => void, onFilterChange: (filters: SearchFilters) => void}) {


  const handleFilter = (selectedMuseum: string) => {
    setFilters({ ...filters, museum: selectedMuseum as 'all' | 'met' | 'harvard' })
    console.log('Selected museum:', selectedMuseum)
  }

  const handleSort = (selectedSort: string) => {
    setFilters({ ...filters, sortBy: selectedSort as 'relevance' | 'artist' | 'title' })
    console.log('Selected sort:', selectedSort)
  }

  const handleSortOrder = (selectedSortOrder: string) => {
    setFilters({ ...filters, sortOrder: selectedSortOrder as 'asc' | 'desc' })
    console.log('Selected sort order:', selectedSortOrder)
  }

  const handleHasImage = (selectedHasImage: boolean) => {
    setFilters({ ...filters, hasImage: selectedHasImage as boolean })
    console.log('Selected has image:', selectedHasImage)
  }

  return (
    <div>
      <p>Filter by museum:</p>
      <select
        id="filter-button"
        value={filters.museum}
        onChange={(e) => handleFilter(e.target.value)}>
        <option value="all">All Museums</option>
        <option value="met">Metropolitan Museum of Art</option>
        <option value="harvard">Harvard Art Museums</option>
      </select>

      <p>Sort by:</p>
      <select
        id="sort-button"
        onChange={(e) => handleSort(e.target.value)}>
        <option value="relevance">Relevance</option>
        <option value="artist">Artist</option>
        <option value="title">Title</option>
      </select>

      <p>Sort order:</p>
      <select
        id="sort-order-button"
        onChange={(e) => handleSortOrder(e.target.value)}>
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>

      <p>Has image:</p>
      <select
        id="has-image-button"
        onChange={(e) => handleHasImage(e.target.value === 'true')}>
        <option value="true">Yes</option>
        <option value="false">No</option>
      </select>
    </div>
  )

}
export default FilterSort