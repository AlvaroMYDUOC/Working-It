//Importes correspondiente
import React, {useState , useEffect, useRef} from 'react';
import workers from '../assets/img/workers.jpg';
import axios from 'axios';
import { ApiRegistro } from '../services/apirest';
import { useNavigate } from 'react-router-dom';
import { Modal, Button, Form } from 'react-bootstrap';

import HCaptcha from '@hcaptcha/react-hcaptcha'; // Importa el componente de hCaptcha
const RegistroP = () => {

  const [captchaToken, setCaptchaToken] = useState('');
  const handleVerifyCaptcha = (token) => {
    setCaptchaToken(token);
  };
  //Seccion de instrucciones
  //////////////////////////////////////////////////////////////////////////////////////////////////////////
  const [showInstructionsCiudad, setShowInstructionsCiudad] = useState(false);

  const handleCiudadInputClick = () => {
    console.log('Clic en el campo de Ciudad')
    setShowInstructionsCiudad(true);
  };


  const handleClickOutsideInstructionsCiudad = (e) => {
    if(!e.target.closest("#city")){
      //Si se hace clic fuera del campo de telefono, oculta las instrucciones
      setShowInstructionsCiudad(false);
    }
  };

  useEffect(() =>{
    if(showInstructionsCiudad) {
      document.body.addEventListener("click", handleClickOutsideInstructionsCiudad);
    } else {
      document.body.removeEventListener("click", handleClickOutsideInstructionsCiudad);
    }

    return() => {
      document.body.removeEventListener("click", handleClickOutsideInstructionsCiudad);
    };
  }, [showInstructionsCiudad]);
  //////////////////////////////////////////////////////////////////////////////////////////////////////////
  const [showInstructionsPassConfirm, setShowInstructionsPassConfirm] = useState(false);

  const handlePassConfirmInputClick = () => {
    console.log('Clic en el campo de PassConfirm')
    setShowInstructionsPassConfirm(true);
  };


  const handleClickOutsideInstructionsPassConfirm = (e) => {
    if(!e.target.closest("#confirmPassword")){
      //Si se hace clic fuera del campo de telefono, oculta las instrucciones
      setShowInstructionsPassConfirm(false);
    }
  };

  useEffect(() =>{
    if(showInstructionsPassConfirm) {
      document.body.addEventListener("click", handleClickOutsideInstructionsPassConfirm);
    } else {
      document.body.removeEventListener("click", handleClickOutsideInstructionsPassConfirm);
    }

    return() => {
      document.body.removeEventListener("click", handleClickOutsideInstructionsPassConfirm);
    };
  }, [showInstructionsPassConfirm]);
  //////////////////////////////////////////////////////////////////////////////////////////////////////////
  const [showInstructionsCorreo, setShowInstructionsCorreo] = useState(false);

  const handleCorreoInputClick = () => {
    console.log('Clic en el campo de correo')
    setShowInstructionsCorreo(true);
  };


  const handleClickOutsideInstructionsCorreo = (e) => {
    if(!e.target.closest("#email")){
      //Si se hace clic fuera del campo de telefono, oculta las instrucciones
      setShowInstructionsCorreo(false);
    }
  };

  useEffect(() =>{
    if(showInstructionsCorreo) {
      document.body.addEventListener("click", handleClickOutsideInstructionsCorreo);
    } else {
      document.body.removeEventListener("click", handleClickOutsideInstructionsCorreo);
    }

    return() => {
      document.body.removeEventListener("click", handleClickOutsideInstructionsCorreo);
    };
  }, [showInstructionsCorreo]);
  //////////////////////////////////////////////////////////////////////////////////////////////////////////
  const [showInstructionsNombre, setShowInstructionsNombre] = useState(false);

  const handleNombreInputClick = () => {
    console.log('Clic en el campo de nombre')
    setShowInstructionsNombre(true);
  };


  const handleClickOutsideInstructionsNombre = (e) => {
    if(!e.target.closest("#first_name")){
      //Si se hace clic fuera del campo de telefono, oculta las instrucciones
      setShowInstructionsNombre(false);
    }
  };

  useEffect(() =>{
    if(showInstructionsNombre) {
      document.body.addEventListener("click", handleClickOutsideInstructionsNombre);
    } else {
      document.body.removeEventListener("click", handleClickOutsideInstructionsNombre);
    }

    return() => {
      document.body.removeEventListener("click", handleClickOutsideInstructionsNombre);
    };
  }, [showInstructionsNombre]);
  //////////////////////////////////////////////////////////////////////////////////////////////////////////
  const [showInstructionsTelefono, setShowInstructionsTelefono] = useState(false);

  const handleTelefonoInputClick = () => {
    console.log('Clic en el campo de telefono')
    setShowInstructionsTelefono(true);
  };


  const handleClickOutsideInstructionsTelefono = (e) => {
    if(!e.target.closest("#phone")){
      //Si se hace clic fuera del campo de telefono, oculta las instrucciones
      setShowInstructionsTelefono(false);
    }
  };

  useEffect(() =>{
    if(showInstructionsTelefono) {
      document.body.addEventListener("click", handleClickOutsideInstructionsTelefono);
    } else {
      document.body.removeEventListener("click", handleClickOutsideInstructionsTelefono);
    }

    return() => {
      document.body.removeEventListener("click", handleClickOutsideInstructionsTelefono);
    };
  }, [showInstructionsTelefono]);
    //////////////////////////////////////////////////////////////////////////////////////////////////////////
  // Instrucciones para el apellido
  const [showInstructionsApellido, setShowInstructionsApellido] = useState(false);

  const handleApellidoInputClick = () => {
    console.log('Clic en el campo de apellido')
    setShowInstructionsApellido(true);
  };

  const handleClickOutsideInstructionsApellido = (e) => {
    if (!e.target.closest("#last_name")) {
      // Si se hace clic fuera del campo de apellido, ocultar las instrucciones
      setShowInstructionsApellido(false);
    }
  };

  useEffect(() => {
    if (showInstructionsApellido) {
      document.body.addEventListener("click", handleClickOutsideInstructionsApellido);
    } else {
      document.body.removeEventListener("click", handleClickOutsideInstructionsApellido);
    }

    return () => {
      document.body.removeEventListener("click", handleClickOutsideInstructionsApellido);
    };
  }, [showInstructionsApellido]);

  //////////////////////////////////////////////////////////////////////////////////////////////////////////
  //INSTRUCCIONES PARA EL USUARIO
  const [showInstructions, setShowInstructions] = useState(false);

  const handleUsernameInputClick = () => {
    setShowInstructions(true);
  };

  const handleClickOutsideInstructions = (e) => {
    if (!e.target.closest("#username")) {
      // Si se hace clic fuera del campo de usuario, ocultar las instrucciones
      setShowInstructions(false);
    }
  };

  useEffect(() => {
    if (showInstructions) {
      document.body.addEventListener("click", handleClickOutsideInstructions);
    } else {
      document.body.removeEventListener("click", handleClickOutsideInstructions);
    }
  
    return () => {
      document.body.removeEventListener("click", handleClickOutsideInstructions);
    };
  }, [showInstructions]);
  
  //////////////////////////////////////////////////////////////////////////////////////////////////////////

    //Estados para la comprobacion de el matcheo de contras
    const [errorPasswordMatch, setErrorPasswordMatch] = useState("");

    const validatePasswordMatch = () => {
      if (form.password !== form.password_confirmation) {
        setErrorPasswordMatch("Las contraseñas no coinciden. Por favor, asegúrate de que coincidan.");
        return false;
      }
      setErrorPasswordMatch(""); // Limpiar el mensaje de error si las contraseñas coinciden
      return true;
    };
    
    //Nuevo estado para el error de specialties
    const [errorSpecialties, setErrorSpecialtes] = useState("");
    
    //Nuevo estado para el error del telefono
    const [errorTelefono, setErrorTelefono] = useState("");
  
    //Nuevo estado para el error del apellido
    const [errorApellido, setErrorApellido] = useState("");
  
    //Nuevo estado para el error de nombre de usuario
    const [errorNombre, setErrorNombre] = useState("");
  
    // Nuevo estado para el error de nombre de usuario
    const [errorUsername, setErrorUsername] = useState("");
  
    // Nuevo estado para el error de email
    const [errorEmail, setErrorEmail] = useState("");
  
    //Nuevo estado para mostrar / ocultar las reglas de contruccion de contrasenas
    const [showPasswordRules, setShowPasswordRules] = useState(false);
  
    //Ref para el campo de contrasena
    const passwordInputRef = useRef(null);
  
    //Metodo para mostrar las contrasenas
    const handlePasswordInputClick = () => {
      setShowPasswordRules(true)
    }
  
    // Manejar clic fuera del campo de contraseña
     const handleClickOutside = (e) => {
      if (passwordInputRef.current && !passwordInputRef.current.contains(e.target)) {
        // Si se hace clic fuera del campo de contraseña, ocultar las reglas
        setShowPasswordRules(false);
      }
    };

    // Agregar un manejador de clic al cuerpo del documento
    useEffect(() => {
      document.body.addEventListener('click', handleClickOutside);
      return () => {
      document.body.removeEventListener('click', handleClickOutside);
      };
    }, []);
  
  //Constantes para mostrar el modal de verificación con el código
  const [showModal, setShowModal] = useState(false);

  //Constante para redireccion
  const navigate = useNavigate();
  const homePageUrl = "/";

  //Constantes para las Specialties
  const [especialidades, setEspecialidades] = useState([]);
  const [especialidadSeleccionada, setEspecialidadSeleccionada] = useState("");

  //Funcion para el dropdown y traer las specialties
  useEffect(() => {
    // Realiza la solicitud para obtener las especialidades desde tu API
    axios.get('http://149.50.130.111:8000/especialistas/')
      .then((response) => {
        setEspecialidades(response.data.results); // Actualiza el estado con las especialidades obtenidas
        console.log(response) //Comentar o no para usar esta wa 
      })
      .catch((error) => {
        console.error("Error al obtener las especialidades:", error);
      });
  }, []);

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
            "specialties": ""
  });

  //Funcion para ver si los campos se estan llenando correctamente (hay que matchear los campos y la info que va en la request)
  const manejadorChange = (e) => {
    if(e.target.name === "aceptaTerminos"){
      setAceptaTerminos(e.target.checked);
    } else if(e.target.name === "especialidad"){
      const especialidadId = e.target.value;
      setForm({
        ...form,
        specialties: [parseInt(especialidadId)] //Convierte el ID de la espeecialidad a un entero
      });
      setEspecialidadSeleccionada(especialidadId);
    }else{
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
  
  //Verifica si las contras coinciden
  if(!validatePasswordMatch()){
    return; //Detiene el envio si las contrasenas con coinciden
  }

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

  //Verificar si el checkbox de acpetacion de terminos esta marcado
  if(!aceptaTerminos){
    //Mostrar un nmensaje de error y detener el registro
    setErrorMsg("Debes aceptar los terminos y condiciones de servicios antes de poder registrarte");
    return;
  }

  if (!captchaToken) {
    // Muestra un mensaje de error específico para la falta de verificación de captcha
    setErrorMsg('Por favor, completa la verificación de captcha.');
    setError(true);
    return;
  }
  form.captchaToken = captchaToken;
  //Funcion que enviara y avisara si la request es correcta
  let url = ApiRegistro;
  // console.log("Datos a enviar: ", form); //Necesito visualizar los datos antes de enviarlos
  axios.post(url, form)
    .then((response) => {
      console.log(response);
      console.log(response.data); //Esperamos poder ver la data de la response con esto
      setShowModal(true); //Condición de aparición del modal de verificación
    })
    .catch((error) => {
      //El 400 indica un error en la solicitud
      if (error.response && error.response.status === 400) {
        // Seteo de error de Usuario
        if(error.response.data && error.response.data.username && error.response.data.username[0] === "This field must be unique."){
          setErrorUsername("El nombre de usuario ya está registrado. Por favor, elige otro nombre de usuario.");
        } else {
          setErrorUsername("")
        }
        // Seteo de error de Email
        if (error.response.data && error.response.data.email && error.response.data.email[0] === "This field must be unique."){
          setErrorEmail("El correo electronico ya se encuentra registrado. Por favor, utiliza otro direccion de correo electronico")
        } else {
          setErrorEmail("")
        }
        if (error.response.data && error.response.data.first_name && error.response.data.first_name[0] === "Ensure this field has at least 2 characters."){
          setErrorNombre("El nombre debe tener al menos 2 caracteres")
        } else {
          setErrorNombre("")
        }
        if (error.response.data && error.response.data.last_name && error.response.data.last_name[0] === "Ensure this field has at least 2 characters."){
          setErrorApellido("El apellido debe tener al menos 2 caracteres")
        } else {
          setErrorApellido("")
        }
        if (error.response.data && error.response.data.phone && error.response.data.phone[0] === "Debes introducir un número con el siguiente formato: +999999999. El límite son de 15 dígitos."){
          setErrorTelefono("Debes introducir un número con el siguiente formato: +999999999. El límite son de 15 dígitos.")
        } else {
          setErrorTelefono("")
        }
        if (error.response.data && error.response.data.specialties && error.response.data.specialties[0] === "Expected a list of items but got type \"str\"."){
          setErrorSpecialtes("Debes escoger una especialidad")
        } else {
          setErrorSpecialtes("")
        }
      } else {
        setErrorMsg("Ha Ocurrido un error con el registro")
      }      
      console.error("Error: ", error);
    });
  };

  //Para la verificación del email 

  const [verificationCode, setVerificationCode] = useState('');

  const handleEnviarClick = () => {
    // Obitene el valor del correo electrónico ingresado por el usuario en el formulario
    const userEmail = form.email;

    //Crea un objeto con los datos necesarios
    const requestData = {
      email: userEmail,
      verification_code: verificationCode,
    }

    axios.post('http://149.50.130.111:8000/verify-email/', requestData)
      .then((response) => {
        console.log('Usuario verificado con éxito', response);
        alert('Verificación exitosa');
        setShowModal(false); //Cerramos el modal con esta última instrucción
        navigate(homePageUrl);
      })
      .catch((error) => {
        console.error('Error al verificar el usuario', error);
        alert('hubo un error al enviar la solicitud de verificación')
      })
  }

  
  return (
    <div className="container">
    <div className="row">
      <div className="col-md-6">
        <h2>Registro de Profesional</h2>
        <form onSubmit={manejadorBoton}>
        <div className="mb-3">
            <label htmlFor="nombres" className="form-label">Nombre social</label>
            <input type="text"
            className="form-control" 
            id="username" 
            name="username" 
            onChange={manejadorChange} 
            onClick={handleUsernameInputClick} />
            {showInstructions && (
              <div className="username-instructions">
                <p>El el nombre social debe ser de al menos 2 caracteres</p>
              </div>
            )}
            {errorUsername && <p className="error-message">{errorUsername}</p>} {/* Mostrar mensaje de error de nombre de usuario */}
          </div>
          <div className="mb-3">
            <label htmlFor="nombres" className="form-label">Nombre</label>
            <input type="text" 
            className="form-control" 
            id="first_name" 
            name="first_name" 
            onChange={manejadorChange} 
            onClick={handleNombreInputClick}/>
            {showInstructionsNombre && (
              <div className="nombre-instructions">
                <p>El nombre debe ser de al menos 2 caracteres</p>
              </div>
            )}
            {errorNombre && <p className="error-message">{errorNombre}</p>} {/* Mostrar problemas en el nombre */}
          </div>
          <div className="mb-3">
            <label htmlFor="apellidos" className="form-label">Apellido</label>
            <input type="text" 
            className="form-control" 
            id="last_name" 
            name="last_name" 
            onChange={manejadorChange}
            onClick={handleApellidoInputClick} />
            {showInstructionsApellido && (
              <div className="nombre-instructions">
                <p>El apellido debe ser de al menos 2 caracteres</p>
              </div>
            )}
            {errorApellido && <p className="error-message">{errorApellido}</p>} {/* Mostrar problemas en el nombre */}
          </div>
          <div className="mb-3">
            <label htmlFor="telefono" className="form-label">Teléfono</label>
            <input type="text" 
            className="form-control" 
            id="phone" 
            name="phone" 
            onChange={manejadorChange} 
            onClick={handleTelefonoInputClick}/>
            {showInstructionsTelefono && (
              <div className="phone-instructions">
                <p>El formato de telefono es +56988888888</p>
              </div>
            )}
            {errorTelefono && <p className="error-message">{errorTelefono}</p>} {/* Mostrar mensaje de error por correo electronico usado */}
          </div>
          <div className="mb-3">
            <label htmlFor="correo" className="form-label">Correo Electrónico</label>
            <input type="email" 
            className="form-control" 
            id="email" 
            name="email"
            onChange={manejadorChange} 
            onClick={handleCorreoInputClick} />
            {showInstructionsCorreo && (
              <div className="email-instructions">
                <p>Ingresar una direccion de correo valida como sujetoPrueba@hotmail.com</p>
              </div>
            )}
            {errorEmail && <p className="error-message">{errorEmail}</p>} {/* Mostrar mensaje de error por correo electronico usado */}
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Contraseña</label>
            <input 
            type="password" 
            className="form-control" 
            id="password" 
            name="password" 
            onChange={manejadorChange}
            onClick={handlePasswordInputClick}
            ref={passwordInputRef} //Manejo del click true or false
             />
            {showPasswordRules && (
                <div className="password-rules">
                  <p>La contrasena debe tener los siguientes requisitos:</p>
                  <ul>
                    <li>Debe contener al menos 8 caracteres</li>
                    <li>Debe incluir al menos una letra mayuscula y una minuscula</li>
                    <li>Debe contener al menos un numero</li>
                    <li>Debe contener al menos un caracter especial, como ! @ # $ ?, etc </li>
                  </ul>
                </div>
              )} 
          </div>
          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label">Confirmar Contraseña</label>
            <input type="password" 
            className="form-control" 
            id="confirmPassword" 
            name="password_confirmation"
             onChange={manejadorChange}
             onClick={handlePassConfirmInputClick} />
             {showInstructionsPassConfirm && (
                <div className="password-rules">
                  <p>Las contrasenas deben coincidir entre si</p>
                </div>
              )}
            {errorPasswordMatch && <p className="error-message">{errorPasswordMatch}</p>} {/* Mostrar mensaje de error si las contraseñas no coinciden */}
          </div>
          <div className="mb-3">
              <label htmlFor="city" className="form-label">Ciudad</label>
              <input type="text" 
              className="form-control"
              id="city" 
              name="city" 
              onChange={manejadorChange} 
              onClick={handleCiudadInputClick}/>
              {showInstructionsCiudad && (
                <div className="ciudad-rules">
                  <p>Ingresa el nombre de la ciudad donde resides</p>
                </div>
              )}
            </div>
            {/*En teoria aqui debe ir el dropdown con las especialidades*/}
            <div className="mb-3">
              <label htmlFor="especialidad" className="form-label">
                Especialidad
              </label>
              <select
                className="form-select"
                id="especialidad"
                name="especialidad"
                value={especialidadSeleccionada}
                onChange={manejadorChange}
              >
                <option value="" disabled>
                  Seleccione una especialidad
                </option>
                {especialidades.map((especialidad) => (
                  <option key={especialidad.id} value={especialidad.id}>
                    {especialidad.name}
                  </option>
                ))}
              </select>
              {errorSpecialties && <p className="error-message">{errorSpecialties}</p>} {/* Mostrar erro si no see escoge especialidad*/}
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
            <label className="form-check-label" htmlFor="terminos">
              Acepto los términos y condiciones
              </label>
          </div>
          {!aceptaTerminos && (
            <p className="error-message">
              {errorMsg}
            </p>
          )}
          <div className='captcha'>
          <HCaptcha
              sitekey="48bd55e9-7125-43f7-98d4-cf99a511712d" // Utiliza tu clave de sitio de hCaptcha
              onVerify={handleVerifyCaptcha}
            />
          </div>
          <button type="submit" className="btn btn-primary" >Registrarme</button>
        </form>
        {/*Modal para la verificacón del usuario*/}
        <br />
        <Modal show={showModal} style={{padding: '10px'}} >
          <Modal.Header>
            <Modal.Title>¡Enhorabuena, estás a un paso de terminar tu registro!</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{alignContent: 'center'}}>
            <p>Debes ingresar el código de verificación enviado a tu correo electrónico, recuerda no cerrar esta pestaña</p>
          </Modal.Body>
          <Form style={{display: 'flex', flexDirection: 'column'}}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1" style={{padding: '8px'}}>
              <Form.Label style={{padding: '10px'}}>Código de verificación</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingresa aquí tu código de verificación..."
                  autoFocus
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)} // Manejo de cambios del codigo de verificación
                />
              </Form.Group>
          </Form>
          <Modal.Footer>
            <Button variant="primary" onClick={handleEnviarClick}>
              Enviar
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      <div className="col-md-6 d-flex justify-content-center align-items-center">
        <div className="card">
             <img src={workers} className="card-img-top"  alt="Profesional" />
        </div>
      </div>
    </div>
    <hr className="mt-4 mb-4" />
    <p className="psesion">¿Ya tienes una cuenta? <a href="/LoginC">Iniciar Sesión</a></p>
  </div>
  )
}

export default RegistroP
