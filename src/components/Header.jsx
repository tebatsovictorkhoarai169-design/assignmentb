import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Mark from './Mark.jsx';

export default function Header({ savedCount }) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <header className="site-header">
      <div className="container header-row">
        <Link to="/" className="brand" onClick={close} aria-label="Thaba, go to home page">
          <Mark />
          <span>Thaba</span>
        </Link>

        <button
          type="button"
          className="menu-btn"
          aria-expanded={open}
          aria-controls="main-nav"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? 'Close' : 'Menu'}
        </button>

        <nav id="main-nav" className={open ? 'nav is-open' : 'nav'} aria-label="Main">
          <NavLink to="/" end onClick={close}>Home</NavLink>
          <NavLink to="/attractions" onClick={close}>Attractions</NavLink>
          <NavLink to="/enquiry" onClick={close}>
            Plan your visit
            {savedCount > 0 && (
              <span className="count" aria-label={`${savedCount} saved destinations`}>
                {savedCount}
              </span>
            )}
          </NavLink>
        </nav>
      </div>
      <div className="blanket-stripe" aria-hidden="true" />
    </header>
  );
}
