import { useEffect, useState } from 'react'
import { type SearchFilters } from '../types/artwork'

type SearchBarProps = {
  filters: SearchFilters
  onQueryChange: (value: string) => void
  onSubmit: () => void
  loading: boolean
  resetKey: number
}

const SearchBar = ({ filters, onQueryChange, onSubmit, loading, resetKey }: SearchBarProps) => {
  const [query, setQuery] = useState(filters.query)

  useEffect(() => {
    setQuery(filters.query)
  }, [filters.query, resetKey])

  const handleChange = (value: string) => {
    setQuery(value)
    onQueryChange(value)
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      onSubmit()
    }
  }

  return (
    <div className="flex justify-center">
      <label htmlFor="search-input" className="sr-only">
        Search for artworks
      </label>
      <input
        className="rounded-lg border border-[#89A8B2]/30 bg-[#F1F0E8]/80 px-3 py-2 text-[#1b1c17] outline-none transition focus:border-[#89A8B2]/60 focus:ring-2 focus:ring-[#89A8B2]/60"
        id="search-input"
        type="text"
        value={query}
        placeholder="Search for artworks"
        onChange={(event) => handleChange(event.target.value)}
        disabled={loading}
        onKeyDown={handleKeyDown}
        aria-describedby="search-help"
        autoComplete="off"
      />
      <div id="search-help" className="sr-only">
        Press Enter to search or use the search button
      </div>
    </div>
  )
}

export default SearchBar