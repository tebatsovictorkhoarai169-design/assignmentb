import { Link, useSearchParams } from 'react-router-dom';
import EnquiryForm from '../components/EnquiryForm.jsx';
import { metres } from '../utils/format.js';

export default function Enquiry({ attractions, savedIds, onToggleSaved }) {
  const [searchParams] = useSearchParams();
  const requested = searchParams.get('dest');
  const initialDestination = attractions.some((a) => a.id === requested) ? requested : savedIds[0] || '';
  const saved = attractions.filter((a) => savedIds.includes(a.id));

  return (
    <div className="page">
      <div className="container enquiry-layout">
        <div>
          <header className="page-head">
            <h1>Plan your visit</h1>
            <p className="lead">
              Tell us where you want to go and when. Every field is required so we can reply with
              prices and availability.
            </p>
          </header>
          <EnquiryForm attractions={attractions} initialDestination={initialDestination} />
        </div>

        <aside className="trip" aria-labelledby="trip-title">
          <h2 id="trip-title">Your trip list</h2>
          {saved.length === 0 ? (
            <p>
              Nothing saved yet. <Link to="/attractions">Browse attractions</Link> and choose Save to
              trip.
            </p>
          ) : (
            <ul>
              {saved.map((a) => (
                <li key={a.id}>
                  <span>
                    <strong>{a.name}</strong>
                    <small>{metres(a.altitude)}</small>
                  </span>
                  <button type="button" className="link-btn" onClick={() => onToggleSaved(a.id)}>
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}
        </aside>
      </div>
    </div>
  );
}
