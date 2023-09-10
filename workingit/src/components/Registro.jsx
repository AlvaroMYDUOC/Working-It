import React, { useState } from 'react';
import '../assets/css/Registro.css';
import clientImage from '../assets/img/cliente.jpg';
import clientImage2 from '../assets/img/cliente2.jpg';
import specImage from '../assets/img/worker.jpg';
import specImage2 from '../assets/img/workers.jpg';
import axios from 'axios';
import { ApiRegistro } from '../services/apirest';


function Registro() {
    const [selectedImage, setSelectedImage] = useState(null);
    
    //Esto te permite ver que imagen es la seleccionada
    const handleImageClick = (image) => {
      setSelectedImage(image);
    };
    
    return (
      <div className="registro-container">
        <h2>Que tipo de usuario eres?</h2>
        <div className="image-container">
          <div
            className={`image-wrapper ${selectedImage === 1 ? 'move-right' : 'move-left'}`}
            onClick={() => handleImageClick(1)}
          >
            <img
              src={clientImage2}
              alt="Imagen 1"
              className={`image ${selectedImage === 1 ? 'selected' : ''}`}
            />
            <label className='image-label'>Cliente</label>
            {selectedImage === 1 && <Formulario1 />}
          </div>
          <div
            className={`image-wrapper ${selectedImage === 2 ? 'move-right' : 'move-left'}`}
            onClick={() => handleImageClick(2)}
          >
            <img
              src={specImage2}
              alt="Imagen 2"
              className={`image ${selectedImage === 2 ? 'selected' : ''}`}
            />
            <label className='image-label'>Profesionista</label>
            {selectedImage === 2 && <Formulario2 />}
          </div>
        </div>
      </div>
    );
  }

function Formulario1() {
    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const [form, setForm] = useState({
        "email":"",
            "username":"",

            "country":"Chile",
            "city":"",
            "phone":"",
            "first_name":"",
            "last_name":"",
            "password":"",
            "password_confirmation":"",
            "is_professional":false
      });

    const manejadorChange = (e) => {
        setForm({
          ...form,
          [e.target.name]: e.target.value
        });
        console.log(form);
      }
      const manejadorBoton = (e) => {
        e.preventDefault(); //Evitamos la recarga de la pag
        const requiredFields = ['email', 'username', 'password', 'password_confirmation', 'first_name', 'last_name'];
      
        // Verificar si todos los campos requeridos tienen valores
        const allFieldsPresent = requiredFields.every((fieldName) => !!form[fieldName]);
      
        if (!allFieldsPresent) {
          setError(true);
          setErrorMsg("Por favor, complete todos los campos obligatorios.");
          return;
        }
      
        let url = ApiRegistro;
        axios
          .post(url, form)
          .then((response) => {
            console.log(response);
          })
          .catch((error) => {
            setError(true);
            setErrorMsg("Ha ocurrido un error con el Registro");
          });
      };
  return (
    <form className="registro-form" onSubmit={manejadorBoton}>
      <div className="form-group">
        <label htmlFor="nombres">Nombre</label>
        <input type="text" id="nombres" name="first_name" className="form-input" onChange={manejadorChange}/>
      </div>
      <div className="form-group">
        <label htmlFor="nombres">Usuario</label>
        <input type="text" id="user" name="username" className="form-input" onChange={manejadorChange}/>
      </div>
      <div className="form-group">
        <label htmlFor="apellidos">Apellido</label>
        <input type="text" id="apellidos" name="last_name" className="form-input" onChange={manejadorChange}/>
      </div>
      <div className="form-group">
        <label htmlFor="rut">Rut:</label>
        <input type="text" id="rut" name="rut" className="form-input" />
      </div>
      <div className="form-group">
        <label htmlFor="telefono">Teléfono:</label>
        <input type="text" id="phone" name="phone" className="form-input" onChange={manejadorChange}/>
      </div>
      <div className="form-group">
        <label htmlFor="correo">Correo Electrónico:</label>
        <input type="email" id="correo" name="email" className="form-input" onChange={manejadorChange}/>
      </div>
      <div className="form-group">
        <label htmlFor="contrasena">Contraseña:</label>
        <input type="password" id="contrasena" name="password" className="form-input" onChange={manejadorChange}/>
      </div>
      <div className="form-group">
        <label htmlFor="repetirContrasena">Repetir Contraseña:</label>
        <input type="password" id="repetirContrasena" name="password_confirmation" className="form-input" onChange={manejadorChange}/>
      </div>
      <div className="form-group">
        <label htmlFor="nombres">Ciudad</label>
        <input type="text" id="city" name="city" className="form-input" onChange={manejadorChange}/>
      </div>
      <div className="form-group" >
        <label>
          <input type="checkbox" className="checkbox-input" /> He leído la Política de privacidad y acepto los términos de uso
        </label>
      </div>
      <button type="submit" className="submit-button">Enviar</button>
    </form>
  );
}

function Formulario2() {
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [form, setForm] = useState({
      "email":"",
          "username":"",

          "country":"Chile",
          "city":"",
          "phone":"",
          "first_name":"",
          "last_name":"",
          "password":"",
          "password_confirmation":"",
          "is_professional":true
    });

  const manejadorChange = (e) => {
      setForm({
        ...form,
        [e.target.name]: e.target.value
      });
      console.log(form);
    }
    const manejadorBoton = (e) => {
      e.preventDefault(); //Evitamos la recarga de la pag
      const requiredFields = ['email', 'username', 'password', 'password_confirmation', 'first_name', 'last_name'];
    
      // Verificar si todos los campos requeridos tienen valores
      const allFieldsPresent = requiredFields.every((fieldName) => !!form[fieldName]);
    
      if (!allFieldsPresent) {
        setError(true);
        setErrorMsg("Por favor, complete todos los campos obligatorios.");
        return;
      }
    
      let url = ApiRegistro;
      axios
        .post(url, form)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          setError(true);
          setErrorMsg("Ha ocurrido un error con el Registro");
        });
    };
return (
  <form className="registro-form" onSubmit={manejadorBoton}>
    <div className="form-group">
      <label htmlFor="nombres">Nombre</label>
      <input type="text" id="nombres" name="first_name" className="form-input" onChange={manejadorChange}/>
    </div>
    <div className="form-group">
      <label htmlFor="nombres">Usuario</label>
      <input type="text" id="user" name="username" className="form-input" onChange={manejadorChange}/>
    </div>
    <div className="form-group">
      <label htmlFor="apellidos">Apellido</label>
      <input type="text" id="apellidos" name="last_name" className="form-input" onChange={manejadorChange}/>
    </div>
    <div className="form-group">
      <label htmlFor="rut">Rut:</label>
      <input type="text" id="rut" name="rut" className="form-input" />
    </div>
    <div className="form-group">
      <label htmlFor="telefono">Teléfono:</label>
      <input type="text" id="phone" name="phone" className="form-input" onChange={manejadorChange}/>
    </div>
    <div className="form-group">
      <label htmlFor="correo">Correo Electrónico:</label>
      <input type="email" id="correo" name="email" className="form-input" onChange={manejadorChange}/>
    </div>
    <div className="form-group">
      <label htmlFor="contrasena">Contraseña:</label>
      <input type="password" id="contrasena" name="password" className="form-input" onChange={manejadorChange}/>
    </div>
    <div className="form-group">
      <label htmlFor="repetirContrasena">Repetir Contraseña:</label>
      <input type="password" id="repetirContrasena" name="password_confirmation" className="form-input" onChange={manejadorChange}/>
    </div>
    <div className="form-group">
      <label htmlFor="nombres">Ciudad</label>
      <input type="text" id="city" name="city" className="form-input" onChange={manejadorChange}/>
    </div>
    <div className="form-group" >
      <label>
        <input type="checkbox" className="checkbox-input" /> He leído la Política de privacidad y acepto los términos de uso
      </label>
    </div>
    <button type="submit" className="submit-button">Enviar</button>
  </form>
);
}

export default Registro;