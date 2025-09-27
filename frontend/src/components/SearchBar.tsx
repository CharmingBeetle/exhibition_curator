import { useState } from 'react'
import { type SearchFilters } from '../types/artwork'


function SearchBar ({
    filters, 
    onSearch,
    loading
}: {
    filters: SearchFilters, 
    onSearch: (filters: SearchFilters) => void,
    loading: boolean
}) {
    const [query, setQuery] = useState('')
    const [error, setError] = useState<string | null>(null)
    const [message, setMessage] = useState<string | null>(null)
  
    const handleSearchClick = () => {
        setError(null)
        setMessage(null)
        onSearch({...filters, query})
    }
    
    if (loading) return <div>Loading...</div>


    return (
        <div>
            <input
                id="search-bar"
                type="text"
                value={query}
                placeholder="Search for artworks"
                onChange={(e) => setQuery(e.target.value)} />
                <br />
                <br />
                <button 
                type="submit" 
                disabled={loading} 
                onClick={handleSearchClick}>Search</button>
                
        </div>
    )
}
    export default SearchBar