import { type SearchFilters } from '../types/artwork'

type FilterSortProps = {
  filters: SearchFilters
  onChange: (filters: SearchFilters) => void
}
//filter options arrays
const departmentOptions = ['','American Decorative Arts','Ancient Art','Asian Art','Drawings and Prints','European Paintings','Modern and Contemporary Art','Photography']
const mediumOptions = ['','Oil on canvas','Watercolor','Bronze','Ink on paper','Photograph','Marble','Ceramic']
const classificationOptions = ['','Paintings','Sculpture','Prints','Drawings','Photographs','Textiles','Furniture']
const countryOptions = ['','France','United States','Italy','Japan','Spain','Netherlands','Germany','China','United Kingdom']

function FilterSort({ filters, onChange }: FilterSortProps) {
  const handleChange = (partial: Partial<SearchFilters>) => {
    onChange({ ...filters, ...partial })
  }

  return (
    <div className="filter-sort">
      <label>
        <span>Museum:</span>
        <select
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
<br />
      <label>
        <span>Artist:</span>
        <input
          type="text"
          value={filters.artist}
          placeholder="e.g. Picasso"
          onChange={(event) => handleChange({ artist: event.target.value })}
        />
      </label>
<br />
      <label>
        <span>Department:</span>
        <select
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

      <label>
        <span>Medium:</span>
        <select
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
<br />
      <label>
        <span>Classification:</span>
        <select
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

      <label>
        <span>Country/Culture:</span>
        <select
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
<br />
      <label>
        <span>Start year:</span>
        <select
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
<br />
      <label>
        <span>End year:</span>
        <select
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
<br />
      <label>
        <span>Sort by:</span>
        <select
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
<br />
      <label>
        <span>Sort order:</span>
        <select
          value={filters.sortOrder}
          onChange={(event) =>
            handleChange({ sortOrder: event.target.value as SearchFilters['sortOrder'] })
          }
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </label>
<br />
      <label>
        <span>Has image:</span>
        <select
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