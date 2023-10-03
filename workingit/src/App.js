//Importe de librerias
import './assets/css/App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

//Importe de componentes
import Navbar2 from './components/Navbar2';
import Login from './components/Login';
import Registro from './components/Registro';
import Proyectos from './components/Proyectos';
import SpecialistProfile from './components/SpecialistProfile';
import Home from './Pages/Home.jsx';
import DataTable from './components/DataTable.jsx';

import LoginC from './components/LoginC.jsx';
import RegistroI from './components/RegistroI.jsx';
import RegistroC from './components/RegistroC.jsx';
import RegistroP from './components/RegistroP.jsx';
import FooterD from './components/FooterD.jsx';


function App() {
  return (
    <Router>
          <Routes>
              <Route  path="/" element={<Home />}/>
              <Route  path="/Navbar2" element={<Navbar2/>} />
              <Route  path="/Proyectos" element={<Proyectos/>} />
              <Route  path="/Login" element={<Login/>} />
              <Route  path="/Registro" element={<Registro/>} />
              <Route  path="/MiPerfil" element={<SpecialistProfile/>} />
              <Route  path="/DataTable" element={<DataTable/>} />

              <Route  path="/LoginC" element={<LoginC/>} />
              <Route  path="/RegistroI" element={<RegistroI/>} />
              <Route  path="/RegistroC" element={<RegistroC/>} />
              <Route  path="/RegistroP" element={<RegistroP/>} />
              <Route  path="/FooterD" element={<FooterD/>} />
          </Routes>
        </Router>
  );
}

export default App;
