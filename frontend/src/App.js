import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { FaHome, FaTshirt, FaUserCircle, FaCog, FaSignOutAlt } from 'react-icons/fa'; // Importando ícones
import Home from './Pages/Home';
import Doacoes from './Pages/Doacoes';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importando o Bootstrap
import { Dropdown } from 'react-bootstrap'; // Importando o Dropdown do react-bootstrap
import './App.css'; // Certifique-se de que este arquivo CSS está correto e acessível.

function App() {
  // Estado para armazenar o nome do usuário (pode ser vindo de um contexto, API, etc.)
  const [userName ] = useState('');
  return (
    <Router>
      {/* Sidebar fixa à esquerda */}
      <aside className="sidebar bg-dark" style={{ width: '250px', height: '100vh', position: 'fixed', paddingTop: '20px' }}>
        <ul className="list-unstyled">
          {/* Nome da empresa no sidebar */}
          <li className="sidebar-brand">
            <Link className="navbar-brand text-white" to="/" style={{ fontSize: '1.5rem', padding: '10px 15px', textAlign: 'center', display: 'block' }}>
              Abraço de Tecido
            </Link>
          </li>

          {/* Opções do menu */}
          <li>
            <Link className="nav-link text-white" to="/">
              <FaHome style={{ marginRight: '10px' }} /> Home
            </Link>
          </li>
          <li>
            <Link className="nav-link text-white" to="/doacoes">
              <FaTshirt style={{ marginRight: '10px' }} /> Doações
            </Link>
          </li>
        </ul>
      </aside>

      {/* Navbar fixa no topo */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark" style={{ marginLeft: '250px' }}>
        <div className="container-fluid d-flex justify-content-between align-items-center">
          {/* Ícone de Perfil e Nome do Usuário */}
          <div className="d-flex align-items-center">
            <FaUserCircle style={{ fontSize: '2rem', marginRight: '10px' }} />
            <span className="text-white" style={{ fontSize: '1.2rem' }}>{userName}</span>
          </div>

          {/* Menu Suspenso com react-bootstrap */}
          <Dropdown>
            <Dropdown.Toggle variant="link" id="userDropdown" className="text-white">
              <FaUserCircle style={{ fontSize: '2rem' }} />
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item as={Link} to="/profile">
                <FaUserCircle style={{ marginRight: '10px' }} /> Perfil
              </Dropdown.Item>
              <Dropdown.Item as={Link} to="/settings">
                <FaCog style={{ marginRight: '10px' }} /> Configurações
              </Dropdown.Item>
              <Dropdown.Item as={Link} to="/logout">
                <FaSignOutAlt style={{ marginRight: '10px' }} /> Sair
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </nav>

      {/* Área de conteúdo principal */}
      <main className="content" style={{ marginLeft: '250px', padding: '20px' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/doacoes" element={<Doacoes />} />
          <Route path="/profile" element={<div>Perfil do Usuário</div>} />
          <Route path="/settings" element={<div>Configurações</div>} />
          <Route path="/logout" element={<div>Sair</div>} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
