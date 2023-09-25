import React from 'react'
import '../assets/css/RegistroI.css'
import workers from '../assets/img/workers.jpg'
import cliente2 from '../assets/img/cliente2.jpg'

const Registro = () => {
  return (
    <div className="container">
    <div className="row">
    <h3 className='tr'>¿Que te describe mejor?</h3>
      <div className="col-md-6">
        <div className="registro-card cliente-card">
          <a className="usertype" href="/registro-cliente">
            <img src={cliente2} alt="Cliente" />
            <h2 className="usertype">Cliente</h2>
          </a>
        </div>
      </div>
      <div className="col-md-6">
        <div className="registro-card profesionista-card">
          <a className="usertype" href="/registro-profesionista">
            <img src={workers} alt="Profesionista" />
            <h2 className="usertype">Profesionista</h2>
          </a>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Registro
