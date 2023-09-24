import React, { useState } from 'react';
import axios from 'axios';
import cliente2 from '../assets/img/cliente2.jpg';
import '../assets/css/LoginC.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Nuevo estado para rastrear si el usuario está autenticado

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://149.50.130.111:8000/auth/login/', {
        email,
        password,
      });

      if (response.status === 200) {
        // Almacenar el token JWT en localStorage o en cookies
        localStorage.setItem('token', response.data.token);
        setIsLoggedIn(true); // Marcar al usuario como autenticado
        console.log('Inicio de sesión exitoso');
      }
    } catch (err) {
      setError('Credenciales incorrectas. Por favor, inténtalo de nuevo.');
    }
  };

  // Redirigir al usuario a una página protegida si está autenticado
  if (isLoggedIn) {
    return (
      <div className="container">
        <h2 className="text-center">Login</h2>
        <p className="text-success">Inicio de sesión exitoso. Redirigiendo...</p>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <h2 className="text-center">Login</h2>
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label htmlFor="correo" className="form-label">Correo Electrónico</label>
              <input type="email" className="form-control" id="correo" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Contraseña</label>
              <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            {error && <div className="alert alert-danger">{error}</div>}
            <button type="submit" className="btn btn-primary w-100">
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
      <p className="psesion">¿Aún no tienes cuenta? <a href="#">Registrate</a></p>
    </div>
  );
};

export default Login;
