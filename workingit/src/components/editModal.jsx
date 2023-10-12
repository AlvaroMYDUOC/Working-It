import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import { useEffect } from 'react';


const Example = () => {
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    first_name: null,
    last_name: null,
    about_me: null,
    professional_photo: null,
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    // Manejar el cambio del campo "foto" de manera especial para guardar el archivo
    if (type === 'file') {
      setFormData({
        ...formData,
        [name]: files[0], // Tomar el primer archivo seleccionado
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };


  const handlePatch = async () => {
    // Crear una instancia de FormData para enviar el formulario con archivos
    const formDataToSend = new FormData();

    // Comprobar si el campo first_name ha cambiado
    if (formData.first_name !== null) {
      formDataToSend.append('first_name', formData.first_name);
    }

     // Comprobar si el campo last_name ha cambiado
     if (formData.last_name !== null) {
      formDataToSend.append('last_name', formData.last_name);
    }
    
    // Comprobar si el campo about_me ha cambiado
    if (formData.about_me !== null) {
      formDataToSend.append('about_me', formData.about_me);
    }

    if (formData.professional_photo !== null) {
      formDataToSend.append('professional_photo', formData.professional_photo);
    }

    try {
      //Obtener Professional-id del localstorage
      const usuario = JSON.parse(localStorage.getItem('usuario'));
      const professional_id = usuario ? usuario.professional_id : null;
      const token = localStorage.getItem('token')

      if (professional_id && token) {
        const response = await axios.patch(`http://149.50.130.111:8001/api/profiles/${professional_id}/edit/`, formDataToSend, {
          headers: {
            Authorization: "Bearer " + token,
          },
        });

        if (response.status === 200) {
          console.log('Solicitud PATCH  exitosa');
          //Recargar la pagina despues de unos segundos
          setTimeout(() =>{
            window.location.reload();
          }, 500);
        } else {
          console.error('Error al realizar la solicitud POST');
        }
      } else {
        console.error('No se encontró professional_id en el localStorage');
      }
    } catch (error) {
      console.error('Error al realizar la solicitud POST:', error);
    }

    handleClose();
  };

  // Realizar una solicitud GET para obtener los datos iniciales al abrir el modal
  useEffect(() => {
    const usuario = JSON.parse(localStorage.getItem('usuario'));
    const professional_id = usuario ? usuario.professional_id : null;
    const token = localStorage.getItem('token');

    if (professional_id && token) {
      axios.get(`http://149.50.130.111:8001/api/profiles/${professional_id}`)
        .then((response) => {
          if (response.status === 200) {
            const data = response.data; // Los datos obtenidos de la API
            setFormData({
              first_name: data.first_name || '',
              last_name: data.last_name || '',
              about_me: data.about_me || '',
              professional_photo: data.professional_photo || null, // Utiliza la foto obtenida de la API
            });
          } else {
            console.error('Error al obtener los datos iniciales de la API');
          }
        })
        .catch((error) => {
          console.error('Error al obtener los datos iniciales de la API:', error);
        });
    }
  }, []);

  return (
    <>
      <Button  style={{backgroundColor: '#6d8cf1', padding: '8px'}}onClick={handleShow}>
        Editar Perfil
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Perfil</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                placeholder=""
                name="first_name"
                autoFocus
                value={formData.first_name}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Apellido</Form.Label>
              <Form.Control
                type="text"
                placeholder=""
                name="last_name"
                autoFocus
                value={formData.last_name}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Sobre mi</Form.Label>
              <Form.Control as="textarea" 
              rows={3}
              name="about_me"
              value={formData.about_me}
              onChange={handleChange}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Foto</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                name="professional_photo"
                onChange={handleChange}/>    
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={handlePatch}>
            Guardar Cambios
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Example;
