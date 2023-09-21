import React from 'react'
import '../assets/css/Footer.css'
import facebook from '../assets/img/facebook.png';
import linkedin from '../assets/img/linkedin.png';
import twitter from '../assets/img/twitter.png';
import logo from '../assets/img/logo.png';


const Footer = () => {
  return (
    <div className="footer">
            <div className="padding-seccion">
            <div className="links">
               <div className="logo">   
                <p><img src={logo} alt=""/></p>
                </div>
                <div className="div-links">
                    <h4>Legal</h4>
                    <a href="/sasdad">
                       <p>Privacidad y cookies</p>
                    </a>
                    <a href="/sasdasd">
                       <p>Quienes somos</p>
                    </a>
                    <a href="/sasdad">
                       <p>Contacto</p>
                    </a>
                </div>
                <div className="services-links">
                    <h4>Servicios</h4>
                    <a href="/sasdad">
                       <p>Directorio de profesionales</p>
                    </a>
                    <a href="/sasdasd">
                       <p>Categoria de especialistas</p>
                    </a>
                    <a href="/sasdad">
                       <p>Solicita una asesoria</p>
                    </a>
                </div>
                <div className="redsocial">
                    <h4>Redes sociales</h4>
                    <div className="icones">
                        <p><img src={facebook} alt="/sadsad"/></p>
                        <p><img src={twitter} alt=""/></p>
                        <p><img src={linkedin} alt=""/></p>
                    </div>
                </div>
            </div>
        </div>

    </div>
  )
}

export default Footer