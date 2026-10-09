import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { SamuraiPortfolio } from './SamuraiPortfolio';
import { editorialPages } from './data/editorialPages';
const NetflixApp=lazy(()=>import('./NetflixApp').then(module=>({default:module.NetflixApp})));

function App() {
  return (
    <Router>
      <Routes>
        {editorialPages.map(page => <Route key={page.id} path={page.path} element={<SamuraiPortfolio page={page.id} />} />)}
        <Route path="/films" element={<Navigate to="/animations" replace />} />
        
        {/* The netflix-themed portfolio is at /flix */}
        <Route path="/flix" element={<Suspense fallback={<div className="sp-route-loading">Loading Flix…</div>}><NetflixApp /></Suspense>} />
      </Routes>
    </Router>
  );
}

export default App;
