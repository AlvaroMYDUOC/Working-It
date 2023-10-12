import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import axios from 'axios';
import { FaExternalLinkAlt } from 'react-icons/fa'; // Importamos el ícono
import CrearProyecto from './CrearProyectoModal';
import { Button, Modal, Alert, Card } from 'react-bootstrap';
import { Form } from 'react-bootstrap';

const DataTableComponent = () => {
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
      // Creamos un botón o ícono en la celda que redirige a la URL del proyecto
      cell: row => <a href={`http://149.50.130.111:8002/api/projects/${row.id}/`} target="_blank" rel="noopener noreferrer"><FaExternalLinkAlt /></a>,
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

    </Card>
    </>
  );
};

// Exportamos el componente para poder utilizarlo en otras partes de nuestra aplicación
export default DataTableComponent;