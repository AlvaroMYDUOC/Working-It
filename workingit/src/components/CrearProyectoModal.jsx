import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import Form from 'react-bootstrap/Form';


const CrearProyectoModal = () => {
  const [showLargeModal, setShowLargeModal] = useState(false);
  const openLargeModal = () => setShowLargeModal(true);
  const closeLargeModal = () => setShowLargeModal(false);
  const [projectTypes, setProjectTypes] = useState([]);
  const [projectData, setProjectData] = useState({
    name: '',
    description: '',
    type: '',
    mt2: '',
    photos: null, // Para manejar la carga de imágenes
  });
  const [token, setToken] = useState('');
  const [errors, setErrors] = useState({}); // Para almacenar los errores de validación
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if(storedToken){
        setToken(storedToken);
    }

    // Realiza la solicitud GET a la API cuando se monta el componente
    axios.get('http://149.50.130.111:8002/api/project-types/')
      .then(response => {
        // Al recibir la respuesta, actualiza el estado con los tipos de proyecto
        setProjectTypes(response.data);
      })
      .catch(error => {
        console.error('Error al obtener los tipos de proyecto:', error);
      });
  }, []);

  const handleInputChange = event => {
    const { name, value, files } = event.target;

    // Muestra en la consola lo que el usuario está ingresando
    console.log(`Campo "${name}": ${value}`);

    // Actualiza el estado con el nuevo valor
    setProjectData({
      ...projectData,
      [name]: value,
    });

    if (files) {
      setProjectData({
        ...projectData,
        [name]: files[0],
      });
    }
  };

  // Función para manejar el envío del formulario
  const handleCreateProyecto = () => {
    // Crea un objeto FormData para enviar los datos, incluyendo las imágenes
    const formData = new FormData();
    formData.append('name', projectData.name);
    formData.append('description', projectData.description);
    formData.append('type', projectData.type);
    formData.append('mt2', projectData.mt2);
    if (projectData.photos) {
      formData.append('photos', projectData.photos);
    }
    
    // Configura la cabecera de la solicitud con el token
    const config = {
        headers: {
          Authorization: `Bearer `+ token, // Agrega el token como cabecera
        },
      };
    
    // Realiza la solicitud POST a la API
    axios.post('http://149.50.130.111:8002/api/projects/', formData, config)
      .then(response => {
        // Maneja la respuesta de la API (por ejemplo, muestra un mensaje de éxito)
        console.log('Proyecto creado con éxito:', response.data);
        setShowSuccessAlert(true);
        // Cierra el modal después de un éxito
        closeLargeModal();
        setTimeout(() =>{
          window.location.reload();
        }, 1000);
        setTimeout(hideSuccessAlert, 5000);
      })
      .catch(error => {
        console.error('Error al crear el proyecto:', error);
        // Maneja los errores de la solicitud
      });
  };

  const hideSuccessAlert = () => {
    setShowSuccessAlert(false);
  };

  return (
    <>
      <Button onClick={openLargeModal}
      style={{backgroundColor: '#0011ff'}}
      >Crear proyecto</Button>
      <Modal
        size="lg"
        show={showLargeModal}
        onHide={closeLargeModal}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            Crear Proyecto
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form style={{padding: "0 16px"}}>
            <Form.Group className="mb-3" >
              <Form.Label>Nombre Proyecto</Form.Label>
              <Form.Control
                type="text"
                placeholder=""
                name="name"
                id="name"
                autoFocus
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" >
              <Form.Label>Descripcion proyecto</Form.Label>
              <Form.Control
                as="textarea"
                type="text"
                placeholder=""
                name="description"
                id="description"
                autoFocus
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group>
            <div className="mb-3" style={{ display: 'flex', flexDirection: 'column' }}>
                <label htmlFor="especialidad" className="form-label">
                  Tipo de proyecto
                </label>
                <select
                className="form-select" 
                name="type" 
                id="type"
                onChange={handleInputChange}
                >
                  <option value="" disabled>
                    Seleccione un tipo de proyecto
                  </option>
                  {/* Mapea las opciones de tipos de proyecto desde el estado */}
                  {projectTypes.map(type => (
                    <option key={type.id} value={type.id}>
                      {type.name}
                    </option>
                  ))}
                </select>
              </div>
            </Form.Group>
            <Form.Group className="mb-3" >
              <Form.Label>Mt2</Form.Label>
              <Form.Control
                type="text"
                placeholder=""
                name="mt2"
                autoFocus
                onChange={handleInputChange}

              />
            </Form.Group>
            <Form.Group className="mb-3" >
              <Form.Label>Fotos del lugar</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                name="photos"
                id="photos"
                onChange={handleInputChange}

                />    
            </Form.Group>
            </Form>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={closeLargeModal}>
                Cerrar
            </Button>
            <Button variant="primary" onClick={handleCreateProyecto}>
                Crear Proyecto
            </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CrearProyectoModal;
