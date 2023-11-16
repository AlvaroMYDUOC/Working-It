import React, { useState } from 'react';
import axios from 'axios';
import cliente2 from '../assets/img/cliente2.jpg';
import '../assets/css/Login.css';
import { useNavigate } from 'react-router-dom';
import { ApiLogin } from '../services/apirest';
import HCaptcha from '@hcaptcha/react-hcaptcha'; // Importa el componente de hCaptcha

const homePageURL = "/";

const LoginC = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [captchaToken, setCaptchaToken] = useState('');

  const manejadorChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }

  const handleVerifyCaptcha = (token) => {
    setCaptchaToken(token);
  };

  const manejadorBoton = () => {
    // Verificar si se ha completado la verificación de captcha
    if (!captchaToken) {
      setErrorMsg('Por favor, completa la verificación de captcha.');
      setError(true);
      return;
    }

    let url = ApiLogin;
    const data = {
      ...form,
      captchaToken: captchaToken // Añade el token del captcha al objeto de datos que se enviará al servidor
    };

    axios.post(url, data)
      .then((response) => {
        if (response.data.user && response.data.access_token) {
          const accessToken = response.data.access_token;
          localStorage.setItem('token', accessToken);
          localStorage.setItem('usuario', JSON.stringify(response.data.user));
          axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
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

            {/* Renderiza el componente de hCaptcha */}
            <div className='captcha'>
              <HCaptcha
                sitekey="48bd55e9-7125-43f7-98d4-cf99a511712d" // Utiliza tu clave de sitio de hCaptcha
                onVerify={handleVerifyCaptcha}
              />
            </div>

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
      <p className="psesion">¿Aún no tienes cuenta? <a href="RegistroInicio/">Regístrate</a></p>
    </div>
  );
};

export default LoginC;
