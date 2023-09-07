//Importe de librerias
import logo from './logo.svg';
import './assets/css/App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

//Importe de componentes
import Navbar from './components/Navbar';
import Navbar2 from './components/Navbar2';

function App() {
  return (
    <Router>
          <Routes>
              <Route  path="/Navbar" element={<Navbar/>} />
              <Route  path="/Navbar2" element={<Navbar2/>} />
          </Routes>
        </Router>
  );
}

export default App;
