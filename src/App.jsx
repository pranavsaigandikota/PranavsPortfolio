import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { SamuraiPortfolio } from './SamuraiPortfolio';
import { editorialPages } from './data/editorialPages';
const NetflixApp=lazy(()=>import('./NetflixApp').then(module=>({default:module.NetflixApp})));

function LegacyPageRedirect() {
  const {pathname, search} = useLocation();
  const research = pathname.startsWith('/research');
  return <Navigate to={(research ? '/projects' : '/experience') + search + (research ? '#research' : '#awards')} replace />;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/about" element={<Navigate to="/" replace />} />
        <Route path="/research" element={<LegacyPageRedirect />} />
        <Route path="/awards" element={<LegacyPageRedirect />} />
        {editorialPages.map(page => <Route key={page.id} path={page.path} element={<SamuraiPortfolio page={page.id} />} />)}
        <Route path="/films" element={<Navigate to="/hobbies" replace />} />
        <Route path="/animations" element={<Navigate to="/hobbies" replace />} />
        
        {/* The netflix-themed portfolio is at /flix */}
        <Route path="/flix" element={<Suspense fallback={<div className="sp-route-loading">Loading Flix…</div>}><NetflixApp /></Suspense>} />
      </Routes>
    </Router>
  );
}

export default App;
