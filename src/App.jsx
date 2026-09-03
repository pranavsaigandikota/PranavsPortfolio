import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { OriginalPortfolio } from './OriginalPortfolio';
import { NetflixApp } from './NetflixApp';

function App() {
  return (
    <Router>
      <Routes>
        {/* The original portfolio is the main site at / */}
        <Route path="/" element={<OriginalPortfolio />} />
        
        {/* The netflix-themed portfolio is at /flix */}
        <Route path="/flix" element={<NetflixApp />} />
      </Routes>
    </Router>
  );
}

export default App;
