import React from 'react'
import '../assets/css/FooterD.css'
import 'bootstrap/dist/css/bootstrap.css';
import logo from '../assets/img/logo.png';
import { FaTwitter, FaFacebookF, FaYoutube, FaInstagram, FaLinkedinIn } from 'react-icons/fa';



const Buscador2 = () => {
  return (
    <div className="container-fluid text-white-50 footer pt-5">
    <div className="container py-1">
      <div className="row g-5">
        <div className="col-md-6 col-lg-3 wow fadeIn" data-wow-delay="0.1s">
          <p><img src={logo} alt="logo"/></p>
        </div>
        <div className="col-md-6 col-lg-3 wow fadeIn" data-wow-delay="0.5s">
          <h5 className="text-white mb-4">Legal</h5>
          <a className="btn btn-link" href="">Privacidad y cookies</a>
          <a className="btn btn-link" href="">Quienes somos</a>
          <a className="btn btn-link" href="">Contacto</a>
          <a className="btn btn-link" href="">Trabaja con nosotros</a>
          <a className="btn btn-link" href="">Términos y condiciones</a>
        </div>
        <div className="col-md-6 col-lg-3 wow fadeIn" data-wow-delay="0.7s">
          <h5 className="text-white mb-4">Servicios</h5>
          <a className="btn btn-link" href="">Directorio de Especialistas</a>
          <a className="btn btn-link" href="">Categorias de Especialistas</a>
          <a className="btn btn-link" href="">Solicita una Asesoría</a>
        </div>
        <div className="col-md-6 col-lg-3 wow fadeIn" data-wow-delay="0.3s">
          <h5 className="text-white mb-4">Redes Sociales</h5>
          
          <div className="d-flex pt-2">
          <a className="btn btn-outline-light btn-social" href="#"><FaTwitter /></a>
        <a className="btn btn-outline-light btn-social" href="#"><FaFacebookF /></a>
        <a className="btn btn-outline-light btn-social" href="#"><FaYoutube /></a>
        <a className="btn btn-outline-light btn-social" href="#"><FaInstagram /></a>
        <a className="btn btn-outline-light btn-social" href="#"><FaLinkedinIn /></a>
          </div>
        </div>
      </div>
      
    </div> 
  </div>

  )
}

export default Buscador2
