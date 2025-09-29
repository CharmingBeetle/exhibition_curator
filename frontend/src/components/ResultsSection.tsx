import { type Artwork } from '../types/artwork'


type ResultsSectionProps = {
  results: Artwork[]
  addToExhibition: (artwork: Artwork) => void
  removeFromExhibition: (artwork: Artwork) => void
  hasMorePages: boolean
  loading: boolean
  loadMore: () => void
  exhibition: Artwork[]
  isEmptyResults: boolean
  query: string
}

const ResultsSection = ({
  results,
  addToExhibition,
  removeFromExhibition,
  hasMorePages,
  loading,
  loadMore,
  exhibition,
  isEmptyResults,
  query
}: ResultsSectionProps) => {
  const isInExhibition = (artworkId: number) =>
    exhibition.some((artwork) => artwork.id.toString() === artworkId.toString())

  if (isEmptyResults) {
    return (
      <div>
        <h2>Results</h2>
        <p>No results found for “{query}”. Try adjusting your filters or search term.</p>
      </div>
    )
  }

  if (results.length === 0 && loading) {
    return (
      <div>
        <h2>Results</h2>
        <p>Loading…</p>
      </div>
    )
  }

  if (results.length === 0) {
    return null
  }

  return (
    <div>
      <h2>Results</h2>
      {results.map((result) => (
        <div key={result.id}>
          <img
            src={result.image || 'https://picsum.photos/id/321/200/200/?blur=5'}
            alt={result.title}
            width={200}
            height={200}
            onError={(event) => {
              event.currentTarget.src = 'https://picsum.photos/id/321/200/200/?blur=5'
            }}
          />
          <p>Title: {result.title}</p>
          <p>Artist: {result.artist}</p>
          <p>Museum: {result.museum}</p>
          {!isInExhibition(result.id) ? (
            <button onClick={() => addToExhibition(result)}>Add</button>
          ) : (
            <p>✓ Added!</p>
          )}
          <button onClick={() => removeFromExhibition(result)}>Remove</button>
        </div>
      ))}

      {results.length > 0 && (
        <button onClick={loadMore} disabled={loading || !hasMorePages}>
          {loading ? 'Loading…' : hasMorePages ? 'Load More' : 'No More Results'}
        </button>
      )}
    </div>
  )
}

export default ResultsSection