import React from 'react'
import { type Artwork } from '../types/artwork'

type ResultsSectionProps = {
    results: Artwork[]
    addToExhibition: (artwork: Artwork) => void
    removeFromExhibition: (artwork: Artwork) => void
}

function ResultsSection({ results, addToExhibition, removeFromExhibition }: ResultsSectionProps) {

    return (
        <div>
            <h1>Results</h1>
            {results.length === 0 && <div>No results found</div>}

            {results.map((result) => (
                <div
                    key={result.id}>
                    <img 
                    src={result.image || 'https://picsum.photos/id/321/200/200/?blur=5'} 
                    alt={result.title} 
                    width="200"
                    height="200"
                    onError={(e) => {
                        e.currentTarget.src = 'https://picsum.photos/id/321/200/200/?blur=5'
                    }}
                    /> 
                    <p>Title: {result.title}</p>
                    <p>Artist: {result.artist}</p>
                    <p>Museum: {result.museum}</p>
                    <button onClick={() => addToExhibition(result)}>Add</button>
                    <button onClick={() => removeFromExhibition(result)}>Remove</button>

                </div>
            ))
            }
        </div>
    )
}

export default ResultsSection