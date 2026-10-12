import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="litema" aria-hidden="true" />
      <div className="container footer-grid">
        <div>
          <p className="footer-brand">Thaba</p>
          <p className="footer-note">
            Thaba means mountain in Sesotho. This guide covers ten places across Lesotho, from
            the lowlands near Maseru to the summit of southern Africa.
          </p>
        </div>
        <nav aria-label="Footer">
          <Link to="/">Home</Link>
          <Link to="/attractions">Attractions</Link>
          <Link to="/enquiry">Plan your visit</Link>
        </nav>
        <p className="footer-small">
          Prices are estimates in Maloti (M) and altitudes are approximate. Confirm details with
          the operator before you travel. Tsamaea hantle, go well.
        </p>
      </div>
    </footer>
  );
}
