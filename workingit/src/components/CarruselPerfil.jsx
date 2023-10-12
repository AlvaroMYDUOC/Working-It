import Carousel from 'react-bootstrap/Carousel';
import Foto1 from '../assets/img/backyard.jpg';
import Foto2 from '../assets/img/patioTechado.jpg';
import Foto3 from '../assets/img/patioTecha2.jpg';


import '../assets/css/CarruselPerfil.css';

function UncontrolledExample() {
  return (
    <Carousel>
      <Carousel.Item >
        <img src={Foto1} />
        <Carousel.Caption >
          <h3 style={{color: 'white'}}>Remodelacion patio</h3>
          <p style={{color: 'white'}}>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
      <img src={Foto2} alt="" />

        <Carousel.Caption>
          <h3 style={{color: 'white'}}>Terraza techada</h3>
          <p style={{color: 'white'}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
      <img src={Foto3} alt="" />
        <Carousel.Caption>
          <h3 style={{color: 'white'}}>Terraza y Paisajismo</h3>
          <p style={{color: 'white'}}>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default UncontrolledExample;