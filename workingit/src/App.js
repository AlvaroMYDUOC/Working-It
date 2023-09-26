//Importe de librerias
import './assets/css/App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

//Importe de componentes
import Home from './Pages/Home.jsx';
import Login from './Pages/Login.jsx';
import Rc from './Pages/RegistroCliente';



function App() {
  return (
    <Router>
          <Routes>
              <Route  path="/" element={<Home />}/>
              <Route  path="/RegistroClientes" element={<Rc/>}/>
              <Route  path="/Login" element={<Login />}/>
          </Routes>
        </Router>
  );
}

export default App;
