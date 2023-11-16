import React from 'react';
import '../assets/css/Sobre.css';
import trabajaSobre from '../assets/img/trabajaSobre.jpg';

const AboutSection = () => {
  return (
    <section id="about" className="about">
      <div className="container" data-aos="fade-up">

        <div className="section-header">
          <h2>Acerca de nosotros</h2>
        </div>

        <div className="row gy-4">
          <div className="col-lg-7 position-relative about-img" style={{ backgroundImage: `url(${trabajaSobre})`, backgroundSize: 'cover', backgroundPosition: 'center' }} data-aos="fade-up" data-aos-delay="150">
            <div className="call-us position-absolute">
              <h4>Contacto</h4>
              <p>+569 957545409</p>
            </div>
          </div>
          <div className="col-lg-5 d-flex align-items-end" data-aos="fade-up" data-aos-delay="300">
            <div className="content ps-0 ps-lg-5">
              <div className="section-header">
                <h2>Nosotros</h2>
              </div>
              <p className="fst-italic">
                Queremos lograr la conexión entre cliente y profesional, de aqui nace Working It. 
              </p>
              <ul>
                <li><i className="bi bi-check2-all"></i> Ullamco laboris nisi ut aliquip ex ea commodo consequat .</li>
                <li><i className="bi bi-check2-all"></i> Duis aute irure dolor in reprehenderit in voluptate velit.</li>
                <li><i className="bi bi-check2-all"></i> Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate trideta storacalaperda mastiro dolore eu fugiat nulla pariatur.</li>
              </ul>
              <p>
                Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
                velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident
              </p>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

export default AboutSection;
 




