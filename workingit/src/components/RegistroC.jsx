import React, { useState } from 'react';
import axios from 'axios';
import cliente2 from '../assets/img/cliente2.jpg';
import '../assets/css/RegistroC.css';

const RegistroC = () => {
  // Estado para el formulario
  const [form, setForm] = useState({
    nombres: '',
    apellidos: '',
    rut: '',
    telefono: '',
    correo: '',
    password: '',
    confirmPassword: '',
    aceptaTerminos: false,
  });

  // Estado para mensajes de éxito o error
  const [registroExitoso, setRegistroExitoso] = useState(false);
  const [errorRegistro, setErrorRegistro] = useState('');

  // Manejar cambios en el formulario
  const manejadorChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;

    setForm({
      ...form,
      [name]: newValue,
    });
  };

  // Manejar el envío del formulario
  const manejadorSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://149.50.130.111:8000/auth/signup/', form);

      if (response.status === 201) {
        setRegistroExitoso(true);
        setErrorRegistro('');
      }
    } catch (error) {
      setRegistroExitoso(false);
      setErrorRegistro('Error en el registro. Por favor, inténtalo de nuevo.');
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <h2>Registro de Cliente</h2>
          <form onSubmit={manejadorSubmit}>
            <div className="mb-3">
              <label htmlFor="nombres" className="form-label">Nombres</label>
              <input type="text" className="form-control" id="nombres" name="nombres" value={form.nombres} onChange={manejadorChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="apellidos" className="form-label">Apellidos</label>
              <input type="text" className="form-control" id="apellidos" name="apellidos" value={form.apellidos} onChange={manejadorChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="rut" className="form-label">Rut</label>
              <input type="number" className="form-control" id="rut" name="rut" value={form.rut} onChange={manejadorChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="telefono" className="form-label">Teléfono</label>
              <input type="text" className="form-control" id="telefono" name="telefono" value={form.telefono} onChange={manejadorChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="correo" className="form-label">Correo Electrónico</label>
              <input type="email" className="form-control" id="correo" name="correo" value={form.correo} onChange={manejadorChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Contraseña</label>
              <input type="password" className="form-control" id="password" name="password" value={form.password} onChange={manejadorChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label">Confirmar Contraseña</label>
              <input type="password" className="form-control" id="confirmPassword" name="confirmPassword" value={form.confirmPassword} onChange={manejadorChange} />
            </div>
            <div className="mb-3 form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="terminos"
                name="aceptaTerminos"
                checked={form.aceptaTerminos}
                onChange={manejadorChange}
              />
              <label className="form-check-label" htmlFor="terminos">Acepto los términos y condiciones</label>
            </div>
            <button type="submit" className="btn btn-primary">Registrarme</button>
          </form>
          {registroExitoso && <p className="text-success">Registro exitoso.</p>}
          {errorRegistro && <p className="text-danger">{errorRegistro}</p>}
        </div>
        <div className="col-md-6 d-flex justify-content-center align-items-center">
          <div className="card">
            <img src={cliente2} className="card-img-top" alt="Cliente" />
          </div>
        </div>
      </div>
      <hr className="mt-4 mb-4" />
      <p className="psesion">¿Ya tienes una cuenta? <a href="#">Iniciar Sesión</a></p>
    </div>
  );
};

export default RegistroC;