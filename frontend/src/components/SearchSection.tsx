import { useState, useMemo, useEffect } from "react";
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
    type: "error" as const,
  });

  const filteredResults = useMemo(
    () => applyFilters(rawResults, filters),
    [rawResults, filters]
  );
  const isEmptyResults =
    hasSearched && !loading && filteredResults.length === 0;

  const showErrorToast = (message: string) => {
    setToast({
      visible: true,
      message,
      type: "error",
    });
  };

  const handleSearch = async (searchFilters: SearchFilters) => {
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
      setToast((prev) => ({ ...prev, visible: false }));
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
      const newOffset = offset + 10;
      const newResults = await searchArtworks(filters, newOffset);
      if (newResults.length === 0) {
        setHasMorePages(false);
        return;
      }

      const existingIds = new Set(rawResults.map((result) => result.id));
      const uniqueNewResults = newResults.filter(
        (result) => !existingIds.has(result.id)
      );

      setRawResults((prev) => [...prev, ...uniqueNewResults]);
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
    setResetKey((value) => value + 1); //reset key to force re-render
  };

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
    <section id="search" 
    className="mx-auto max-w-5xl space-y-8 text-left pt-4">
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.visible}
        onClose={() => setToast((prev) => ({ ...prev, visible: false }))}
      />
      <div
        id="search-controls"
        className="rounded-2xl bg-white/5 p-6 backdrop-blur-sm ring-1 ring-white/10 space-y-6"
      >
        <h2 className="text-3xl font-semibold text-white">Search</h2>
        <div className=" flex flex-col gap-4 md:flex-row md:items-end justify-center">
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
          className="inline-flex items-center justify-center rounded-lg bg-white px-4 py-2 text-sm font-medium text-[#000522] opacity-100 transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-60"
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
            Reset Filters
          </button>
        </div>
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
