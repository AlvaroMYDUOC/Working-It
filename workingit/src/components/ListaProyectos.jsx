import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';

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
      <div className="d-flex justify-content-center align-items-center" style={{padding: '8px'}}>
        <input
          type="text"
          placeholder="Especialista"
          value={especialista}
          onChange={(e) => setEspecialista(e.target.value)}
          style={{ marginRight: '10px' }}
        />
        <input
          type="text"
          placeholder="Ciudad"
          value={ciudad}
          onChange={(e) => setCiudad(e.target.value)}
          style={{ marginRight: '10px' }}
        />
        <Button variant="primary" onClick={handleBuscar}>Buscar</Button>
      </div>
      <Container className="d-flex justify-content-center align-items-center">
        <div className="ordenar-dropdown">
          <Dropdown style={{}}>
            <Dropdown.Toggle as={Button} variant="primary">
              Ordenar por
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item>Nombre</Dropdown.Item>
              <Dropdown.Item>Fecha</Dropdown.Item>
              <Dropdown.Item>Tipo</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </Container>
      <Container className="d-flex justify-content-center align-items-center">
        <div className="proyectos">
          {proyectos.map(proyecto => (
            <Card key={proyecto.id} className="mb-3">
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
                      <Image src={proyecto.photos[0].photo} alt={proyecto.name} style={{ width: '100px' }} />
                    )}
                  </div>
                </div>
              </Card.Body>
            </Card>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default DirectorioProyectos;
