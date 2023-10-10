//Importe de librerias
import './assets/css/App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

//import Login from './components/Login';
import Registro from './components/Registro';
import Proyectos from './components/Proyectos';
import SpecialistProfile from './components/SpecialistProfile';
//Rutas pages
import Home from './Pages/Home.jsx';
import Login from './Pages/Login.jsx';
import RegistroInicio from './Pages/RegistroInicio.jsx';
import RegistroCliente from './Pages/RegistroCliente.jsx';
import RegistroProfesional from './Pages/RegistroProfesional.jsx';
import PerfilProfesional from './Pages/PerfilProfesional.jsx';


//Rutas components
import DataTable from './components/DataTable.jsx';
import LoginC from './components/LoginC.jsx';
import RegistroI from './components/RegistroI.jsx';
import RegistroC from './components/RegistroC.jsx';
import RegistroP from './components/RegistroP.jsx';
import FooterD from './components/FooterD.jsx';
import MisProyectos from './Pages/MisProyectos';
import DirectorioProyectos from './components/buscadorProyectos.jsx';


function App() {
  return (
    <Router>
          <Routes>
              {/*Rutas para pruebas*/}
              <Route  path="/" element={<Home />}/>
              <Route  path="/LoginC" element={<Login/>} />
              <Route  path="/RegistroI" element={<RegistroInicio/>} />
              <Route  path="/RegistroC" element={<RegistroCliente/>} />
              <Route  path="/RegistroP" element={<RegistroProfesional/>} />
              <Route  path="/MiPerfil" element={<PerfilProfesional/>} /> 
              <Route  path="/MisProyectos" element={<MisProyectos/>} /> 
              <Route  path="/DirectorioProyectos" element={<DirectorioProyectos/>} /> 

              


              <Route  path="/Proyectos" element={<Proyectos/>} />
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
