//Importe de librerias
import logo from './logo.svg';
import './assets/css/App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

//Importe de componentes
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
          <Routes>
              <Route  path="/Navbar" element={<Navbar/>} />
          </Routes>
        </Router>
  );
}

export default App;
