import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Card, Row, Col, Modal } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';


const DirectorioProyectos = () => {
  const [proyectos, setProyectos] = useState([]);
  const [especialista, setEspecialista] = useState('');
  const [ciudad, setCiudad] = useState('');
  const [tiposProyecto, setTiposProyecto] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const [proyectosPorPagina] = useState(5);
  const [nombreProyecto, setNombreProyecto] = useState('');

  //Para el modal con el proyecto seleccionado

  const [showModal, setShowModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState({});

  const handleProjectClick = (project) => {
    setSelectedProject(project);
    setShowModal(true);
  };

  const tiposProyectoMap = {};
  tiposProyecto.forEach((tipo) => {
  tiposProyectoMap[tipo.id] = tipo.name;
});
  
  useEffect(() => {
    axios.get('http://149.50.130.111:8002/api/projects/')
      .then(response => {
        setProyectos(response.data);
      })
      .catch(error => {
        console.error('Error al cargar proyectos:', error);
      });

    axios.get('http://149.50.130.111:8002/api/project-types/')
      .then(response => {
        setTiposProyecto(response.data);
      })
      .catch(error => {
        console.error('Error al cargar los tipos de proyecto', error);
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

  const indexUltimoProyecto = paginaActual * proyectosPorPagina;
  const indexPrimerProyecto = indexUltimoProyecto - proyectosPorPagina;
  const proyectosActuales = proyectos.slice(indexPrimerProyecto, indexUltimoProyecto);

  const totalPaginas = Math.ceil(proyectos.length / proyectosPorPagina);

  const paginar = (numeroPagina) => {
    setPaginaActual(numeroPagina);
  };

  return (
    <div className="directorio-proyectos">
      <h2 className="text-center">Directorio de Proyectos</h2>
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
                Ver todo
              </p>
            </div>
          </Col>
          <Col md={6}>
            <div className="proyectos">
              {proyectosActuales.map(proyecto => (
                <Card key={proyecto.id} className="mb-3" style={{ padding: '5px', marginRight: '50px' }}>
                  <Card.Body>
                    <div className="d-flex">
                      <div>
                      <a
                        onClick={() => handleProjectClick(proyecto)}
                        
                        style={{
                          textDecoration: 'none',
                          color: 'black',
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.textDecoration = 'underline';
                          e.target.style.color = 'blue';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.textDecoration = 'none';
                          e.target.style.color = 'black';
                        }}
                      >
                        <Card.Title>{proyecto.name}</Card.Title>
                      </a>
                        <Card.Text>{proyecto.description}</Card.Text>
                        <p>Metros Cuadrados: {proyecto.mt2}</p>
                        <p>Tipo: {tiposProyectoMap[proyecto.type]}</p>
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
      <div className="pagination" style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
        {Array.from({ length: totalPaginas }, (_, i) => (
          <button
            key={i}
            onClick={() => paginar(i + 1)}
            style={{ cursor: 'pointer',
            margin: '5px',
            background: 'white',
            color: 'blue',
            border: '1px solid #ccc',
            padding: '6px 12px',
            borderRadius: '5px', }}
          >
            {i + 1}
          </button>
        ))}
      </div>
      {/* Modal de detalles del proyecto */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Detalles del proyecto</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <Row>
            <Col>
              <h3>{selectedProject.name}</h3>
              <br />
              <p>Descripción: {selectedProject.description}</p>
              <br />
              <p>Metros cuadrados: {selectedProject.mt2}</p>
              <br />
              <p>Tipo proyecto: {selectedProject.type}</p>
            </Col>
            <Col>
              {selectedProject.photos && selectedProject.photos.length > 0 && (
                <Card>
                  <Card.Img src={selectedProject.photos[0].photo} alt={selectedProject.name} />
                </Card>
              )}
            </Col>
          </Row>
        </Container>
      </Modal.Body>
    </Modal>
    </div>
  );
};

export default DirectorioProyectos;
