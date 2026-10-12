import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useCountUp from '../hooks/useCountUp.js';
import { metres } from '../utils/format.js';

// The hero is an elevation profile: every attraction is a pin placed at its real altitude,
// lowest on the left, highest on the right. The whole country sits above the dashed line.
const VB_W = 1000;
const VB_H = 430;
const BASE_Y = 380;
const TOP_Y = 60;
const MIN_ALT = 1400;
const MAX_ALT = 3500;
const TICKS = [2000, 2500, 3000, 3500];

const yFor = (alt) => BASE_Y - ((alt - MIN_ALT) / (MAX_ALT - MIN_ALT)) * (BASE_Y - TOP_Y);

// Deterministic "random" so the ridge looks the same on every render.
const noise = (i) => {
  const x = Math.sin(i * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
};

function buildRidge(pins) {
  const pts = [{ x: 0, y: yFor(1550) }];
  let n = 0;
  pins.forEach((pin) => {
    const prev = pts[pts.length - 1];
    for (let k = 1; k <= 5; k += 1) {
      const t = k / 6;
      pts.push({
        x: prev.x + (pin.x - prev.x) * t,
        y: prev.y + (pin.y - prev.y) * t + (noise(n++) - 0.5) * 26,
      });
    }
    pts.push({ x: pin.x, y: pin.y });
  });
  const last = pts[pts.length - 1];
  for (let k = 1; k <= 4; k += 1) {
    const t = k / 5;
    pts.push({ x: last.x + (VB_W - last.x) * t, y: last.y + (yFor(2100) - last.y) * t + (noise(n++) - 0.5) * 20 });
  }
  return pts;
}

const toPath = (pts) =>
  `M0 ${VB_H} ` + pts.map((p) => `L${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ') + ` L${VB_W} ${VB_H} Z`;

export default function ElevationHero({ attractions }) {
  const navigate = useNavigate();

  const pins = useMemo(() => {
    const sorted = [...attractions].sort((a, b) => a.altitude - b.altitude);
    const step = (VB_W - 150) / (sorted.length - 1);
    return sorted.map((a, i) => ({ ...a, x: 75 + i * step, y: yFor(a.altitude) }));
  }, [attractions]);

  const highest = pins[pins.length - 1];
  const [activeId, setActiveId] = useState(highest.id);
  const active = pins.find((p) => p.id === activeId) || highest;
  const shownAltitude = useCountUp(active.altitude);

  const ridge = useMemo(() => buildRidge(pins), [pins]);
  const backRidge = useMemo(
    () => ridge.map((p, i) => ({ x: p.x, y: p.y - 36 - noise(i + 90) * 30 })),
    [ridge]
  );

  const goTo = (id) => navigate(`/attractions?open=${id}`);

  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="container hero-copy">
        <h1 id="hero-title">Lumela. Here, even the valleys start 1,400 metres up.</h1>
        <p>
          Lesotho is the only country in the world that sits entirely above 1,000 metres. Waterfalls,
          ski slopes, royal fortresses and rock art are all part of the climb. Pick a pin to see how
          high each place sits.
        </p>
        <div className="hero-actions">
          <Link to="/attractions" className="btn btn-primary">Explore attractions</Link>
          <Link to="/enquiry" className="btn btn-ghost">Plan your visit</Link>
        </div>
      </div>

      <div className="container">
        <figure className="profile">
          <svg
            viewBox={`0 0 ${VB_W} ${VB_H}`}
            role="group"
            aria-label="Elevation profile of ten Lesotho attractions, from 1,600 metres at Morija to 3,482 metres at Thabana Ntlenyana"
          >
            {TICKS.map((t) => (
              <g key={t}>
                <line x1="0" x2={VB_W} y1={yFor(t)} y2={yFor(t)} className="grid-line" />
                <text x="8" y={yFor(t) - 6} className="axis-text">{metres(t)}</text>
              </g>
            ))}

            <path d={toPath(backRidge)} className="ridge-back" />
            <path d={toPath(ridge)} className="ridge-front" />

            <line x1="0" x2={VB_W} y1={BASE_Y} y2={BASE_Y} className="base-line" />
            <text x={VB_W - 8} y={BASE_Y + 24} textAnchor="end" className="axis-text">
              1,400 m, the lowest point anywhere in Lesotho
            </text>

            {pins.map((p) => {
              const isActive = p.id === active.id;
              return (
                <g
                  key={p.id}
                  className={isActive ? 'pin is-active' : 'pin'}
                  tabIndex={0}
                  role="link"
                  aria-label={`${p.name}, ${metres(p.altitude)}. Open details`}
                  onMouseEnter={() => setActiveId(p.id)}
                  onFocus={() => setActiveId(p.id)}
                  onClick={() => goTo(p.id)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      goTo(p.id);
                    }
                  }}
                >
                  <circle cx={p.x} cy={p.y} r="26" className="pin-hit" />
                  <line x1={p.x} x2={p.x} y1={p.y} y2={BASE_Y} className="pin-stem" />
                  <circle cx={p.x} cy={p.y} r={isActive ? 11 : 7} className="pin-dot" />
                </g>
              );
            })}
          </svg>

          <figcaption className="profile-readout" aria-live="polite">
            <span className="readout-number" aria-hidden="true">{metres(shownAltitude)}</span>
            <span className="readout-text">
              <strong>{active.name}</strong>
              <span>{active.location}</span>
              <span className="sr-only">{metres(active.altitude)} above sea level</span>
            </span>
            <button type="button" className="btn btn-small" onClick={() => goTo(active.id)}>
              View details
            </button>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
