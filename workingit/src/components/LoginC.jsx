import React, { useState } from 'react';
import axios from 'axios';
import cliente2 from '../assets/img/cliente2.jpg';
import '../assets/css/Login.css';
import { useNavigate } from 'react-router-dom';
import { ApiLogin } from '../services/apirest';

const homePageURL = "/";

const LoginC = () => {
  
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");


  const manejadorChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
    //Esto es solo una forma de visualizar en consola los campos a los que estas rellenando - Activar/Desactivar los devs
    //console.log(form);
  }

  const manejadorBoton = () => {
    //Almacenamiento del Endpoint 
    let url = ApiLogin
    axios.post(url, form)
      .then((response) => {
        if (response.data.user && response.data.access_token) {
          //Pasar de variable el Token traido por la endpoint
          const accessToken = response.data.access_token;

          //Almacenamiento del local storage
          localStorage.setItem('token', accessToken);
          localStorage.setItem('usuario', JSON.stringify(response.data.user));

          //Configura axios para incluir el token en las cabeceras de las solicitudes
          axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

          //Redirige al usuario a la pagina de inicio
          navigate(homePageURL);
        }
      })
      .catch((err) => {
        setError('Credenciales incorrectas. Por favor, inténtalo de nuevo.');
      });
  };


  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <h2 className="text-center">Login</h2>
          <form>
            <div className="mb-3">
              <label htmlFor="correo" className="form-label">Correo Electrónico</label>
              <input type="email" className="form-control" id="correo" name="email" value={form.email} onChange={manejadorChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Contraseña</label>
              <input type="password" className="form-control" id="password" name="password" value={form.password} onChange={manejadorChange} />
            </div>
            {error && <div className="alert alert-danger">{error}</div>}
            <button type="button" className="btn btn-primary w-100" onClick={manejadorBoton}>
              Ingresar
            </button>
          </form>
        </div>
        <div className="col-md-6 d-flex justify-content-center align-items-center">
          <div className="login-card">
            <img src={cliente2} className="card-img-top" alt="Cliente" />
          </div>
        </div>
      </div>
      <hr className="mt-4 mb-4" />
      <p className="psesion">¿Aún no tienes cuenta? <a href="#">Regístrate</a></p>
    </div>
  );
};

export default LoginC;