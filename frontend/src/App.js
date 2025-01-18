import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { FaHome, FaTshirt } from 'react-icons/fa'; // Importando ícones
import Home from './Pages/Home';
import Doacoes from './Pages/Doacoes';
import './App.css'; // Certifique-se de que este arquivo CSS está correto e acessível.

function App() {
  return (
    <Router>
      {/* Navbar fixa à esquerda */}
      <nav className="navbar">
        <h1 className="site-name">Abraço de Tecido</h1>
        <ul>
          <li>
            <Link to="/">
              <FaHome style={{ marginRight: '10px' }} /> Home
            </Link>
          </li>
          <li>
            <Link to="/doacoes">
              <FaTshirt style={{ marginRight: '10px' }} /> Doações
            </Link>
          </li>
        </ul>
      </nav>

      {/* Área de conteúdo principal */}
      <main className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/doacoes" element={<Doacoes />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
