import { useEffect, useState } from 'react'
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
  onArtworkClick: (artwork: Artwork) => void
  onReset: () => void
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
  query,
  onArtworkClick,
  onReset,
}: ResultsSectionProps) => {
  const [showFloatingReset, setShowFloatingReset] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const handleScroll = () => {
      setShowFloatingReset(window.scrollY > 320)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const isInExhibition = (artworkId: number | string) =>
    exhibition.some((artwork) => artwork.id.toString() === artworkId.toString())

  if (isEmptyResults) {
    return (
      <section className="space-y-3">
        <div className="rounded-2xl border border-dashed border-white/15 bg-white/5 p-6 text-center text-sm text-slate-300/80">
          No results found for “{query}”. Try a broader term or reset your filters.
        </div>
      </section>
    )
  }

  if (results.length === 0 && loading) {
    return (
      <section className="space-y-3">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center text-sm text-slate-200/80">
          Loading results…
        </div>
      </section>
    )
  }

  if (results.length === 0) {
    return null
  }

  return (
    <section id="results" className="space-y-6">
      <div className="flex items-baseline justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-indigo-200/80">
            Results
          </p>
          <h2 className="text-lg font-semibold text-white">Artwork matches</h2>
        </div>
        {query && (
          <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs text-white/70">
            “{query}”
          </span>
        )}
      </div>

      <ul className="space-y-4">
        {results.map((result) => {
          const inGallery = isInExhibition(result.id)
          return (
            <li key={result.id}>
              <article className="group overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-[0_20px_45px_-25px_rgba(99,102,241,0.6)] transition hover:border-indigo-300/50">
                <div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:gap-6">
                  <button
                    type="button"
                    onClick={() => onArtworkClick(result)}
                    aria-label={`View details for ${result.title}`}
                    className="relative shrink-0 overflow-hidden rounded-xl border border-white/15 bg-black/40 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 sm:w-36"
                  >
                    <img
                      src={result.image || 'https://picsum.photos/id/321/400/400/?blur=5'}
                      alt={result.title}
                      className="h-28 w-full object-cover transition duration-300 group-hover:scale-105"
                      onError={(event) => {
                        event.currentTarget.src = 'https://picsum.photos/id/321/400/400/?blur=5'
                      }}
                    />
                    <span className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/50 text-xs font-semibold uppercase tracking-[0.3em] text-white opacity-0 transition duration-300 group-hover:opacity-100">
                      View details
                    </span>
                  </button>

                  <div className="flex flex-1 flex-col gap-2 text-left">
                    <div>
                      <h3 className="text-base font-semibold text-white">{result.title}</h3>
                      {result.artist && (
                        <p className="text-sm text-indigo-200/80">{result.artist}</p>
                      )}
                    </div>
                    <div className="flex flex-wrap items-center gap-2 text-xs text-slate-300/70">
                      <span className="rounded-full border border-white/10 bg-white/5 px-2 py-1 uppercase tracking-[0.25em]">
                        {result.museum}
                      </span>
                      {result.medium && (
                        <span className="rounded-full border border-white/10 bg-white/5 px-2 py-1 text-[0.65rem]">
                          {result.medium}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex shrink-0 flex-col items-end gap-2">
                    {!inGallery ? (
                      <button
                        onClick={() => addToExhibition(result)}
                        className="inline-flex items-center justify-center rounded-lg bg-indigo-500 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white transition hover:bg-indigo-400"
                      >
                        Add
                      </button>
                    ) : (
                      <>
                        <span className="inline-flex items-center justify-center rounded-lg border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white/80">
                          Added
                        </span>
                        <button
                          onClick={() => removeFromExhibition(result)}
                          className="inline-flex items-center justify-center rounded-lg border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white/80 transition hover:border-white/25 hover:bg-white/15"
                        >
                          Remove
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </article>
            </li>
          )
        })}
      </ul>

      {results.length > 0 && (
        <div className="flex justify-center">
          <button
            onClick={loadMore}
            disabled={loading || !hasMorePages}
            className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/10 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.3em] text-white transition hover:border-white/25 hover:bg-white/15 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? 'Loading…' : hasMorePages ? 'Load more results' : 'No more results'}
          </button>
          
        </div>
      )}

      {results.length > 0 && showFloatingReset && (
        <button
          type="button"
          onClick={onReset}
          className="fixed bottom-6 right-6 inline-flex items-center justify-center rounded-full bg-indigo-500 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.3em] text-white shadow-lg transition hover:bg-indigo-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300"
          aria-label="Reset search and scroll to top"
        >
          Reset search
        </button>
      )}
    </section>
  )
}

export default ResultsSection