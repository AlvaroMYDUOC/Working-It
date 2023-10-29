import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Card, Row, Col } from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';

const ListadoProfesionistas = () => {
  const [proyectos, setProyectos] = useState([]);
  const [especialista, setEspecialista] = useState('');
  const [ciudad, setCiudad] = useState('');
  const [tiposProyecto, setTiposProyecto] = useState([]);
  const [nombreProyecto, setNombreProyecto] = useState('');

  const [profesionales, setProfesionales] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const profesionalesPorPagina = 5;


  useEffect(() => {
    axios.get('http://149.50.130.111:8001/api/profiles/')
      .then(response => {
        setProfesionales(response.data);
      })
      .catch(error => {
        console.error('Error al cargar los perfiles de profesionales:', error);
      });
  }, []);

  const handleBuscar = () => {
    if (nombreProyecto.trim() === '') {
      axios.get('http://149.50.130.111:8002/api/projects/')
        .then(response => {
          setProyectos(response.data);
        })
        .catch(error => {
          console.error('Error al cargar proyectos:', error);
        });
    } else {
      const palabrasClave = nombreProyecto.toLowerCase().split(' ');
      const proyectosFiltrados = proyectos.filter(proyecto =>
        palabrasClave.every(palabra =>
          proyecto.name.toLowerCase().includes(palabra)
        )
      );
      setProyectos(proyectosFiltrados);
    }
  };

  const filtrarProyectosPorCategoria = (categoriaId) => {
    if (categoriaId === 0) {
      axios.get('http://149.50.130.111:8002/api/projects/')
        .then(response => {
          setProyectos(response.data);
        })
        .catch(error => {
          console.error('Error al cargar proyectos:', error);
        });
    } else {
      axios.get(`http://149.50.130.111:8002/api/projects/?type=${categoriaId}`)
        .then(response => {
          setProyectos(response.data);
        })
        .catch(error => {
          console.error('Error al cargar proyectos:', error);
        });
    }
  };

  const indexUltimoProfesional = paginaActual * profesionalesPorPagina;
  const indexPrimerProfesional = indexUltimoProfesional - profesionalesPorPagina;
  const profesionalesActuales = profesionales.slice(indexPrimerProfesional, indexUltimoProfesional);

  const totalPaginas = Math.ceil(profesionales.length / profesionalesPorPagina);

  const paginar = (numeroPagina) => {
    setPaginaActual(numeroPagina);
  };

  return (
    <div className="directorio-proyectos">
      <h2 className="text-center">Directorio de profesionales</h2>
       {/* Barra de búsqueda y botón */}
       <Container className="d-flex justify-content-center align-items-center">
        <input
          type="text"
          placeholder="Buscar proyectos por nombre"
          value={nombreProyecto}
          onChange={(e) => setNombreProyecto(e.target.value)}
          style={{ padding: '5px', margin: '8px' }}
        />
        <Button variant="primary" onClick={handleBuscar}>
          Buscar
        </Button>
      </Container>
        <Container fluid className="p-0">
        <Row>
          <Col md={1}></Col>
          <Col md={2}></Col>
          <Col md={3}>
            <div className="categorías" style={{ textAlign: 'left', margin: '0 20px' }}>
              <h2>Categorías</h2>
              {tiposProyecto.map(tipo => (
                <p
                  key={tipo.id}
                  onClick={() => filtrarProyectosPorCategoria(tipo.id)}
                  style={{
                    cursor: 'pointer',
                    textDecoration: 'none',
                  }}
                  onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
                  onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
                >
                  {tipo.name}
                </p>
              ))}
              <p
                onClick={() => filtrarProyectosPorCategoria(0)}
                style={{
                  cursor: 'pointer',
                  textDecoration: 'none',
                }}
                onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
                onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
              >
                Ver más
              </p>
            </div>
          </Col>
          <Col md={6}>
            <div className="proyectos">
                    {profesionalesActuales.map(profesional => (
                    <Col md={6} key={profesional.professional_id}>
                    <Card className="mb-3">
                        <Card.Body>
                        <div className="d-flex">
                            <div>
                            <Card.Title>{`${profesional.first_name} ${profesional.last_name}`}</Card.Title>
                            <Card.Text>Sobre mi: {profesional.about_me || 'No information available'}</Card.Text>
                            <Card.Text>Especialidad: {profesional.specialties.join(', ')}</Card.Text>
                            </div>
                            <div className="ml-auto">
                            {profesional.professional_photo && (
                                <img src={profesional.professional_photo} alt={`${profesional.first_name} ${profesional.last_name}`} style={{ width: '100px' }} />
                            )}
                            </div>
                        </div>
                        </Card.Body>
                    </Card>
                    </Col>
                ))}
            </div>
          </Col>
        </Row>
      </Container>
      <div className="pagination" style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
        {Array.from({ length: totalPaginas }, (_, i) => (
          <button
            key={i}
            onClick={() => paginar(i + 1)}
            style={{
              cursor: 'pointer',
              margin: '5px',
              background: 'white',
              color: 'blue',
              border: '1px solid #ccc',
              padding: '6px 12px',
              borderRadius: '5px',
            }}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ListadoProfesionistas;
