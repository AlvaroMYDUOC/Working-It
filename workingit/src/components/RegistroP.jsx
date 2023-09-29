//Importes correspondiente
import React, {useState} from 'react';
import workers from '../assets/img/workers.jpg';
import axios from 'axios';
import { ApiRegistro } from '../services/apirest';

const RegistroP = () => {
  //Constantes para los mensajes de error
  const [error, setError] = useState();
  const [errorMsg, setErrorMsg] = useState("");

  //Manejador del checkbox
  const [aceptaTerminos, setAceptaTerminos] = useState(false);

  //Info que ira hacia el endpoint
  const [form, setForm] = useState({
            "email":"",
            "username":"",
            "city":"",
            "country":"Chile",
            "phone":"",
            "password":"",
            "password_confirmation":"",
            "first_name":"",
            "last_name":"",
            "photo": "",
            "is_professional": true,
            "specialties": [1]
  });

  //Funcion para ver si los campos se estan llenando correctamente (hay que matchear los campos y la info que va en la request)
  const manejadorChange = (e) => {
    if(e.target.name === "aceptaTerminos"){
      setAceptaTerminos(e.target.checked);
    } else{
      setForm({
        ...form,
        [e.target.name]: e.target.value
      });
    }
    console.log(form);
  }
  
  //Verificacion de llenado de los campos requeridos
  //En la consola, si enviamos el formulario y te sale error 400 no te va a salir que la solicitud envia el campo photo, pero lo esta haciendo de todas formas
  
  const manejadorBoton = (e) => {
    e.preventDefault(); // Evitamos la recarga de la pag al apretar el boton
    //Campos requeridos
  const requiredFields = [
    'email',
    'username',
    'password',
    'password_confirmation',
    'first_name',
    'last_name'];

  //Verificacion de los campos requeridos tienen valores
  const allFieldsPresent = requiredFields.every((fieldName) => !!form[fieldName]);
  
  //Condicional para setear los mensajes de error
  if(!allFieldsPresent) {
    setError(true);
    setErrorMsg("Por favor, complete todos los cambios obligatorios")
    return;
  }

  //Establecer el valor de photo como undefined en el objeto form
  //Esto enviara la photo como undefined en la solicitud
  form.photo = undefined;
  form.is_professional = true;

  //Funcion que enviara y avisara si la request es correcta
  let url = ApiRegistro;
  console.log("Datos a enviar: ", form); //Necesito visualizar los datos antes de enviarlos
  axios.post(url, form)
    .then((response) => {
      console.log(response);
      console.log(response.data); //Esperamos poder ver la data de la response con esto
    })
    .catch((error) => {
      setError(true);
      setErrorMsg("Ha ocurrido un error con el Registro")
      console.error("Error: ", error);
    });
  };


  return (
    <div className="container">
    <div className="row">
      <div className="col-md-6">
        <h2>Registro de Profesional</h2>
        <form onSubmit={manejadorBoton}>
        <div className="mb-3">
            <label htmlFor="nombres" className="form-label">Usuario</label>
            <input type="text" className="form-control" id="username" name="username" onChange={manejadorChange}/>
          </div>
          <div className="mb-3">
            <label htmlFor="nombres" className="form-label">Nombre</label>
            <input type="text" className="form-control" id="first_name" name="first_name" onChange={manejadorChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="apellidos" className="form-label">Apellido</label>
            <input type="text" className="form-control" id="last_name" name="last_name" onChange={manejadorChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="telefono" className="form-label">Teléfono</label>
            <input type="text" className="form-control" id="phone" name="phone" onChange={manejadorChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="correo" className="form-label">Correo Electrónico</label>
            <input type="email" className="form-control" id="email" name="email" onChange={manejadorChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Contraseña</label>
            <input type="password" className="form-control" id="password" name="password" onChange={manejadorChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label">Confirmar Contraseña</label>
            <input type="password" className="form-control" id="confirmPassword" name="password_confirmation" onChange={manejadorChange} />
          </div>
          <div className="mb-3">
              <label htmlFor="city" className="form-label">Ciudad</label>
              <input type="text" className="form-control" id="city" name="city" onChange={manejadorChange} />
            </div>
          {/*Pondremos un manejador para que si el checkbox no esta tickeado, no se pueda registrar*/}  
          <div className="mb-3 form-check">
            <input type="checkbox" 
            className="form-check-input" 
            id="terminos"
            name="aceptaTerminos"
            checked={aceptaTerminos}
            onChange={manejadorChange} 
            />
            <label className="form-check-label" htmlFor="terminos">Acepto los términos y condiciones</label>
          </div>
          <button type="submit" className="btn btn-primary" disabled={!aceptaTerminos}>Registrarme</button>
        </form>
      </div>
      <div className="col-md-6 d-flex justify-content-center align-items-center">
        <div className="card">
             <img src={workers} className="card-img-top"  alt="Profesional" />
        </div>
      </div>
    </div>
    <hr className="mt-4 mb-4" />
    <p className="psesion">¿Ya tienes una cuenta? <a href="#">Iniciar Sesión</a></p>
  </div>
  )
}

export default RegistroP
