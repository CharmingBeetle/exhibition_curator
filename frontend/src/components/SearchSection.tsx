import { useState, useMemo, useEffect, useRef } from "react";
import SearchBar from "./SearchBar";
import FilterSort from "./FilterSort";
import { type SearchFilters } from "../types/artwork";
import ResultsSection from "./ResultsSection";
import { type Artwork } from "../types/artwork";
import { searchArtworks } from "../services/museumApi";
import { applyFilters } from "../utils/applyFilters";
import ArtworkDetailModal from "./ArtworkDetailModal";
import Toast from "./Toast";

type SearchSectionProps = {
  addToExhibition: (artwork: Artwork) => void;
  removeFromExhibition: (artwork: Artwork) => void;
  exhibition: Artwork[];
  pageSize: number;
  onEnterSearch?: () => void;
};

const initialFilters: SearchFilters = {
  query: "",
  museum: "all",
  artist: "",
  department: "",
  medium: "",
  classification: "",
  country: "",
  dateFrom: null,
  dateTo: null,
  sortBy: "relevance",
  sortOrder: "asc",
  hasImage: true,
};

function SearchSection({
  addToExhibition,
  removeFromExhibition,
  exhibition,
  pageSize,
  onEnterSearch,
}: SearchSectionProps) {
  const [rawResults, setRawResults] = useState<Artwork[]>([]);
  const [filters, setFilters] = useState<SearchFilters>(initialFilters);
  const [offset, setOffset] = useState(0);
  const [hasMorePages, setHasMorePages] = useState(true);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [lastQuery, setLastQuery] = useState("");
  const [resetKey, setResetKey] = useState(0);
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const [toast, setToast] = useState({
    visible: false,
    message: "",
    type: "info" as const,
  });
  const [showFilters, setShowFilters] = useState(true);
  const toastTimeoutRef = useRef<number | null>(null);

  const filteredResults = useMemo(
    () => applyFilters(rawResults, filters),
    [rawResults, filters]
  );

  const appliedFilterTags = useMemo(() => {
    const tags: string[] = []

    if (filters.museum !== "all") {
      tags.push(filters.museum === "met" ? "Museum: Met" : "Museum: Harvard")
    }
    if (filters.artist.trim()) {
      tags.push(`Artist: ${filters.artist.trim()}`)
    }
    if (filters.department.trim()) {
      tags.push(`Department: ${filters.department.trim()}`)
    }
    if (filters.medium.trim()) {
      tags.push(`Medium: ${filters.medium.trim()}`)
    }
    if (filters.classification.trim()) {
      tags.push(`Classification: ${filters.classification.trim()}`)
    }
    if (filters.country.trim()) {
      tags.push(`Culture: ${filters.country.trim()}`)
    }
    if (filters.dateFrom !== null || filters.dateTo !== null) {
      const from = filters.dateFrom ?? "Any"
      const to = filters.dateTo ?? "Present"
      tags.push(`Date: ${from} – ${to}`)
    }
    if (!filters.hasImage) {
      tags.push("Has Image: No")
    }

    return tags
  }, [filters])

  const isEmptyResults =
    hasSearched && !loading && filteredResults.length === 0;

  const isFiltersCollapsed = hasSearched && !showFilters;

  const showToast = (
    message: string,
    type: "error" | "success" | "info" = "info",
    autoDismissMs = 4000
  ) => {
    setToast({
      visible: true,
      message,
      type: type as "info", 
    });

    if (toastTimeoutRef.current) {
      window.clearTimeout(toastTimeoutRef.current);
    }

    toastTimeoutRef.current = window.setTimeout(() => {
      hideToast();
      toastTimeoutRef.current = null;
    }, autoDismissMs);
  };

  const showErrorToast = (message: string) => {
    showToast(message, "error");
  };

  const hideToast = () => {
    if (toastTimeoutRef.current) {
      window.clearTimeout(toastTimeoutRef.current);
      toastTimeoutRef.current = null;
    }
    setToast((prev) => ({ ...prev, visible: false }));
  };

  const handleSearch = async (searchFilters: SearchFilters) => {
    onEnterSearch?.();
    setLoading(true);
    setOffset(0);
    setHasMorePages(true);
    setFilters(searchFilters);
    setHasSearched(true);
    setLastQuery(searchFilters.query);

    try {
      const results = await searchArtworks(searchFilters);
      setRawResults(results);
      setHasMorePages(results.length > 0);
      setShowFilters(false);

      const filteredCount = applyFilters(results, searchFilters).length;

      if (filteredCount > 0) {
        showToast(
          `Found ${filteredCount} artwork${filteredCount === 1 ? "" : "s"} matching your filters.`,
          "success"
        );
      } else {
        showToast(
          searchFilters.query.trim()
            ? `No artworks found for "${searchFilters.query}" with the current filters. Try adjusting them.`
            : "No artworks matched your current filters.",
          "info"
        );
      }
    } catch (error) {
      setRawResults([]);
      setHasMorePages(false);
      showErrorToast("Unable to load artwork results. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const loadMore = async () => {
    setLoading(true);

    try {
      const newOffset = offset + pageSize;
      const newResults = await searchArtworks(filters, newOffset);
      if (newResults.length === 0) {
        setHasMorePages(false);
        showToast("No more artworks to load.", "info");
        return;
      }

      const existingIds = new Set(rawResults.map((result) => result.id));
      const uniqueNewResults = newResults.filter(
        (result) => !existingIds.has(result.id)
      );

      if (uniqueNewResults.length === 0) {
        showToast("All loaded artworks are already in your results.", "info");
      } else {
        const updatedResults = [...rawResults, ...uniqueNewResults];
        setRawResults(updatedResults);

        const filteredCount = applyFilters(updatedResults, filters).length;
        showToast(
          `Loaded ${uniqueNewResults.length} more artwork${
            uniqueNewResults.length === 1 ? "" : "s"
          }. ${filteredCount} currently visible after filters.`,
          "success"
        );
      }
      setOffset(newOffset);
    } catch (error) {
      setHasMorePages(false);
      showErrorToast("Unable to load more artwork results. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const resetFilters = () => {
    setFilters(initialFilters);
    setResetKey((value) => value + 1);
    setShowFilters(true);
  };

  const resetSearch = () => {
    resetFilters();
    setRawResults([]);
    setHasSearched(false);
    setHasMorePages(true);
    setOffset(0);
    setLastQuery("");
    setSelectedArtwork(null);
    hideToast();

    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  useEffect(() => {
    return () => {
      if (toastTimeoutRef.current) {
        window.clearTimeout(toastTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (hasSearched && filters.query.trim()) {
      handleSearch(filters);
    }
  }, [
    filters.artist,
    filters.department,
    filters.medium,
    filters.classification,
    filters.country,
    filters.dateFrom,
    filters.dateTo,
  ]);

  return (
    <section id="search" className="space-y-8 text-left">
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.visible}
        onClose={hideToast}
      />

      <div className={`rounded-2xl bg-white/5 backdrop-blur-sm ring-1 ring-white/10 transition-all ${showFilters ? 'space-y-6 p-6' : 'space-y-4 px-5 py-4'}`}>
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold text-white">Search the collections</h2>
            <p className="text-sm text-slate-300/80">
              Browse Met & Harvard picks and add them straight to your gallery.
            </p>
          </div>
          {hasSearched && (
            <button
              type="button"
              onClick={() => setShowFilters((prev) => !prev)}
              className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.3em] text-white/80 transition hover:border-white/25 hover:bg-white/15"
            >
              {showFilters ? 'Hide refine' : 'Refine search'}
            </button>
          )}
        </div>

        {showFilters && (
          <>
            <div className="flex flex-col gap-4 md:flex-row md:items-end">
              <SearchBar
                filters={filters}
                onQueryChange={(value) =>
                  setFilters((prev) => ({ ...prev, query: value }))
                }
                onSubmit={() => handleSearch(filters)}
                loading={loading}
                resetKey={resetKey}
              />
            </div>
            <FilterSort filters={filters} onChange={setFilters} />
            <div id="search-actions" className="flex flex-wrap items-center gap-3">
              <button
                className="inline-flex items-center justify-center rounded-lg bg-white px-4 py-2 text-sm font-medium text-[#000522] transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-60"
                type="button"
                onClick={() => handleSearch(filters)}
                disabled={loading}
              >
                Search
              </button>
              <button
                id="reset-filters"
                className="inline-flex items-center justify-center rounded-lg bg-white/10 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-60"
                type="button"
                onClick={resetFilters}
                disabled={loading && !hasSearched}
              >
                Reset filters
              </button>
            </div>
          </>
        )}
      </div>

      <ResultsSection
        results={filteredResults}
        addToExhibition={addToExhibition}
        removeFromExhibition={removeFromExhibition}
        hasMorePages={hasMorePages}
        loadMore={loadMore}
        loading={loading}
        exhibition={exhibition}
        isEmptyResults={isEmptyResults}
        query={lastQuery}
        onArtworkClick={setSelectedArtwork}
        onReset={resetSearch}
        activeFilters={appliedFilterTags}
      />

      {selectedArtwork && (
        <ArtworkDetailModal
          artwork={selectedArtwork}
          onClose={() => setSelectedArtwork(null)}
        />
      )}
     
    </section>
  );
}

export default SearchSection;
