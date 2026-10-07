import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { SamuraiPortfolio } from './SamuraiPortfolio';
const NetflixApp=lazy(()=>import('./NetflixApp').then(module=>({default:module.NetflixApp})));

function App() {
  return (
    <Router>
      <Routes>
        {/* The samurai portfolio is the main site at / */}
        <Route path="/" element={<SamuraiPortfolio />} />
        
        {/* The netflix-themed portfolio is at /flix */}
        <Route path="/flix" element={<Suspense fallback={<div className="sp-route-loading">Loading Flix…</div>}><NetflixApp /></Suspense>} />
      </Routes>
    </Router>
  );
}

export default App;
