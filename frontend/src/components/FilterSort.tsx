import { type SearchFilters } from '../types/artwork'

type FilterSortProps = {
  filters: SearchFilters
  onChange: (filters: SearchFilters) => void
}
//filter options arrays
const departmentOptions = ['','American Decorative Arts','Ancient Art','Asian Art','Drawings and Prints','European Paintings','Modern and Contemporary Art','Photography']
const mediumOptions = ['','Oil on canvas','Watercolor','Bronze','Ink on paper','Photograph','Marble','Ceramic', "Etching", "Sculpture", "Photography"]
const classificationOptions = ['','Paintings','Sculpture','Prints','Drawings','Photographs','Textiles','Furniture']
const countryOptions = [
  '',
  'American',
  'German',
  'French',
  'Italian',
  'British',
  'Greek',
  'Roman',
  'Japanese',
  'Chinese',
  'Persian',
  'Indian',
  'Dutch',
  'Spanish',
  'Korean',
  'Egyptian',
  'Russian',
  'Austrian',
  'Swiss',
  'Belgian',
  'Canadian'
]

function FilterSort({ filters, onChange }: FilterSortProps) {
  const handleChange = (partial: Partial<SearchFilters>) => {
    onChange({ ...filters, ...partial })
  }

  return (
    <fieldset className="grid gap-4 md:grid-cols-2 lg:grid-cols-3" aria-labelledby="filter-legend">
      <legend id="filter-legend" className="sr-only">
        Filter and sort options for artwork search
      </legend>
      <label htmlFor="museum-filter" className="flex flex-col gap-1 text-sm text-[#1b1c17]">
        <span>Museum:</span>
        <select
          id="museum-filter"
          className="rounded-lg border border-[#89A8B2]/30 bg-[#F1F0E8]/80 px-3 py-2 text-[#5A6B73] outline-none transition focus:border-[#89A8B2]/60 focus:ring-2 focus:ring-[#89A8B2]/60"
          value={filters.museum}
          onChange={(event) =>
            handleChange({ museum: event.target.value as SearchFilters['museum'] })
          }
          aria-label="Select museum to search"
        >
          <option value="all">All Museums</option>
          <option value="met">Metropolitan Museum of Art</option>
          <option value="harvard">Harvard Art Museums</option>
        </select>
      </label>

      <label htmlFor="artist-filter" className="flex flex-col gap-1 text-sm text-[#1b1c17]">
        <span>Artist:</span>
        <input
          id="artist-filter"
          className="rounded-lg border border-[#89A8B2]/30 bg-[#F1F0E8]/80 px-3 py-2 text-[#1b1c17] outline-none transition focus:border-[#89A8B2]/60 focus:ring-2 focus:ring-[#89A8B2]/60"
          type="text"
          value={filters.artist}
          placeholder="e.g. Picasso"
          onChange={(event) => handleChange({ artist: event.target.value })}
          aria-label="Enter artist name to filter by"
        />
      </label>

      <label htmlFor="department-filter" className="flex flex-col gap-1 text-sm text-[#1b1c17]">
        <span>Department:</span>
        <select
          id="department-filter"
          className="rounded-lg border border-[#89A8B2]/30 bg-[#F1F0E8]/80 px-3 py-2 text-[#1b1c17] outline-none transition focus:border-[#89A8B2]/60 focus:ring-2 focus:ring-[#89A8B2]/60"
          value={filters.department}
          onChange={(event) => handleChange({ department: event.target.value })}
          aria-label="Select department to filter by"
        >
          {departmentOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>

      <label htmlFor="medium-filter" className="flex flex-col gap-1 text-sm text-[#1b1c17]">
        <span>Medium:</span>
        <select
          id="medium-filter"
          className="rounded-lg border border-[#89A8B2]/30 bg-[#F1F0E8]/80 px-3 py-2 text-[#5A6B73] outline-none transition focus:border-[#89A8B2]/60 focus:ring-2 focus:ring-[#89A8B2]/60"
          value={filters.medium}
          onChange={(event) => handleChange({ medium: event.target.value })}
          aria-label="Select medium to filter by"
        >
          {mediumOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>

      <label htmlFor="classification-filter" className="flex flex-col gap-1 text-sm text-[#1b1c17]">
        <span>Classification:</span>
        <select
          id="classification-filter"
          className="rounded-lg border border-[#89A8B2]/30 bg-[#F1F0E8]/80 px-3 py-2 text-[#5A6B73] outline-none transition focus:border-[#89A8B2]/60 focus:ring-2 focus:ring-[#89A8B2]/60"
          value={filters.classification}
          onChange={(event) => handleChange({ classification: event.target.value })}
          aria-label="Select classification to filter by"
        >
          {classificationOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>

      <label htmlFor="country-filter" className="flex flex-col gap-1 text-sm text-[#1b1c17]">
        <span>Country/Culture:</span>
        <select
          id="country-filter"
          className="rounded-lg border border-[#89A8B2]/30 bg-[#F1F0E8]/80 px-3 py-2 text-[#1b1c17] outline-none transition focus:border-[#89A8B2]/60 focus:ring-2 focus:ring-[#89A8B2]/60"
          value={filters.country}
          onChange={(event) => handleChange({ country: event.target.value })}
          aria-label="Select country or culture to filter by"
        >
          {countryOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>

      <label htmlFor="date-from-filter" className="flex flex-col gap-1 text-sm text-[#1b1c17]">
        <span>Start year:</span>
        <select
          id="date-from-filter"
          className="rounded-lg border border-[#89A8B2]/30 bg-[#F1F0E8]/80 px-3 py-2 text-[#5A6B73] outline-none transition focus:border-[#89A8B2]/60 focus:ring-2 focus:ring-[#89A8B2]/60"
          value={filters.dateFrom ?? ''}
          onChange={(event) =>
            handleChange({
              dateFrom: event.target.value ? Number(event.target.value) : null
            })
          }
          aria-label="Select start year for date range"
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

      <label htmlFor="date-to-filter" className="flex flex-col gap-1 text-sm text-[#1b1c17]">
        <span>End year:</span>
        <select
          id="date-to-filter"
          className="rounded-lg border border-[#89A8B2]/30 bg-[#F1F0E8]/80 px-3 py-2 text-[#5A6B73] outline-none transition focus:border-[#89A8B2]/60 focus:ring-2 focus:ring-[#89A8B2]/60"
          value={filters.dateTo ?? ''}
          onChange={(event) =>
            handleChange({
              dateTo: event.target.value ? Number(event.target.value) : null
            })
          }
          aria-label="Select end year for date range"
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
    
      <label htmlFor="sort-by-filter" className="flex flex-col gap-1 text-sm text-[#1b1c17]">
        <span>Sort by:</span>
        <select
          id="sort-by-filter"
          className="rounded-lg border border-[#89A8B2]/30 bg-[#F1F0E8]/80 px-3 py-2 text-[#5A6B73] outline-none transition focus:border-[#89A8B2]/60 focus:ring-2 focus:ring-[#89A8B2]/60"
          value={filters.sortBy}
          onChange={(event) =>
            handleChange({ sortBy: event.target.value as SearchFilters['sortBy'] })
          }
          aria-label="Select field to sort results by"
        >
          <option value="relevance">Relevance</option>
          <option value="artist">Artist</option>
          <option value="title">Title</option>
        </select>
      </label>

      <label htmlFor="sort-order-filter" className="flex flex-col gap-1 text-sm text-[#1b1c17]">
        <span>Sort order:</span>
        <select
          id="sort-order-filter"
          className="rounded-lg border border-[#89A8B2]/30 bg-[#F1F0E8]/80 px-3 py-2 text-[#5A6B73] outline-none transition focus:border-[#89A8B2]/60 focus:ring-2 focus:ring-[#89A8B2]/60"
          value={filters.sortOrder}
          onChange={(event) =>
            handleChange({ sortOrder: event.target.value as SearchFilters['sortOrder'] })
          }
          aria-label="Select sort order (ascending or descending)"
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </label>

      <label htmlFor="has-image-filter" className="flex flex-col gap-1 text-sm text-[#1b1c17]">
        <span>Has image:</span>
        <select
          id="has-image-filter"
          className="rounded-lg border border-[#89A8B2]/30 bg-[#F1F0E8]/80 px-3 py-2 text-[#5A6B73] outline-none transition focus:border-[#89A8B2]/60 focus:ring-2 focus:ring-[#89A8B2]/60"
          value={filters.hasImage ? 'true' : 'false'}
          onChange={(event) => handleChange({ hasImage: event.target.value === 'true' })}
          aria-label="Filter by whether artwork has an image"
        >
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
      </label>
    </fieldset>
  )
}

export default FilterSort