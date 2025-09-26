import { type Artwork } from '../types/artwork'


type ResultsSectionProps = {
    results: Artwork[]
    addToExhibition: (artwork: Artwork) => void
    removeFromExhibition: (artwork: Artwork) => void
    hasMorePages: boolean
    loading: boolean
    loadMore: () => void
    exhibition: Artwork[]
}

function ResultsSection({ results, addToExhibition, removeFromExhibition, hasMorePages, loading, loadMore, exhibition }: ResultsSectionProps) {
    // Helper function to check if artwork is already in exhibition
    const isArtworkInExhibition = (artworkId: string | number) => {
        return exhibition.some(artwork => artwork.id.toString() === artworkId.toString());
    };

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
                    {!isArtworkInExhibition(result.id) ? (
                        <button onClick={() => addToExhibition(result)}>
                            Add to Exhibition
                        </button>
                    ) : (
                        <p>
                            ✓ Added!
                        </p>
                    )}
                    <button onClick={() => removeFromExhibition(result)}>Remove from Exhibition</button>

                </div>
            ))
            }
            <button
                onClick={loadMore}
                disabled={loading || !hasMorePages}
            >
                {loading ? "Loading..." : hasMorePages ? "Load More" : "No More Results"}
            </button>
        </div>
    )
}

export default ResultsSection