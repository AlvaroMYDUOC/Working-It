import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

//import Login from './components/Login';
import Registro from './components/Registro';
import MisProyectos from './Pages/MisProyectos'
import SpecialistProfile from './components/SpecialistProfile';

//Rutas pages
import './assets/css/App.css';

// Importar componentes de las páginas
import Home from './Pages/Home.jsx';
import Login from './Pages/Login.jsx';
import ChatProfesional from './Pages/ChatProfesional.jsx';
import RegistroInicio from './Pages/RegistroInicio.jsx';
import RegistroCliente from './Pages/RegistroCliente.jsx';
import RegistroProfesional from './Pages/RegistroProfesional.jsx';
import PerfilProfesional from './Pages/MiPerfilProfesionista.jsx';
import DirectorioProyectos from './Pages/DirectorioProyectos';
import DirectorioProfesionistas from './Pages/DirectorioProfesionistas';
import AsesoriasProfesional from './Pages/AsesoriasProfesional';

function App() {

  return (
    <Router>
          <Routes>
                {/* Rutas definitivas para la aplicación */}
                <Route path="/" element={<Home />} />
                <Route path="/RegistroInicio" element={<RegistroInicio />} />
                <Route path="/MiPerfil" element={<PerfilProfesional />} />
                <Route path="/MisProyectos" element={<MisProyectos />} />
                <Route path="/RegistroCliente" element={<RegistroCliente />} />
                <Route path="/RegistroProfesional" element={<RegistroProfesional />} />
                <Route path="/Registro" element={<Registro />} />
                <Route path="/Login" element={<Login />} />
                <Route path="/PerfilProfesionista" element={<PerfilProfesional />} />
                <Route path="/DirectorioProyectos" element={<DirectorioProyectos />} />
                <Route path="/DirectorioProfesionistas" element={<DirectorioProfesionistas />} />
                <Route path="/AsesoriasProfesional" element={<AsesoriasProfesional />} />
                <Route  path="/ChatProfesional" element={<ChatProfesional/>} />

            </Routes>
        </Router>
    );
}
export default App;
