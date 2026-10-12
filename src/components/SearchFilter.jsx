import { metres } from '../utils/format.js';

export const ALT_MIN = 1400;
export const ALT_MAX = 3400;

// Controlled inputs: all values live in the Attractions page and arrive as props.
export default function SearchFilter({
  query,
  onQueryChange,
  category,
  onCategoryChange,
  categories,
  sort,
  onSortChange,
  minAlt,
  onMinAltChange,
  shown,
  total,
  onReset,
}) {
  const filtersActive = query || category !== 'All' || minAlt > ALT_MIN || sort !== 'altitude-desc';

  return (
    <form className="filters" role="search" onSubmit={(e) => e.preventDefault()}>
      <div className="filter-field filter-search">
        <label htmlFor="search">Search by name</label>
        <input
          id="search"
          type="search"
          value={query}
          placeholder="Try falls, Sani or Morija"
          onChange={(e) => onQueryChange(e.target.value)}
          autoComplete="off"
        />
      </div>

      <fieldset className="filter-field filter-cats">
        <legend>Category</legend>
        <div className="cat-buttons">
          {['All', ...categories].map((c) => (
            <button
              key={c}
              type="button"
              className={c === category ? 'pill is-on' : 'pill'}
              aria-pressed={c === category}
              onClick={() => onCategoryChange(c)}
            >
              {c}
            </button>
          ))}
        </div>
      </fieldset>

      <div className="filter-field">
        <label htmlFor="alt">
          Climb at least <output htmlFor="alt">{metres(minAlt)}</output>
        </label>
        <input
          id="alt"
          type="range"
          min={ALT_MIN}
          max={ALT_MAX}
          step={100}
          value={minAlt}
          onChange={(e) => onMinAltChange(Number(e.target.value))}
        />
      </div>

      <div className="filter-field">
        <label htmlFor="sort">Sort by</label>
        <select id="sort" value={sort} onChange={(e) => onSortChange(e.target.value)}>
          <option value="altitude-desc">Highest first</option>
          <option value="altitude-asc">Lowest first</option>
          <option value="name-asc">Name, A to Z</option>
          <option value="cost-asc">Lowest cost first</option>
        </select>
      </div>

      <div className="filter-status">
        <p role="status" aria-live="polite">
          Showing {shown} of {total} places
        </p>
        {filtersActive && (
          <button type="button" className="link-btn" onClick={onReset}>
            Clear filters
          </button>
        )}
      </div>
    </form>
  );
}
