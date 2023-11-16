import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import axios from 'axios';
import CrearProyecto from './CrearProyectoModal';
import {
  Button,
  Modal,
  Alert,
  Card,
  Container,
  Row,
  Col,
} from 'react-bootstrap';import { Form } from 'react-bootstrap';
import fotoDefault from '../assets/img/imgNoDisponible.png'

const DataTableComponent = () => {


  // Modal para la asesoría
  const [showAsesoriaModal, setShowAsesoriaModal] = useState(false);
  const [projectTypes, setProjectTypes] = useState([]); // Estado para almacenar los tipos de proyectos
  const [profesionales, setProfesionales] = useState([]);
  const [especialidades, setEspecialidades] = useState([]); // Agregar estado para las especialidades
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [selectedProfessional, setSelectedProfessional] = useState(null);
  const [additionalProjectInfo, setAdditionalProjectInfo] = useState([]);
  const [selectedProjectId, setSelectedProjectId] = useState(null);

  const openProjectModal = async (projectId) => {
    const token = localStorage.getItem('token');
  
    if (projectId) {
      setSelectedProjectId(projectId); // Agrega esta línea
      try {
        const response = await axios.get(`http://149.50.130.111:8002/api/projects/${projectId}/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setSelectedProjectDetails(response.data);
        setShowProjectModal(true);
      } catch (error) {
        console.error("Error al obtener los detalles del proyecto", error);
      }
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
  
    if (token && selectedProjectId) {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
  
      axios.get(`http://149.50.130.111:8002/api/additional-project-info/get_info_for_project/${selectedProjectId}/`, config)
        .then(response => {
          setAdditionalProjectInfo(response.data);
        })
        .catch(error => {
          console.error('Error al obtener información adicional del proyecto:', error);
        });
    } else {
      console.error('Token no encontrado en el localStorage o no hay proyecto seleccionado');
    }
  }, [selectedProjectId]);

  const handleSelectProfessional = (professional) => {
    setSelectedProfessional(professional);
    setShowConfirmationModal(true);
  };


  const handleConfirmation = () => {
    // Verifica si hay un profesional seleccionado
    if (!selectedProfessional) {
      // Muestra un mensaje de error o maneja la falta de selección
      return;
    }

    const token = localStorage.getItem('token');

    // Hacer la solicitud POST
    axios.post('http://149.50.130.111:8002/api/solicitudes-asesoria/', {
      project: selectedProjectDetails.id,
      professional_asesor: selectedProfessional.professional_id,
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
    .then((response) => {
      // Lógica si la solicitud se realizó con éxito
      alert('¡Asesoría solicitada con éxito!');
      console.log('Solicitud de asesoría enviada con éxito', response.data);
      setShowConfirmationModal(false);
      setShowAsesoriaModal(false);
    })
    .catch((error) => {
      // Manejar errores si la solicitud falla
      alert('¡Error en la solicitud de la asesoría!');
      console.error('Error al enviar la solicitud de asesoría', error);
      // Aquí puedes manejar los errores, mostrar mensajes o realizar otras acciones
      // ...
    });
  };

  // Hacer la solicitud a la API para obtener la lista de profesionales
  useEffect(() => {
    axios
      .get('http://149.50.130.111:8001/api/profiles/')
      .then(response => {
        setProfesionales(response.data);
      })
      .catch(error => {
        console.error('Error al obtener la lista de profesionales', error);
      });
  }, []);

  useEffect(() => {
    // Llamada a la API para obtener la lista de especialidades
    axios
      .get('http://149.50.130.111:8000/especialistas/')
      .then(response => {
        setEspecialidades(response.data.results);
      })
      .catch(error => {
        console.error('Error al obtener la lista de especialidades', error);
      });

    // Llamada a la API para obtener la lista de profesionales
    axios
      .get('http://149.50.130.111:8001/api/profiles/')
      .then(response => {
        setProfesionales(response.data);
      })
      .catch(error => {
        console.error('Error al obtener la lista de profesionales', error);
      });
  }, []);

  useEffect(() => {
    // Hacer la solicitud a la API para obtener los tipos de proyectos
    axios.get('http://149.50.130.111:8002/api/project-types/')
      .then(response => {
        setProjectTypes(response.data);
      })
      .catch(error => {
        console.error('Error al obtener los tipos de proyectos', error);
      });
  }, []);

  // Obtener datos de profesionales desde la API
  useEffect(() => {
    axios
      .get('http://149.50.130.111:8001/api/profiles/')
      .then(response => {
        setProfesionales(response.data);
      })
      .catch(error => {
        console.error('Error al obtener la lista de profesionales', error);
      });
  }, []);

  const getSpecialtyNameFromId = (specialtyId) => {
    const specialty = especialidades.find(spec => spec.id === specialtyId);
    return specialty ? specialty.name : 'Sin especialidad';
  };

  const columnsProfesionales = [
    {
      name: 'Nombre Completo',
      selector: 'full_name',
      cell: (row) => `${row.first_name} ${row.last_name}`,
    },
    {
      name: 'Especialidad',
      selector: 'especialidad',
      cell: (row) => row.specialties.map(specialty => getSpecialtyNameFromId(specialty)).join(', '),
    },
    {
      name: '',
      cell: (row) => (
        <button className="btn btn-primary" onClick={() => handleSelectProfessional(row)}>Seleccionar</button>
      ),
    },
  ];

  const usuarioString = localStorage.getItem('usuario'); // Obtenemos la cadena JSON
  const usuarioObjeto = JSON.parse(usuarioString); // Parseamos la cadena a un objeto JavaScript

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null);

  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const userId = usuarioObjeto.id;
  console.log("ID del usuario: ", userId)

  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const [showEditSuccessAlert, setShowEditSuccessAlert] = useState(false); // Estado para mostrar el mensaje de éxito

  //Modal de asesoría

  const [showProjectModal, setShowProjectModal] = useState(false);
  const [projectURL, setProjectURL] = useState('');
  const [selectedProjectDetails, setSelectedProjectDetails] = useState({});

  // Estado para almacenar los datos obtenidos de la API
  const [data, setData] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Realizamos la llamada a la API y actualizamos el estado con los datos obtenidos
        const response = await axios.get('http://149.50.130.111:8002/api/projects/');
        const allProjects = response.data;

        // Filtramos los proyectos que coinciden con el ID del usuario
        const userProjects = allProjects.filter((project) => project.owner === userId);
        
        // Actualizamos el estado solo con los proyectos del usuario
        setData(userProjects);
      } catch (error) {
        // En caso de error, lo mostramos en la consola
        console.error("Ha ocurrido un error al obtener los datos", error);
      }
    };
    
    // Llamamos a la función fetchData
    fetchData();
  }, [userId]); // El array vacío indica que useEffect se ejecutará solo al montar el componente
  
  const handleDeleteProject = (projectId) => {
      setProjectToDelete(projectId);
      setShowConfirmation(true);
      };

      const confirmDelete = () => {
        // Aquí colocas la lógica para eliminar el proyecto con projectToDelete
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      
        axios
          .delete(`http://149.50.130.111:8002/api/projects/${projectToDelete}`, config)
          .then(() => {
            const updatedData = data.filter((project) => project.id !== projectToDelete);
            setData(updatedData);
            setShowConfirmation(false); // Ocultar la confirmación
            setProjectToDelete(null);

            // Establece el mensaje de éxito y muestra el Alert
            setSuccessMessage('El proyecto fue eliminado correctamente');
            setShowSuccessAlert(true);

            // Limpia el mensaje de éxito después de un tiempo (por ejemplo, 3 segundos)
            setTimeout(() => {
              setShowSuccessAlert(false);
              setSuccessMessage('');
            }, 3000);
          })
          .catch((error) => {
            console.error("Error al eliminar el proyecto", error);
          });
      };

      const handleEditProject = () => {
        // Obtiene el ID del proyecto seleccionado
        const projectId = selectedProject.id;
      
        // Realiza la solicitud PATCH para actualizar el proyecto
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      
        axios
          .patch(`http://149.50.130.111:8002/api/projects/${projectId}/`, selectedProject, config)
          .then(() => {
            // Muestra el mensaje de éxito
            setShowEditSuccessAlert(true);
            // Limpia el mensaje de éxito después de un tiempo (por ejemplo, 3 segundos)
            setTimeout(() => {
              setShowEditSuccessAlert(false);
            }, 3000);

            setShowEditModal(false); // Cierra el modal de edición
            console.log('Proyecto editado con exito')
            setTimeout(() =>{
              window.location.reload();
            }, 1500);
          })
          .catch((error) => {
            console.error('Error al editar el proyecto', error);
          });
      };
      
      


  // Definimos las columnas de la tabla
  const columns = [
    {
      name: 'ID',
      selector: 'id',
      sortable: true,
    },
    {
      name: 'Nombre',
      selector: 'name',
      sortable: true,
    },
    {
      name: 'Descripción',
      selector: 'description',
      sortable: true,
    },
    {
      name: 'mt2',
      selector: 'mt2',
      sortable: true,
      right: true,
    },
    {
      name: 'Ver Proyecto',
      cell: row => (
        <Button style={{marginRight: '8px', padding: '6px 12px', fontSize: '14px', backgroundColor: '#00ffd5', borderColor: 'black', height: '95%', padding: '8px', color: 'black'}}
        onClick={() => openProjectModal(row.id)}>
          Ver Proyecto            
        </Button>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
    {
      name: '',
      cell: row => (
        <Button style={{marginRight: '8px', padding: '6px 12px', fontSize: '14px', backgroundColor: '#cc1919', borderColor: 'black', height: '95%', padding: '8px'}} onClick={() => handleDeleteProject(row.id)}>Eliminar Proyecto</Button>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
    {
      name: '',
      cell: (row) => (
        <Button
          style={{ marginRight: '8px', padding: '6px 12px', fontSize: '14px', backgroundColor: '#fffb02', color: 'black', borderColor: 'black', height: '95%', padding: '8px' }}
          onClick={() => {
            setSelectedProject(row);
            setShowEditModal(true);
          }}
        >
          Modificar Proyecto
        </Button>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    }
  ];
  
  // Renderizamos el componente DataTable con los datos y columnas definidas
  return (
    
    <>
    <Card style={{padding: '10px', margin: 'auto'}}>
    <div style={{padding: '8px'}}>
    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px'}}>
      <h2>Mis Proyectos</h2>
    <CrearProyecto />
    </div >
    <div style={{padding: '8px'}}>
    <DataTable
      title=""
      columns={columns}
      data={data}
      pagination
      highlightOnHover
      customStyles={{
        rows: {
          style: {
            marginBottom: '10px', // Ajusta el espaciado entre las filas aquí
          },
        },
      }}
    />
    </div>
    </div>
    {/*Moodal para la confirmacion de elminacion de proyecto*/}
    <Modal show={showConfirmation} onHide={() => setShowConfirmation(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>¿Estás seguro de que deseas eliminar este proyecto?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirmation(false)}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>
      {showSuccessAlert && (
      <div className="alert alert-danger" role="alert" style={{padding: '10px'}}>
        {successMessage}
      </div>
      )}
      {/*Modal para la modificacion de proyecto*/}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Modificar Proyecto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="projectName">
              <Form.Label>Nombre del Proyecto</Form.Label>
              <Form.Control
                type="text"
                value={selectedProject?.name || ''}
                onChange={(e) => {
                  setSelectedProject({
                    ...selectedProject,
                    name: e.target.value,
                  });
                }}
              />
            </Form.Group>
            <Form.Group controlId="projectDescription">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={selectedProject?.description || ''}
                onChange={(e) => {
                  setSelectedProject({
                    ...selectedProject,
                    description: e.target.value,
                  });
                }}
              />
            </Form.Group>
            <Form.Group controlId="projectPhotos">
            <Form.Label>Fotos</Form.Label>
            <Form.Control
              type="file"
              onChange={(e) => {
                const files = e.target.files;
                if (files.length > 0) {
                  // Aquí puedes manejar los archivos seleccionados, por ejemplo, almacenarlos en el estado selectedProject
                  setSelectedProject({
                    ...selectedProject,
                    photos: files,
                  });
                }
              }}
            />
          </Form.Group>
            <Form.Group controlId="projectMT2">
              <Form.Label>mt2</Form.Label>
              <Form.Control
                type="number"
                value={selectedProject?.mt2 || ''}
                onChange={(e) => {
                  setSelectedProject({
                    ...selectedProject,
                    mt2: parseFloat(e.target.value),
                  });
                }}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleEditProject}>
            Guardar Cambios
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Alerta de éxito para la edición del proyecto */}
      {showEditSuccessAlert && (
        <Alert variant="success" onClose={() => setShowEditSuccessAlert(false)} dismissible>
          Proyecto modificado correctamente
        </Alert>
      )}
      {/*Modal de Ver Proyecto*/}
      <Modal
        size="lg"
        show={showProjectModal}
        onHide={() => setShowProjectModal(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">Detalles del proyecto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              <Col sm={6}>
                <h3>{selectedProjectDetails.name}</h3>
                <p>Descripción: {selectedProjectDetails.description}</p>
                <p>MT2: {selectedProjectDetails.mt2}</p>
                {projectTypes.length > 0 && selectedProjectDetails.type && (
                  <p>Tipo de Proyecto: {
                    projectTypes.find(projectType => projectType.id === selectedProjectDetails.type)?.name || 'No disponible'
                  }</p>
                )}
              </Col>
              <Col sm={6}>
              <h5>Fotos del proyecto:</h5>
              <Row>
                {selectedProjectDetails.photos && selectedProjectDetails.photos.length > 0 ? (
                  selectedProjectDetails.photos.map((photo) => (
                    <Col key={photo.id} sm={6}>
                      <img src={photo.photo} alt={fotoDefault} onError={(e) => {e.target.src = fotoDefault;}} style={{
                                width: '300px',
                                height: 'auto',
                                borderRadius: '8px', // Ajusta el valor para redondear más o menos las esquinas
                              }}/>
                    </Col>
                  ))
                ) : (
                  <Col sm={12}>
                    <p>No hay fotos disponibles para este proyecto.</p>
                  </Col>
                )}
              </Row>
            </Col>
            </Row>
          </Container>
          <hr />
          <Container>
            <h4>Información otorgada por asesor.</h4>
            {additionalProjectInfo.length > 0 ? (
              additionalProjectInfo.map(info => {
                // Buscar el nombre del asesor por su ID
                const asesor = profesionales.find(profesional => profesional.id === info.professional_asesor);
                const nombreAsesor = asesor ? `${asesor.first_name} ${asesor.last_name}` : `ID: ${info.professional_asesor}`;

                return (
                  <div key={info.id}>
                    <p>Descripción: {info.description}</p>
                    <p>Nombre profesional asesor: {nombreAsesor}</p>
                    <p>Tipo de profesional sugerido para el trabajo : {info.types_of_professionals.join(', ')}</p>
                    <hr /> {/* Línea separadora entre cada información adicional */}
                  </div>
                );
              })
            ) : (
              <p>No se encontró información adicional para este proyecto.</p>
            )}
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowProjectModal(false)}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={() => {
            setShowProjectModal(false); // Cierra el modal actual
            setShowAsesoriaModal(true); // Abre el modal de asesoría
          }}>
            Solicitar Asesoría
          </Button>
        </Modal.Footer>
      </Modal>
    </Card>
    {/* Modal para solicitar asesoría */}
    <Modal
      size="lg"
      show={showAsesoriaModal}
      onHide={() => setShowAsesoriaModal(false)}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">Solicitar Asesoría</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          Tu proyecto es del tipo {
            projectTypes.find(projectType => projectType.id === selectedProjectDetails.type)?.name || 'No disponible'
          }. Aquí está la lista de profesionales de la plataforma:
        </p>
        {/* DataTable para mostrar la lista de profesionales */}
        <DataTable
        title="Lista de Profesionales"
        columns={columnsProfesionales}
        data={profesionales}
        pagination
        highlightOnHover
        sortable
      />
      </Modal.Body>
      <Modal.Footer>
        {/* Botón para cerrar el modal de asesoría */}
        <Button variant="secondary" onClick={() => setShowAsesoriaModal(false)}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
    {/* Nuevo modal para la confirmación */}
    <Modal show={showConfirmationModal} onHide={() => setShowConfirmationModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Selección</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedProfessional && (
            <p>¿Estás seguro de escoger a {selectedProfessional.first_name} {selectedProfessional.last_name}?</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirmationModal(false)}>
            Escoger otro
          </Button>
          <Button variant="primary" onClick={handleConfirmation}>
            Confirmar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

// Exportamos el componente para poder utilizarlo en otras partes de nuestra aplicación
export default DataTableComponent;