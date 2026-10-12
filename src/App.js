import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import Attractions from './pages/Attractions.jsx';
import Enquiry from './pages/Enquiry.jsx';
import NotFound from './pages/NotFound.jsx';
import useLocalStorage from './hooks/useLocalStorage.js';
import { attractions } from './data/attractions.js';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  // The trip list lives here so the header, cards, details and enquiry form all share it.
  const [savedIds, setSavedIds] = useLocalStorage('thaba-trip', []);

  const toggleSaved = (id) =>
    setSavedIds((ids) => (ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id]));

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <ScrollToTop />
      <Header savedCount={savedIds.length} />
      <main id="main">
        <Routes>
          <Route path="/" element={<Home attractions={attractions} savedIds={savedIds} onToggleSaved={toggleSaved} />} />
          <Route
            path="/attractions"
            element={<Attractions attractions={attractions} savedIds={savedIds} onToggleSaved={toggleSaved} />}
          />
          <Route
            path="/enquiry"
            element={<Enquiry attractions={attractions} savedIds={savedIds} onToggleSaved={toggleSaved} />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
