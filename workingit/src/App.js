//Importe de librerias
import './assets/css/App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

//import Login from './components/Login';
import Registro from './components/Registro';
import MisProyectos from './Pages/MisProyectos'
//Rutas pages
import Home from './Pages/Home.jsx';
import Login from './Pages/Login.jsx';
import RegistroInicio from './Pages/RegistroInicio.jsx';
import RegistroCliente from './Pages/RegistroCliente.jsx';
import RegistroProfesional from './Pages/RegistroProfesional.jsx';
import PerfilProfesional from './Pages/MiPerfilProfesionista.jsx';
import DirectorioProyectos from './Pages/DirectorioProyectos';
import DirectorioProfesionistas from './Pages/DirectorioProfesionistas';


function App() {
    return ( <
        Router >
         { /*Rutas definitivas para la aplicacion*/ } <
        Route path = "/"
        element = { < Home / > }
        /> <
        Route path = "/RegistroInicio"
        element = { < RegistroInicio / > }
        /> <
        Route path = "/MiPerfil"
        element = { < PerfilProfesional / > }
        />  <
        Route path = "/MisProyectos"
        element = { < MisProyectos / > }
        />  <
        Route path = "/MisProyectos"
        element = { < MisProyectos / > }
        />  <
        Route path = "/RegistroCliente"
        element = { < RegistroCliente / > }
        />  <
        Route path = "/RegistroProfesional"
        element = { < RegistroProfesional / > }
        />                <
        Route path = "/MisProyectos"
        element = { < MisProyectos / > }
        /> <
        Route path = "/Registro"
        element = { < Registro / > }
        /> <
        Route path = "/Login"
        element = { < Login / > }
        /> <
        Route path = "/PerfilProfesionista"
        element = { < PerfilProfesional / > }
        /> 

        <
        Route path = "/DirectorioProyectos"
        element = { < DirectorioProyectos / > }
        /> <
        Route path = "/DirectorioProfesionistas"
        element = { < DirectorioProfesionistas / > }
        />



        
        </Router>
    );
}

export default App;