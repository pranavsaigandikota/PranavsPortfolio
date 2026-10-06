import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SamuraiPortfolio } from './SamuraiPortfolio';
import { NetflixApp } from './NetflixApp';

function App() {
  return (
    <Router>
      <Routes>
        {/* The samurai portfolio is the main site at / */}
        <Route path="/" element={<SamuraiPortfolio />} />
        
        {/* The netflix-themed portfolio is at /flix */}
        <Route path="/flix" element={<NetflixApp />} />
      </Routes>
    </Router>
  );
}

export default App;
