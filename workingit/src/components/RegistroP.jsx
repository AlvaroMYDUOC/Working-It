import React from 'react'
import workers from '../assets/img/workers.jpg'

const RegistroP = () => {
  return (
    <div className="container">
    <div className="row">
      <div className="col-md-6">
        <h2>Registro de Cliente</h2>
        <form>
          <div className="mb-3">
            <label htmlFor="nombres" className="form-label">Nombres</label>
            <input type="text" className="form-control" id="nombres" />
          </div>
          <div className="mb-3">
            <label htmlFor="apellidos" className="form-label">Apellidos</label>
            <input type="text" className="form-control" id="apellidos" />
          </div>
          <div className="mb-3">
            <label htmlFor="rut" className="form-label">Rut</label>
            <input type="text" className="form-control" id="rut" />
          </div>
          <div className="mb-3">
            <label htmlFor="telefono" className="form-label">Teléfono</label>
            <input type="text" className="form-control" id="telefono" />
          </div>
          <div className="mb-3">
            <label htmlFor="correo" className="form-label">Correo Electrónico</label>
            <input type="email" className="form-control" id="correo" />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Contraseña</label>
            <input type="password" className="form-control" id="password" />
          </div>
          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label">Confirmar Contraseña</label>
            <input type="password" className="form-control" id="confirmPassword" />
          </div>
          <div className="mb-3 form-check">
            <input type="checkbox" className="form-check-input" id="terminos" />
            <label className="form-check-label" htmlFor="terminos">Acepto los términos y condiciones</label>
          </div>
          <button type="submit" className="btn btn-primary">Registrarme</button>
        </form>
      </div>
      <div className="col-md-6 d-flex justify-content-center align-items-center">
        <div className="card">
             <img src={workers} className="card-img-top"  alt="Cliente" />
        </div>
      </div>
    </div>
    <hr className="mt-4 mb-4" />
    <p className="psesion">¿Ya tienes una cuenta? <a href="#">Iniciar Sesión</a></p>
  </div>
  )
}

export default RegistroP
