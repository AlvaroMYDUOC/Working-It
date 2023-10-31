import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Card, Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import fotoDefault from '../assets/img/defaultProfile.jpg'


const ListadoProfesionistas = () => {
  const [proyectos, setProyectos] = useState([]);
  const [nombreProyecto, setNombreProyecto] = useState('');

  const [nombreEspecialidad, setNombreEspecialidad] = useState('');
  const [categorias, setCategorias] = useState([]);

  const [profesionales, setProfesionales] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const profesionalesPorPagina = 5;

  const navigate = useNavigate();

  const handleProfessionalClick = (id_profesional) => {
    localStorage.setItem('id_profesional', JSON.stringify({ id_profesional}));
    navigate('/PerfilProfesionista');
  };

  useEffect(() => {
    axios.get('http://149.50.130.111:8000/especialistas/')
      .then(response => {
        setCategorias(response.data.results);
      })
      .catch(error => {
        console.error('Error al cargar las especialidades:', error);
      });
  }, []);

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
      axios.get('http://149.50.130.111:8001/api/profiles/')
        .then(response => {
          setProfesionales(response.data);
        })
        .catch(error => {
          console.error('Error al cargar perfiles de profesionales:', error);
        });
    } else {
      const palabrasClave = nombreProyecto.toLowerCase().split(' ');
      const profesionalesFiltrados = profesionales.filter(profesional =>
      palabrasClave.every(palabra =>
        profesional.first_name.toLowerCase().includes(palabra) ||
        profesional.last_name.toLowerCase().includes(palabra)
      )
      );
      setProfesionales(profesionalesFiltrados);
    }
  };

  const filtrarProfesionistasPorCategoria = (especialidad) => {
    if (!especialidad) {
      axios.get('http://149.50.130.111:8001/api/profiles/')
        .then(response => {
          setProfesionales(response.data);
        })
        .catch(error => {
          console.error('Error al cargar los perfiles de profesionales:', error);
        });
    } else {
      axios.get(`http://149.50.130.111:8001/api/profiles/?specialty=${especialidad}`)
        .then(response => {
          setProfesionales(response.data);
        })
        .catch(error => {
          console.error('Error al cargar los perfiles de profesionales por especialidad:', error);
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
              <h2>Especialidades</h2>
              {categorias.map(categoria => (
                <p
                  key={categoria.id}
                  onClick={() => filtrarProfesionistasPorCategoria(categoria.name)}
                  style={{
                    cursor: 'pointer',
                    textDecoration: 'none',
                  }}
                  onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
                  onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
                >
                  {categoria.name}
                </p>
              ))}
              <p
                onClick={() => filtrarProfesionistasPorCategoria('')}
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
          <Col md={4}>
            <div className="profesionistas">
              {profesionalesActuales.map(profesional => (
                <Card key={profesional.professional_id} className="mb-3" style={{ margin: '10px 0' }}>
                  <Card.Body>
                    <Row>
                      <Col md={6}>
                        <div>
                          <Card.Title>
                            <a
                              href=""
                              onClick={() => handleProfessionalClick(profesional.professional_id)}
                            >
                              {`${profesional.first_name} ${profesional.last_name}`}
                            </a>
                          </Card.Title>
                          <Card.Text>Sobre mí: {profesional.about_me || 'No information available'}</Card.Text>
                          <Card.Text>Especialidad: {profesional.specialties.map((specialtyId, index) => {
                            const matchedSpecialty = categorias.find(specialidad => specialidad.id === specialtyId);
                            return (
                              <span key={specialtyId}>
                                {matchedSpecialty ? matchedSpecialty.name : `Especialidad ${index + 1}`} 
                                {index !== profesional.specialties.length - 1 && ', '}
                              </span>
                            );})}
                          </Card.Text>
                        </div>
                      </Col>
                      <Col md={6}>
                        <div className="d-flex justify-content-end">
                          {profesional.professional_photo ? (
                            <img
                              src={profesional.professional_photo}
                              alt={`${profesional.first_name} ${profesional.last_name}`}
                              style={{ width: '100px', height: '100px', borderRadius: '50%' }}
                              onError={(e) => {
                                e.target.src = fotoDefault; // Asignar la imagen predeterminada en caso de error
                              }}
                            />
                          ) : (
                            <img
                              src={fotoDefault}
                              alt="Default Profile"
                              style={{ width: '100px', height: '100px', borderRadius: '50%' }}
                            />
                          )}
                        </div>
                      </Col>
                    </Row>
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
