import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Card, Row, Col } from 'react-bootstrap'; // Asumiendo que estás utilizando react-bootstrap
import Image from 'react-bootstrap/Image';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';

// import ImageFromApi from './ImageFromApi'; // Asegúrate de importar el componente ImageFromApi

const DirectorioProyectos = () => {
  const [proyectos, setProyectos] = useState([]);
  const [especialista, setEspecialista] = useState('');
  const [ciudad, setCiudad] = useState('');

  useEffect(() => {
    // Realizar la solicitud GET a la API
    axios.get('http://149.50.130.111:8002/api/projects/')
      .then(response => {
        setProyectos(response.data);
      })
      .catch(error => {
        console.error('Error al cargar proyectos:', error);
      });
  }, []);

  const handleBuscar = () => {
    // Realiza la búsqueda utilizando los valores de "especialista" y "ciudad"
    // Puedes implementar la lógica de búsqueda aquí
    // Por ejemplo, filtrar proyectos en función de los valores ingresados
  };

  return (
    <div className="directorio-proyectos">
      <h2 className="text-center">Directorio de Proyectos</h2>
      <div className="d-flex justify-content-center align-items-center" style={{ padding: '8px' }}>
        <input
          type="text"
          placeholder="Especialista"
          value={especialista}
          onChange={(e) => setEspecialista(e.target.value)}
          style={{padding: '5px', margin: '8px'}}
        />
        <Button variant="primary" onClick={handleBuscar}>Buscar</Button>
      </div>
      <Container className="d-flex justify-content-center align-items-center">
        <div className="ordenar-dropdown" style={{padding: '1px', marginBottom: '5px'}}>
          <Dropdown style={{}}>
            <Dropdown.Toggle as={Button} variant="primary">
              Ordenar por
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item>Nombre</Dropdown.Item>
              <Dropdown.Item>Tipo</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </Container>
      <Container fluid className="p-0">
      <Row>
        <Col md={1}></Col>
        <Col md={2}></Col>
        <Col md={3}>
        <div className="categorías" style={{ textAlign: 'left', margin: '0 20px' }}>
          <h2>Categorías</h2>
          <p>Maestro Ceramista</p>
          <p>Maestro Ceramista</p>
          <p>Maestro Ceramista</p>
          <p>Maestro Ceramista</p>
          <p>Ver más</p>
        </div>
        </Col>
        <Col md={6}>
          <div className="proyectos">
            {proyectos.map(proyecto => (
              <Card key={proyecto.id} className="mb-3" style={{padding: '5px', marginRight: '50px'}}>
                <Card.Body>
                  <div className="d-flex">
                    <div>
                      <Card.Title>{proyecto.name}</Card.Title>
                      <Card.Text>{proyecto.description}</Card.Text>
                      <p>Metros Cuadrados: {proyecto.mt2}</p>
                      <p>Tipo: {proyecto.type}</p>
                    </div>
                    <div className="ml-auto">
                      {proyecto.photos.length > 0 && (
                        <img src={proyecto.photos[0].photo} alt={proyecto.name} style={{ width: '100px' }} />
                      )}
                    </div>
                  </div>
                </Card.Body>
              </Card>
            ))}
          </div>
        </Col>
      </Row>
    </Container>
    </div>
  );
};

export default DirectorioProyectos;
