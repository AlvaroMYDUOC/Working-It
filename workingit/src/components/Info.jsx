import React from 'react';
import '../assets/css/Info.css';


const WhyUsSection = () => {
    return (
      <section id="why-us" className="why-us section-bg">
        <div className="container" data-aos="fade-up">
  
          <div className="row gy-4">
  
            <div className="col-lg-4" data-aos="fade-up" data-aos-delay="100">
              <div className="why-box">
                <h3>Como funciona?</h3>
                <p>
                  Working it es una aplicación que logra conectar a clientes que buscan dar un nuevo look a sus casas con profesionales 
                  calificados para lograr los proyectos personales, con la confiaza de que sus hogares estan en las mejores manos.
                   
                </p>
                <div className="text-center">
                  <a href="RegistroInicio/" className="more-btn">Comenzar <i className="bx bx-chevron-right"></i></a>
                </div>
              </div>
            </div>
  
            <div className="col-lg-8 d-flex align-items-center">
              <div className="row gy-4">
  
                <div className="col-xl-4" data-aos="fade-up" data-aos-delay="200">
                  <div className="icon-box d-flex flex-column justify-content-center align-items-center">
                    <i className="bi bi-clipboard-data"></i>
                    <h4>Conecta con un profesional</h4>
                    <p>Podras conectar con direfentes profesionales de distinas areas disponibles para lograr el objetivo de tu proyecto.</p>
                  </div>
                </div>
  
                <div className="col-xl-4" data-aos="fade-up" data-aos-delay="300">
                  <div className="icon-box d-flex flex-column justify-content-center align-items-center">
                    <i className="bi bi-gem"></i>
                    <h4>Asesórate</h4>
                    <p>Prodrás recibir una ayuda antes de iniciar tu proyecto con uno de los profesionales disponibles</p>
                  </div>
                </div>
  
                <div className="col-xl-4" data-aos="fade-up" data-aos-delay="400">
                  <div className="icon-box d-flex flex-column justify-content-center align-items-center">
                    <i className="bi bi-inboxes"></i>
                    <h4>Registro de proyectos</h4>
                    <p>Lleva un registro de cada proyecto realizado, cada proyecto que crees se guardara segun el tipo de proyecto.</p>
                  </div>
                </div>
  
              </div>
            </div>
  
          </div>
  
        </div>
      </section>
    );
  };
  
  export default WhyUsSection;