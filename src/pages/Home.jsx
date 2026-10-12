import { Link, useNavigate } from 'react-router-dom';
import ElevationHero from '../components/ElevationHero.jsx';
import AttractionCard from '../components/AttractionCard.jsx';
import { activities } from '../data/activities.js';
import { getAttraction } from '../data/attractions.js';

const facts = [
  { term: 'Altitude', detail: 'The lowest point is 1,400 m. Thabana Ntlenyana, at 3,482 m, is the highest in southern Africa.' },
  { term: 'Capital', detail: 'Maseru, in the western lowlands near the South African border.' },
  { term: 'Languages', detail: 'Sesotho and English. Greet people with "Lumela".' },
  { term: 'Money', detail: 'The loti (plural maloti, M) is pegged one to one with the South African rand, which shops also accept.' },
  { term: 'Geography', detail: 'About 30,000 km², completely surrounded by South Africa, with roughly 2.3 million people.' },
  { term: 'Independence', detail: '4 October 1966, after becoming a British protectorate in 1868.' },
];

const seasons = [
  { name: 'Summer', months: 'November to March', text: 'Green hills, full waterfalls and the best weather for hiking and pony trekking. Afternoon storms are common.' },
  { name: 'Autumn', months: 'April to May', text: 'Clear skies, golden grass and quiet trails. Nights turn cold at altitude.' },
  { name: 'Winter', months: 'June to August', text: 'Snow on the high passes, frozen waterfalls and skiing at Afriski. Pack serious warm layers.' },
  { name: 'Spring', months: 'September to October', text: 'Wildflowers, longer days and the Morija festival. Good value before the summer rush.' },
];

export default function Home({ attractions, savedIds, onToggleSaved }) {
  const navigate = useNavigate();
  const featured = attractions.filter((a) => a.featured);

  return (
    <>
      <ElevationHero attractions={attractions} />

      <section className="section" aria-labelledby="about-title">
        <div className="container about-grid">
          <div>
            <h2 id="about-title">The Kingdom in the Sky</h2>
            <p className="lead">
              Lesotho is a mountain country with its own language, its own hat and a blanket worn as
              a coat. Roads here are measured in switchbacks, villages sit on ridges, and herders
              still ride ponies between them.
            </p>
            <p>
              It is small enough to cross in a day and varied enough to fill two weeks. You can ski in
              July, abseil beside a waterfall, sleep in a rondavel and stand on the highest point in
              southern Africa, all without leaving the country.
            </p>
          </div>
          <dl className="fact-list">
            {facts.map((f) => (
              <div key={f.term}>
                <dt>{f.term}</dt>
                <dd>{f.detail}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="section section-tint" aria-labelledby="featured-title">
        <div className="container">
          <div className="section-head">
            <h2 id="featured-title">Featured destinations</h2>
            <Link to="/attractions" className="text-link">See all {attractions.length} attractions</Link>
          </div>
          <div className="card-grid">
            {featured.map((a) => (
              <AttractionCard
                key={a.id}
                attraction={a}
                saved={savedIds.includes(a.id)}
                onToggleSaved={onToggleSaved}
                onOpen={(id) => navigate(`/attractions?open=${id}`)}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="activities-title">
        <div className="container">
          <div className="section-head">
            <h2 id="activities-title">Popular activities</h2>
          </div>
          <div className="activity-grid">
            {activities.map((act) => (
              <article key={act.id} className="activity">
                <h3>{act.name}</h3>
                <p>{act.blurb}</p>
                <p className="activity-where">
                  {act.where.map((id, i) => {
                    const a = getAttraction(id);
                    return (
                      <span key={id}>
                        {i > 0 && ', '}
                        <Link to={`/attractions?open=${id}`}>{a.name}</Link>
                      </span>
                    );
                  })}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-tint" aria-labelledby="seasons-title">
        <div className="container">
          <div className="section-head">
            <h2 id="seasons-title">When to visit</h2>
          </div>
          <div className="season-row">
            {seasons.map((s) => (
              <div key={s.name} className="season">
                <h3>{s.name}</h3>
                <p className="season-months">{s.months}</p>
                <p>{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta" aria-labelledby="cta-title">
        <div className="container cta-inner">
          <h2 id="cta-title">Ready to plan your climb?</h2>
          <p>Save the places you like, then send one enquiry for all of them.</p>
          <Link to="/enquiry" className="btn btn-primary">Plan your visit</Link>
        </div>
      </section>
    </>
  );
}
