//Importe de librerias
import logo from './logo.svg';
import './assets/css/App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

//Importe de componentes
import Navbar from './components/Navbar';
import Navbar2 from './components/Navbar2';
import Login from './components/Login';
import Registro from './components/Registro';
import SpecialistProfile from './components/SpecialistProfile';



function App() {
  return (
    <Router>
          <Routes>
              <Route  path="/Navbar" element={<Navbar/>} />
              <Route  path="/Navbar2" element={<Navbar2/>} />
              <Route  path="/Login" element={<Login/>} />
              <Route  path="/Registro" element={<Registro/>} />
              <Route  path="/MiPerfil" element={<SpecialistProfile/>} />



          </Routes>
        </Router>
  );
}

export default App;
