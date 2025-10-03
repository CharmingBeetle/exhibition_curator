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
    <div id="search-bar"
    className="flex justify-center">
      <input
        className="rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-white outline-none transition focus:border-white/40 focus:ring-2 focus:ring-indigo-500/60"
        id="search-bar"
        type="text"
        value={query}
        placeholder="Search for artworks"
        onChange={(event) => handleChange(event.target.value)}
        disabled={loading}
        onKeyDown={handleKeyDown}
      />
      
    </div>
  )
}

export default SearchBar