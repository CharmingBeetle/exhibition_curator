import { type SearchFilters } from '../types/artwork'

type FilterSortProps = {
  filters: SearchFilters
  onChange: (filters: SearchFilters) => void
}
//filter options arrays
const departmentOptions = ['','American Decorative Arts','Ancient Art','Asian Art','Drawings and Prints','European Paintings','Modern and Contemporary Art','Photography']
const mediumOptions = ['','Oil on canvas','Watercolor','Bronze','Ink on paper','Photograph','Marble','Ceramic', "Etching", "Sculpture", "Photography"]
const classificationOptions = ['','Paintings','Sculpture','Prints','Drawings','Photographs','Textiles','Furniture']
const countryOptions = ['','France','United States','Italy','Japan','Spain','Netherlands','Germany','China','United Kingdom']

function FilterSort({ filters, onChange }: FilterSortProps) {
  const handleChange = (partial: Partial<SearchFilters>) => {
    onChange({ ...filters, ...partial })
  }

  return (
    <div id="filter-sort"
    className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <label id="museum-filter"
      className="flex flex-col gap-1 text-sm text-white/80">
        <span>Museum:</span>
        <select
          className="rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-white outline-none transition focus:border-white/40 focus:ring-2 focus:ring-indigo-500/60"
          value={filters.museum}
          onChange={(event) =>
            handleChange({ museum: event.target.value as SearchFilters['museum'] })
          }
        >
          <option value="all">All Museums</option>
          <option value="met">Metropolitan Museum of Art</option>
          <option value="harvard">Harvard Art Museums</option>
        </select>
      </label>

      <label id="artist-filter"
      className="flex flex-col gap-1 text-sm text-white/80">
        <span>Artist:</span>
        <input
          className="rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-white outline-none transition focus:border-white/40 focus:ring-2 focus:ring-indigo-500/60"
          type="text"
          value={filters.artist}
          placeholder="e.g. Picasso"
          onChange={(event) => handleChange({ artist: event.target.value })}
        />
      </label>

      <label id="department-filter"
      className="flex flex-col gap-1 text-sm text-white/80">
        <span>Department:</span>
        <select
          className="rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-white outline-none transition focus:border-white/40 focus:ring-2 focus:ring-indigo-500/60"
          value={filters.department}
          onChange={(event) => handleChange({ department: event.target.value })}
        >
          {departmentOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>

      <label id="medium-filter"
      className="flex flex-col gap-1 text-sm text-white/80">
        <span>Medium:</span>
        <select
          className="rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-white outline-none transition focus:border-white/40 focus:ring-2 focus:ring-indigo-500/60"
          value={filters.medium}
          onChange={(event) => handleChange({ medium: event.target.value })}
        >
          {mediumOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>

      <label id="classification-filter"
      className="flex flex-col gap-1 text-sm text-white/80">
        <span>Classification:</span>
        <select
          className="rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-white outline-none transition focus:border-white/40 focus:ring-2 focus:ring-indigo-500/60"
          value={filters.classification}
          onChange={(event) => handleChange({ classification: event.target.value })}
        >
          {classificationOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>

      <label id="country-filter"
      className="flex flex-col gap-1 text-sm text-white/80">
        <span>Country/Culture:</span>
        <select
          className="rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-white outline-none transition focus:border-white/40 focus:ring-2 focus:ring-indigo-500/60"
          value={filters.country}
          onChange={(event) => handleChange({ country: event.target.value })}
        >
          {countryOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>

      <label id="date-from-filter"
      className="flex flex-col gap-1 text-sm text-white/80">
        <span>Start year:</span>
        <select
          className="rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-white outline-none transition focus:border-white/40 focus:ring-2 focus:ring-indigo-500/60"
          value={filters.dateFrom ?? ''}
          onChange={(event) =>
            handleChange({
              dateFrom: event.target.value ? Number(event.target.value) : null
            })
          }
        >
          <option value="">Any</option>
          <option value="1500">1500s</option>
          <option value="1600">1600s</option>
          <option value="1700">1700s</option>
          <option value="1800">1800s</option>
          <option value="1900">1900s</option>
          <option value="2000">2000s</option>
        </select>
      </label>

      <label id="date-to-filter"
      className="flex flex-col gap-1 text-sm text-white/80">
        <span>End year:</span>
        <select
          className="rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-white outline-none transition focus:border-white/40 focus:ring-2 focus:ring-indigo-500/60"
          value={filters.dateTo ?? ''}
          onChange={(event) =>
            handleChange({
              dateTo: event.target.value ? Number(event.target.value) : null
            })
          }
        >
          <option value="">Any</option>
          <option value="1600">1600s</option>
          <option value="1700">1700s</option>
          <option value="1800">1800s</option>
          <option value="1900">1900s</option>
          <option value="2000">2000s</option>
          <option value="2100">2000s+</option>
        </select>
      </label>
    
      <label id="sort-by-filter"
      className="flex flex-col gap-1 text-sm text-white/80">
        <span>Sort by:</span>
        <select
        className="rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-white outline-none transition focus:border-white/40 focus:ring-2 focus:ring-indigo-500/60"
          value={filters.sortBy}
          onChange={(event) =>
            handleChange({ sortBy: event.target.value as SearchFilters['sortBy'] })
          }
        >
          <option value="relevance">Relevance</option>
          <option value="artist">Artist</option>
          <option value="title">Title</option>
        </select>
      </label>

      <label id="sort-order-filter"
      className="flex flex-col gap-1 text-sm text-white/80">
        <span>Sort order:</span>
        <select
          className="rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-white outline-none transition focus:border-white/40 focus:ring-2 focus:ring-indigo-500/60"
          value={filters.sortOrder}
          onChange={(event) =>
            handleChange({ sortOrder: event.target.value as SearchFilters['sortOrder'] })
          }
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </label>

      <label id="has-image-filter"
      className="flex flex-col gap-1 text-sm text-white/80">
        <span>Has image:</span>
        <select
          className="rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-white outline-none transition focus:border-white/40 focus:ring-2 focus:ring-indigo-500/60"
          value={filters.hasImage ? 'true' : 'false'}
          onChange={(event) => handleChange({ hasImage: event.target.value === 'true' })}
        >
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
      </label>
    </div>
  )
}

export default FilterSort