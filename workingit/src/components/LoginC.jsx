import React, { useState } from 'react';
import axios from 'axios';
import cliente2 from '../assets/img/cliente2.jpg';
import '../assets/css/Login.css';
import { useNavigate } from 'react-router-dom';

const LoginC = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState('');

  const manejadorChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const manejadorBoton = () => {
    axios.post('http://149.50.130.111:8000/auth/login/', form)
      .then((response) => {
        if (response.status === 200) {
          localStorage.setItem('token', response.data.token);
          navigate('/'); // Redirige al usuario a la página de inicio
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
          <div className="card">
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