//Importe de librerias
import './assets/css/App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

//Importe de componentes
import Home from './Pages/Home.jsx';
import Login from './Pages/Login.jsx';
import Rc from './Pages/RegistroCliente';
import RegistroCliente from './Pages/RegistroCliente';
import Navbar2 from './components/Navbar2';



function App() {
  return (
    <Router>
          <Routes>
              <Route  path="/" element={<Home />}/>
              <Route  path="/RegistroClientes" element={<RegistroCliente/>}/>
              <Route  path="/Login" element={<Login />}/>


              <Route path="/Navbar2" element={<Navbar2 />}/>
          </Routes>
        </Router>
  );
}

export default App;
