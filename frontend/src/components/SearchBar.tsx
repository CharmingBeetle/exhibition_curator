import React, { useState } from 'react'
import { searchArtworks } from '../services/museumApi'
import { type Artwork, type SearchFilters } from '../types/artwork'
import FilterSortButtons from './FilterSort'


function SearchBar () {
    const [query, setQuery] = useState('')
    const [results, setResults] = useState<Artwork[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [message, setMessage] = useState<string | null>(null)
    const [filters, setFilters] = useState<SearchFilters>({
        query: '',
        museum: 'harvard',
        sortBy: 'relevance',
        sortOrder: 'asc',
        hasImage: true
    })

    const handleSearch = async (filters: SearchFilters) => {
        setLoading(true)
        setError(null)
        setMessage(null)
        try {
            const artworks = await searchArtworks(filters)
            setResults(artworks)
            if (artworks.length > 0) {
                setMessage('Search results loaded successfully')
            } else {
                setMessage('No search results found')
            }
            } catch (error) {
                setError(String(error))
            } finally {
                setLoading(false)
            }
    }
    
    if (loading) return <div>Loading...</div>
    if (error) return <div>Error: {error}</div>
    if (message) return <div>Message: {message}</div>

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