import React, { useState } from 'react'
import { searchArtworks } from '../services/museumApi'
import { type Artwork, type SearchFilters } from '../types/artwork'


function SearchBar ({filters, setFilters, setResults}: {filters: SearchFilters, setFilters: (filters: SearchFilters) => void, setResults: (results: Artwork[]) => void}) {
    const [query, setQuery] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [message, setMessage] = useState<string | null>(null)
  

    const handleSearch = async (filters: SearchFilters) => {
        setLoading(true)
        setError(null)
        setMessage(null)
        try {
            const artworks = await searchArtworks(filters)
            setResults(artworks)
            } catch (error) {
                setError(String(error))
            } finally {
                setLoading(false)
            }
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
                <button 
                type="submit" 
                disabled={loading} 
                onClick={() => handleSearch({...filters, query})}>Search</button>
                
        </div>
    )
}
    export default SearchBar