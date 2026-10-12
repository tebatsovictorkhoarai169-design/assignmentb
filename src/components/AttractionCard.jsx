import { imageUrl, metres, slug } from '../utils/format.js';

// One destination. Everything shown comes from the `attraction` prop (see data/attractions.js).
export default function AttractionCard({ attraction, saved, onToggleSaved, onOpen }) {
  const { id, name, image, location, category, altitude, description, activities, cost } = attraction;

  return (
    <article className="card" data-cat={slug(category)}>
      <button type="button" className="card-media" onClick={() => onOpen(id)} aria-label={`View details for ${name}`}>
        <img src={imageUrl(image)} alt={`Illustration of ${name}`} width="1200" height="800" loading="lazy" />
        <span className="cat-chip">{category}</span>
        <span className="altitude-tab">{metres(altitude)}</span>
      </button>

      <div className="card-body">
        <h3>{name}</h3>
        <p className="card-location">{location}</p>
        <p className="card-desc">{description}</p>

        <ul className="chips" aria-label="Activities">
          {activities.slice(0, 3).map((a) => (
            <li key={a}>{a}</li>
          ))}
          {activities.length > 3 && <li className="chips-more">+{activities.length - 3} more</li>}
        </ul>

        <p className="card-cost">
          <span>Estimated cost</span> {cost}
        </p>

        <div className="card-actions">
          <button type="button" className="btn btn-small btn-primary" onClick={() => onOpen(id)}>
            View details
          </button>
          <button
            type="button"
            className={saved ? 'btn btn-small btn-saved' : 'btn btn-small'}
            aria-pressed={saved}
            onClick={() => onToggleSaved(id)}
          >
            {saved ? 'Saved to trip' : 'Save to trip'}
          </button>
        </div>
      </div>
    </article>
  );
}
