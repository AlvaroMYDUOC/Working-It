//Importe de librerias
import './assets/css/App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

//Importe de componentes

import Navbar2 from './components/Navbar2';

import Registro from './components/Registro';
import Proyectos from './components/Proyectos';
import SpecialistProfile from './components/SpecialistProfile';
import Home from './Pages/Home.jsx';
import DataTable from './components/DataTable.jsx';

import Login from './Pages/Login.jsx';
import RegistroI from './components/RegistroI.jsx';
import Rc from './Pages/RegistroCliente';
import RegistroP from './components/RegistroP.jsx';
import FooterD from './components/FooterD.jsx';



function App() {
  return (
    <Router>
          <Routes>
              <Route  path="/" element={<Home />}/>
              <Route  path="/RegistroClientes" element={<Rc/>}/>
              <Route  path="/Login" element={<Login />}/>
              
              
              
              <Route  path="/Navbar2" element={<Navbar2/>} />
              <Route  path="/Proyectos" element={<Proyectos/>} />
              <Route  path="/Registro" element={<Registro/>} />
              <Route  path="/MiPerfil" element={<SpecialistProfile/>} />
              <Route  path="/DataTable" element={<DataTable/>} />


              <Route  path="/RegistroI" element={<RegistroI/>} />
        
              <Route  path="/RegistroP" element={<RegistroP/>} />
              <Route  path="/FooterD" element={<FooterD/>} />
              
              
              


          </Routes>
        </Router>
  );
}

export default App;
