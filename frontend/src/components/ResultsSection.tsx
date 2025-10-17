import { useEffect, useState } from "react";
import { type Artwork } from "../types/artwork";
import OptimizedImage from "./OptimizedImage";

type ResultsSectionProps = {
  results: Artwork[];
  addToExhibition: (artwork: Artwork) => void;
  removeFromExhibition: (artwork: Artwork) => void;
  hasMorePages: boolean;
  loading: boolean;
  loadMore: () => void;
  exhibition: Artwork[];
  isEmptyResults: boolean;
  query: string;
  onArtworkClick: (artwork: Artwork) => void;
  onReset: () => void;
  activeFilters?: string[];
};

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
  activeFilters = [],
  onArtworkClick,
  onReset,
}: ResultsSectionProps) => {
  const [showFloatingReset, setShowFloatingReset] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleScroll = () => {
      setShowFloatingReset(window.scrollY > 320);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const isInExhibition = (artworkId: number | string) =>
    exhibition.some(
      (artwork) => artwork.id.toString() === artworkId.toString()
    );

  if (isEmptyResults) {
    return (
      <section className="space-y-3" aria-live="polite">
        <div className="rounded-2xl border border-dashed border-white/15 bg-white/5 p-6 text-center text-sm text-[#5A6B73]" role="status">
          No results found for "{query}". Try a broader term or reset your
          filters.
        </div>
      </section>
    );
  }

  if (results.length === 0 && loading) {
    return (
      <section className="space-y-3" aria-live="polite">
        <div className="rounded-2xl border border-[#89A8B2]/20 bg-[#F1F0E8]/60 p-6 text-center text-sm text-[#5A6B73]" role="status" aria-label="Loading search results">
          Loading results…
        </div>
      </section>
    );
  }

  if (results.length === 0) {
    return null;
  }

  return (
    <section id="results" className="space-y-6" aria-live="polite" aria-label="Search results">
      <div className="flex items-baseline justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#1b1c17]/80">
            Results
          </p>
          <h2 className="text-lg font-semibold text-[#1b1c17]">
            Artwork matches
            <span className="sr-only">: {results.length} result{results.length !== 1 ? 's' : ''} found</span>
          </h2>
        </div>

        {(query || activeFilters.length > 0) && (
          <div className="flex flex-wrap items-center gap-2">
            {query && (
              <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs text-[#1b1c17]/70">
                “{query}”
              </span>
            )}
            {activeFilters.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs text-[#1b1c17]/70"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
      <ul className="space-y-4">
        {results.map((result) => {
          const inGallery = isInExhibition(result.id);
          return (
            <li key={result.id}>
              <article className="group overflow-hidden rounded-2xl border border-[#89A8B2]/20 bg-[#F1F0E8]/60 shadow-[0_20px_45px_-25px_rgba(137,168,178,0.6)] transition hover:border-[#B3C8CF]/50">
                <div className="flex items-center gap-4 p-4">
                  <button
                    type="button"
                    onClick={() => onArtworkClick(result)}
                    aria-label={`View details for ${result.title}`}
                    className="relative shrink-0 overflow-hidden rounded-xl border border-white/15 bg-black/40 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#89A8B2] w-24 h-24"
                  >
                    <OptimizedImage
                      src={result.image || "https://picsum.photos/id/321/400/400/?blur=5"}
                      alt={result.title}
                      className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                      width={96}
                      height={96}
                      loading="lazy"
                    />
                    <span className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/50 text-xs font-semibold uppercase tracking-[0.3em] text-[#F1F0E8] opacity-0 transition duration-300 group-hover:opacity-100">
                      View details
                    </span>
                  </button>

                  <div className="flex flex-1 flex-col gap-2 text-left">
                    <div>
                      <h3 className="text-base font-semibold text-[#1b1c17] line-clamp-1">
                        {result.title}
                      </h3>
                      {result.artist && (
                        <p className="text-sm text-[#1b1c17]/80 line-clamp-1">
                          {result.artist}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-wrap items-center gap-1 text-xs text-[#1b1c17]/80">
                      <span className="rounded-full border border-[#89A8B2]/20 bg-[#F1F0E8]/60 px-2 py-0.5 uppercase tracking-[0.25em]">
                        {result.museum}
                      </span>
                      {result.medium && (
                        <span className="rounded-full border border-[#89A8B2]/20 bg-[#F1F0E8]/60 px-2 py-0.5 text-[0.65rem]">
                          {result.medium}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex shrink-0 items-center gap-2">
                    {!inGallery ? (
                      <button
                        onClick={() => addToExhibition(result)}
                        className="inline-flex items-center justify-center rounded-lg bg-[#89A8B2] px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-[#1b1c17] transition hover:bg-[#B3C8CF]"
                        aria-label={`Add "${result.title}" to exhibition`}
                      >
                        Add
                      </button>
                    ) : (
                      <>
                        <span className="inline-flex items-center justify-center rounded-lg border border-[#89A8B2]/30 bg-[#F1F0E8]/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-[#1b1c17]/80" aria-label="Added to exhibition">
                          Added
                        </span>
                        <button
                          onClick={() => removeFromExhibition(result)}
                          className="inline-flex items-center justify-center rounded-lg border border-[#89A8B2]/30 bg-[#F1F0E8]/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-[#1b1c17]/80 transition hover:border-[#89A8B2]/50 hover:bg-[#E5E1DA]"
                          aria-label={`Remove "${result.title}" from exhibition`}
                        >
                          Remove
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </article>
            </li>
          );
        })}
      </ul>

      {results.length > 0 && (
        <div className="flex justify-center">
          <button
            onClick={loadMore}
            disabled={loading || !hasMorePages}
            className="inline-flex items-center justify-center rounded-full border border-[#89A8B2]/30 bg-[#F1F0E8]/80 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.3em] text-[#1b1c17] transition hover:border-[#89A8B2]/50 hover:bg-[#E5E1DA] disabled:cursor-not-allowed disabled:opacity-50"
            aria-label={loading ? "Loading more results" : hasMorePages ? "Load more search results" : "No more results available"}
          >
            {loading
              ? "Loading…"
              : hasMorePages
              ? "Load more results"
              : "No more results"}
          </button>
        </div>
      )}

      {results.length > 0 && showFloatingReset && (
        <button
          type="button"
          onClick={onReset}
          className="fixed bottom-6 right-6 inline-flex items-center justify-center rounded-full bg-[#89A8B2] px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.3em] text-[#1b1c17] shadow-lg transition hover:bg-[#B3C8CF] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B3C8CF]"
          aria-label="Reset search and scroll to top"
        >
          Reset search
        </button>
      )}
    </section>
  );
};

export default ResultsSection;
