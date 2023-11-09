import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Col, Row, Button, Modal, Form } from 'react-bootstrap';
import imgNoDisponible from '../assets/img/imgNoDisponible.png'
import '../assets/css/ListaAsesorías.css'

const ListaAsesorias = () => {
  const [asesorias, setAsesorias] = useState([]);
  const [asesoriasInactivas, setAsesoriasInactivas] = useState([]);
  const [proyectos, setProyectos] = useState([]);
  const [showAgregaInfoModal, setShowAgregaInfoModal] = useState(false);
  const [textAreaValue, setTextAreaValue] = useState('');
  const [selectValue, setSelectValue] = useState(''); // Valor por defecto del selector
  const [especialistas, setEspecialistas] = useState([]);
  const [selectedEspecialistas, setSelectedEspecialistas] = useState([]);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [activeAsesoriaId, setActiveAsesoriaId] = useState(null);

  const handleTerminateAsesoria = (asesoriaId) => {
    setActiveAsesoriaId(asesoriaId);
    setShowConfirmationModal(true);
  };

  const handleConfirmTermination = async () => {
    try {
      const userToken = localStorage.getItem('token');
      const usuario = JSON.parse(localStorage.getItem('usuario'));
      const userId = usuario.professional_id;

      if (userToken) {
        const terminationData = {
          user_id: userId
        }
        await axios.post(
          `http://149.50.130.111:8002/api/solicitudes-asesoria/${activeAsesoriaId}/terminate/`,terminationData,
          {
            headers: {
              Authorization: `Bearer ${userToken}`
            }
          }
        );
  
        console.log(`Asesoría ${activeAsesoriaId} terminada exitosamente.`);
  
        setShowConfirmationModal(false);
      } else {
        console.error('No se encontró el token en el localStorage.');
      }
    } catch (error) {
      console.error('Error al terminar la asesoría:', error);
    }
  };

  // Nuevo useEffect para mostrar los especialistas seleccionados en la consola
  useEffect(() => {
    console.log('Especialistas seleccionados:', selectedEspecialistas);
  }, [selectedEspecialistas]);

  useEffect(() => {
    const fetchAsesorias = async () => {
      try {
        const usuario = JSON.parse(localStorage.getItem('usuario'));
        if (usuario && usuario.professional_id) {
          const userId = usuario.professional_id;
          const userToken = localStorage.getItem('token');

          if (userToken) {
            const [asesoriasResponse, asesoriasInactivasResponse, proyectosResponse] = await Promise.all([
              axios.get(`http://149.50.130.111:8002/api/solicitudasesoria/active_asesorias_by_professional/${userId}`, {
                headers: {
                  Authorization: `Bearer ${userToken}`
                }
              }),
              axios.get(`http://149.50.130.111:8002/api/solicitudasesoria/inactive_asesorias_by_professional/${userId}`, {
                headers: {
                  Authorization: `Bearer ${userToken}`
                }
              }),
              axios.get('http://149.50.130.111:8002/api/projects/')
            ]);

            setAsesorias(asesoriasResponse.data);
            setAsesoriasInactivas(asesoriasInactivasResponse.data);
            setProyectos(proyectosResponse.data);
            console.log('Datos obtenidos con éxito');
          }
        }
      } catch (error) {
        console.error('Error al obtener los datos:', error);
        // Manejo de errores (puede mostrar un mensaje al usuario)
      }
    };

    fetchAsesorias();
  }, []);

  const handleSendInfo = async () => {
    try {
      const asesoriaActiva = asesorias.find(asesoria => asesoria.is_active);
  
      if (asesoriaActiva) {
        const proyectoRelacionado = proyectos.find(proyecto => proyecto.id === asesoriaActiva.project);
        const token = localStorage.getItem('token');
  
        const data = {
          solicitud_asesoria: asesoriaActiva.id,
          project: proyectoRelacionado.id,
          professional_asesor: asesoriaActiva.professional_asesor,
          description: textAreaValue,
          types_of_professionals: selectedEspecialistas
        };
        
        // Llamada a axios.post dentro del bloque if
        const response = await axios.post(
          'http://149.50.130.111:8002/api/additional-project-info/create_info/',
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
  
        console.log('Información agregada con éxito:', response.data);
        setShowAgregaInfoModal(false);
        
      } else {
        console.error('No se encontró una asesoría activa.');
      }
    } catch (error) {
      console.error('Error al enviar la información:', error);
    }
  };

  useEffect(() => {
    const fetchEspecialistas = async () => {
      try {
        const response = await axios.get('http://149.50.130.111:8000/especialistas/');
        setEspecialistas(response.data.results);
      } catch (error) {
        console.error('Error fetching especialistas:', error);
      }
    };

    fetchEspecialistas();
  }, []);
  
  return (
    <>
    <div className="container-fluid">
      <h2>Asesorías activas <Button onClick={() => setShowAgregaInfoModal(true)}>Agregar información</Button></h2> 
      <Row>
        {proyectos.length > 0 &&
          asesorias.map(asesoria => {
            const proyectoRelacionado = proyectos.find(proyecto => proyecto.id === asesoria.project);
            const fotoProyecto = proyectoRelacionado.photos.length > 0 ? proyectoRelacionado.photos[0].photo : null;

            return (
              <Col key={asesoria.id} md={8}>
                <Card>
                  <Card.Body>
                    <Row>
                      <Col md={8}>
                        <Card.Title>{proyectoRelacionado.name}</Card.Title>
                        <Card.Text>Descripción : {proyectoRelacionado.description}</Card.Text>
                        <Card.Text>Metros cuadrados: {proyectoRelacionado.mt2}</Card.Text>
                        <Card.Text>Tipo: {proyectoRelacionado.type}</Card.Text>
                        <Card.Text>Propietario: {proyectoRelacionado.owner}</Card.Text>
                        <Button variant="danger" onClick={() => handleTerminateAsesoria(asesoria.id)}>
                          Terminar asesoría
                        </Button>
                      </Col>
                      <Col md={3} className="text-center">
                        {fotoProyecto ? (
                          <img
                            src={fotoProyecto}
                            alt={imgNoDisponible}
                            style={{ width: '100%', height: '100%', borderRadius: '50%' }}
                            onError={(e) => {
                              e.target.src = imgNoDisponible;
                            }}
                          />
                        ) : (
                          <img
                            src={imgNoDisponible}
                            alt="Imagen no disponible"
                            style={{ width: '100px', height: '100px', borderRadius: '50%' }}
                          />
                        )}
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
            );
          })
        }
      </Row>

      <h2>Asesorías Pendientes</h2>
      <Row>
        {proyectos.length > 0 && asesoriasInactivas.length > 0 &&
          asesoriasInactivas.map(asesoria => {
            const proyectoRelacionado = proyectos.find(proyecto => proyecto.id === asesoria.project);

            if (proyectoRelacionado) {
              return (
                <Col key={asesoria.id} md={4} style={{ padding: '10px' }}>
                  <Card style={{ backgroundColor: '#c7c6c6', padding: '8px' }}>
                    <Card.Body>
                      <Card.Title>{proyectoRelacionado.name}</Card.Title>
                      <Card.Text>Description: {proyectoRelacionado.description}</Card.Text>
                      <Card.Text>Metros cuadrados: {proyectoRelacionado.mt2}</Card.Text>
                      <Card.Text>Tipo: {proyectoRelacionado.type}</Card.Text>
                      {/* Mostrar fotos relacionadas con el proyecto si están disponibles */}
                    </Card.Body>
                  </Card>
                </Col>
              );
            }
            return null;
          })
        }
      </Row>
    </div>
    <Modal
        size="lg"
        show={showAgregaInfoModal}
        onHide={() => setShowAgregaInfoModal(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <h3>Agregar información al proyecto</h3>
        </Modal.Header>
        <Modal.Body>
          <h5>Este es el proyecto que solicita una asesoría:</h5>
          {proyectos.length > 0 &&
          asesorias.map(asesoria => {
            const proyectoRelacionado = proyectos.find(proyecto => proyecto.id === asesoria.project);
            const fotoProyecto = proyectoRelacionado.photos.length > 0 ? proyectoRelacionado.photos[0].photo : null;

            return (
              <Col key={asesoria.id} md={12}>
                <Card>
                  <Card.Body>
                    <Row>
                      <Col md={8}>
                        <Card.Title>{proyectoRelacionado.name}</Card.Title>
                        <Card.Text>Descripción : {proyectoRelacionado.description}</Card.Text>
                        <Card.Text>Metros cuadrados: {proyectoRelacionado.mt2}</Card.Text>
                        <Card.Text>Tipo: {proyectoRelacionado.type}</Card.Text>
                        <Card.Text>Propietario: {proyectoRelacionado.owner}</Card.Text>
                      </Col>
                      <Col md={3} className="text-center">
                        {fotoProyecto ? (
                          <img
                            src={fotoProyecto}
                            alt={imgNoDisponible}
                            style={{ width: '100%', height: '100%', borderRadius: '50%' }}
                            onError={(e) => {
                              e.target.src = imgNoDisponible;
                            }}
                          />
                        ) : (
                          <img
                            src={imgNoDisponible}
                            alt="Imagen no disponible"
                            style={{ width: '100px', height: '100px', borderRadius: '50%' }}
                          />
                        )}
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
            );
          })
        }
        
        <h5 style={{marginTop: '15px'}}>Información para ayudar al cliente</h5>
        <p>¡Se te fue asignada una asesoría!</p>
        <p>Un cliente espera que puedas ayudarlo otorgandole información adicional para llevar a cabo su proyecto</p>
        <p>Por ejemplo: cantidad de pintura aproximada, una cantidad de materiales o algo que puedas recomendar</p>
        

        {/* TextArea para descripción */}
        <Form.Group controlId="textArea">
              <Form.Label>Información adicional</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={textAreaValue}
                onChange={(e) => setTextAreaValue(e.target.value)}
              />
            </Form.Group>
        {/* Selector para el tipo de profesional */}
        <Form.Group controlId="selectField">
            <Form.Label>Especialistas disponibles</Form.Label>
              <p>Agrega que tipo de especialista podría necesitar</p>
              <div className="mb-3">
                <div className="d-flex flex-wrap">
                {especialistas.map((especialista) => (
                  <Form.Check
                    name='group1'
                    type='checkbox'
                    key={especialista.id}
                    label={especialista.name}
                    id={`especialista-${especialista.id}`}
                    checked={especialista.selected}
                    onChange={() => {
                      especialista.selected = !especialista.selected;
                      const updatedEspecialistas = [...especialistas];
                      setSelectedEspecialistas(
                        updatedEspecialistas
                          .filter((esp) => esp.selected)
                          .map((esp) => esp.id)
                      );
                    }}
                    className="custom-checkbox" // Aplica la clase CSS personalizada
                    style={{ width: '48%', margin: '5px' }} // Estilo opcional
                  />
                ))}
                </div>
              </div>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          {/* Botón para enviar la información */}
          <Button variant='secondary' onClick={() => setShowAgregaInfoModal(false)}>Volver</Button>
          <Button variant='primary' onClick={handleSendInfo}>Enviar Información</Button>
        </Modal.Footer>
    </Modal>
    {/*Modal de confirmación para la eliminación de la asesoría.*/}
    <Modal
        show={showConfirmationModal}
        onHide={() => setShowConfirmationModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Término de Asesoría</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Estás seguro de que deseas terminar esta asesoría?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirmationModal(false)}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleConfirmTermination}>
            Terminar Asesoría
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ListaAsesorias;