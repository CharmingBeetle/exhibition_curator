import { type Artwork } from '../types/artwork'


type ResultsSectionProps = {
    results: Artwork[]
    addToExhibition: (artwork: Artwork) => void
    removeFromExhibition: (artwork: Artwork) => void
    hasMorePages: boolean
    loading: boolean
    loadMore: () => void
    exhibition: Artwork[]
    message: string | null
}

function ResultsSection({ results, addToExhibition, removeFromExhibition, hasMorePages, loading, loadMore, exhibition, message }: ResultsSectionProps) {
    
    const isInExhibition = (artworkId: number) => {
        return exhibition.some(artwork => artwork.id.toString() === artworkId.toString())
    };

    return (
        <div>
            <h2>Results</h2>
            {message}

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
                    {!isInExhibition(result.id) ? (
                        <button onClick={() => addToExhibition(result)}>
                            Add
                        </button>
                    ) : (
                        <p> ✓ Added! </p>
                    )}
                    <button onClick={() => removeFromExhibition(result)}>Remove</button>

                </div>
            ))
            }
        {results.length > 0 && (
            <button
                onClick={loadMore}
                disabled={loading || !hasMorePages}
            >
                {loading ? "Loading..." : hasMorePages ? "Load More" : "No More Results"}
            </button>
        )}
        </div>
    )
}

export default ResultsSection