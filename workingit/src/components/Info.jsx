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
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Duis aute irure dolor in reprehenderit
                  Asperiores dolores sed et. Tenetur quia eos. Autem tempore quibusdam vel necessitatibus optio ad corporis.
                </p>
                <div className="text-center">
                  <a href="#" className="more-btn">Comenzar <i className="bx bx-chevron-right"></i></a>
                </div>
              </div>
            </div>
  
            <div className="col-lg-8 d-flex align-items-center">
              <div className="row gy-4">
  
                <div className="col-xl-4" data-aos="fade-up" data-aos-delay="200">
                  <div className="icon-box d-flex flex-column justify-content-center align-items-center">
                    <i className="bi bi-clipboard-data"></i>
                    <h4>Conecta con un profesinal</h4>
                    <p>Podras conectar con direfentes profesionales de distinas areas disponibles para lograr el objetivo de tu proyecto.</p>
                  </div>
                </div>
  
                <div className="col-xl-4" data-aos="fade-up" data-aos-delay="300">
                  <div className="icon-box d-flex flex-column justify-content-center align-items-center">
                    <i className="bi bi-gem"></i>
                    <h4>Ullamco laboris ladore pan</h4>
                    <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt</p>
                  </div>
                </div>
  
                <div className="col-xl-4" data-aos="fade-up" data-aos-delay="400">
                  <div className="icon-box d-flex flex-column justify-content-center align-items-center">
                    <i className="bi bi-inboxes"></i>
                    <h4>Labore consequatur incidid dolore</h4>
                    <p>Aut suscipit aut cum nemo deleniti aut omnis. Doloribus ut maiores omnis facere</p>
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