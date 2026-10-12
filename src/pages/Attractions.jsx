import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import AttractionCard from '../components/AttractionCard.jsx';
import AttractionModal from '../components/AttractionModal.jsx';
import SearchFilter, { ALT_MIN } from '../components/SearchFilter.jsx';
import { CATEGORIES } from '../data/attractions.js';

const sorters = {
  'altitude-desc': (a, b) => b.altitude - a.altitude,
  'altitude-asc': (a, b) => a.altitude - b.altitude,
  'name-asc': (a, b) => a.name.localeCompare(b.name),
  'cost-asc': (a, b) => a.costFrom - b.costFrom,
};

export default function Attractions({ attractions, savedIds, onToggleSaved }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [sort, setSort] = useState('altitude-desc');
  const [minAlt, setMinAlt] = useState(ALT_MIN);
  const [selectedId, setSelectedId] = useState(null);

  // Keep the open details panel in sync with the address bar (?open=id), so links can deep-link to it.
  useEffect(() => {
    const id = searchParams.get('open');
    setSelectedId(attractions.some((a) => a.id === id) ? id : null);
  }, [searchParams, attractions]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return attractions
      .filter((a) => (q ? a.name.toLowerCase().includes(q) : true))
      .filter((a) => (category === 'All' ? true : a.category === category))
      .filter((a) => a.altitude >= minAlt)
      .sort(sorters[sort]);
  }, [attractions, query, category, minAlt, sort]);

  const selected = attractions.find((a) => a.id === selectedId);

  const openDetails = (id) => setSearchParams({ open: id });
  const closeDetails = () => setSearchParams({});

  const resetFilters = () => {
    setQuery('');
    setCategory('All');
    setSort('altitude-desc');
    setMinAlt(ALT_MIN);
  };

  return (
    <div className="page">
      <div className="container">
        <header className="page-head">
          <h1>Where to go in Lesotho</h1>
          <p className="lead">
            Ten places, from the old mission town of Morija at 1,600 m to the summit of southern
            Africa. Search by name, filter by type, or set a minimum altitude.
          </p>
        </header>

        <SearchFilter
          query={query}
          onQueryChange={setQuery}
          category={category}
          onCategoryChange={setCategory}
          categories={CATEGORIES}
          sort={sort}
          onSortChange={setSort}
          minAlt={minAlt}
          onMinAltChange={setMinAlt}
          shown={results.length}
          total={attractions.length}
          onReset={resetFilters}
        />

        {results.length > 0 ? (
          <div className="card-grid">
            {results.map((a) => (
              <AttractionCard
                key={a.id}
                attraction={a}
                saved={savedIds.includes(a.id)}
                onToggleSaved={onToggleSaved}
                onOpen={openDetails}
              />
            ))}
          </div>
        ) : (
          <div className="empty">
            <h2>No places match</h2>
            <p>Try a shorter name, another category, or a lower altitude.</p>
            <button type="button" className="btn" onClick={resetFilters}>
              Clear filters
            </button>
          </div>
        )}
      </div>

      {selected && (
        <AttractionModal
          attraction={selected}
          saved={savedIds.includes(selected.id)}
          onToggleSaved={onToggleSaved}
          onClose={closeDetails}
        />
      )}
    </div>
  );
}
