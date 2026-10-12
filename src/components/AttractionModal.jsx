import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { imageUrl, metres, slug } from '../utils/format.js';

// Detail view for the selected attraction. Opens and closes through React state in the parent.
export default function AttractionModal({ attraction, saved, onToggleSaved, onClose }) {
  const closeRef = useRef(null);
  const { id, name, image, location, category, altitude, details, activities, cost, bestTime, tip } = attraction;

  useEffect(() => {
    const previouslyFocused = document.activeElement;
    closeRef.current?.focus();
    document.body.style.overflow = 'hidden';

    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);

    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
      previouslyFocused?.focus?.();
    };
  }, [onClose]);

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        data-cat={slug(category)}
        onClick={(e) => e.stopPropagation()}
      >
        <button ref={closeRef} type="button" className="modal-close" onClick={onClose}>
          Close
        </button>

        <div className="modal-media">
          <img src={imageUrl(image)} alt={`Illustration of ${name}`} />
          <span className="altitude-tab">{metres(altitude)}</span>
        </div>

        <div className="modal-body">
          <p className="modal-cat">{category}</p>
          <h2 id="modal-title">{name}</h2>
          <p className="card-location">{location}</p>
          <p className="modal-text">{details}</p>

          <h3>Things to do</h3>
          <ul className="chips">
            {activities.map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ul>

          <dl className="facts">
            <div>
              <dt>Estimated cost</dt>
              <dd>{cost}</dd>
            </div>
            <div>
              <dt>Best time to go</dt>
              <dd>{bestTime}</dd>
            </div>
            <div>
              <dt>Good to know</dt>
              <dd>{tip}</dd>
            </div>
          </dl>

          <div className="card-actions">
            <Link to={`/enquiry?dest=${id}`} className="btn btn-primary">
              Enquire about this place
            </Link>
            <button
              type="button"
              className={saved ? 'btn btn-saved' : 'btn'}
              aria-pressed={saved}
              onClick={() => onToggleSaved(id)}
            >
              {saved ? 'Saved to trip' : 'Save to trip'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
