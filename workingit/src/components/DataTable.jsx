import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import axios from 'axios';
import { FaExternalLinkAlt } from 'react-icons/fa'; // Importamos el ícono
import CrearProyecto from './CrearProyectoModal';
import { Button, Modal } from 'react-bootstrap';

const DataTableComponent = () => {
  const usuarioString = localStorage.getItem('usuario'); // Obtenemos la cadena JSON
  const usuarioObjeto = JSON.parse(usuarioString); // Parseamos la cadena a un objeto JavaScript

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null);

  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');


  const userId = usuarioObjeto.id;
  console.log("ID del usuario: ", userId)


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
            // No es necesario recargar la página con window.location.reload()

            // Establece el mensaje de éxito y muestra el Alert
            setSuccessMessage('El proyecto fue eliminado exitosamente');
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
        <Button style={{padding: '8px'}} onClick={() => handleDeleteProject(row.id)}>Eliminar Proyecto</Button>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    }
  ];
  
  // Renderizamos el componente DataTable con los datos y columnas definidas
  return (
    
    <>
    <div style={{padding: '8px'}}>
    <div style={{display: 'flex', flexDirection: 'row-reverse', padding: '10px'}}>
    <CrearProyecto />
    </div >
    <div style={{padding: '8px'}}>
    <DataTable
      title="Mis proyectos"
      columns={columns}
      data={data}
      pagination
      highlightOnHover
    />
    </div>
    </div>
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
      <div className="alert alert-success" role="alert" style={{padding: '10px'}}>
        {successMessage}
      </div>
      )}
    </>
  );
};

// Exportamos el componente para poder utilizarlo en otras partes de nuestra aplicación
export default DataTableComponent;