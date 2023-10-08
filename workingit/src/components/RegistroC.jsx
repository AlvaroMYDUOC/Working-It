import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import cliente2 from '../assets/img/cliente2.jpg';
import '../assets/css/RegistroC.css';
import { ApiRegistro } from '../services/apirest';
import { useNavigate } from 'react-router-dom';


const RegistroC = () => {
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
  
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////  
  //Mostrar instrucciones de apellido
  const [showInstructionsApellido, setShowInstructionsApellido] = useState(false);

  const handleApellidoInputClick = () => {
    setShowInstructionsApellido(true);
  };
  
  const handleClickOutsideInstructionsApellido = (e) => {
    if (!e.target.closest("#last_name")) {
      // Si se hace clic fuera del campo de apellido, ocultar las instrucciones
      setShowInstructionsApellido(false);
      console.log('Valor de SetShowInstructionsApellido: ', showInstructionsApellido)
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
  
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////  
  // Mostrar instrucciones en usuario
  const [showInstructions, setShowInstructions] = useState(false);

  const handleUsernameInputClick = () => {
    setShowInstructions(true);
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
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////

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
    setShowPasswordRules(true);
  }

  //Manejador el clic afuera para el usuario
  const handleClickOutsideInstructions = (e) => {
    if (!e.target.closest("#username")) {
      // Si se hace clic fuera del campo de usuario, ocultar las instrucciones
      setShowInstructions(false);
    }
  };

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

  //Constante para redireccion
  const navigate = useNavigate();
  const homePageUrl = "/";

  //Constantes para tener los mensajes de error
  const [error,setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

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
            "is_professional": false
  });

  //Funcion para ver si los campos estan llenando la info correctamente (hay que matchear la id)
  const manejadorChange = (e) => {
    if (e.target.name === "aceptaTerminos"){
      setAceptaTerminos(e.target.checked);
    } else {
      setForm({
        ...form,
        [e.target.name]: e.target.value
      });
    }
    console.log(form);
  };

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
  
  //Verifica si las contras coinciden
  if(!validatePasswordMatch()){
    return; //Detiene el envio si las contrasenas con coinciden
  }
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
  form.is_professional = false;

  //Funcion que enviara y avisara si la request es correcta
  let url = ApiRegistro;
  console.log("Datos a enviar: ", form); //Necesito visualizar los datos antes de enviarlos
  axios.post(url, form)
    .then((response) => {
      console.log(response);
      console.log(response.data); //Esperamos poder ver la data de la response con esto
      navigate(homePageUrl); //Redireccion post registro exitoso
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
      } else {
        setErrorMsg("Ha Ocurrido un error con el registro")
      }      
      console.error("Error: ", error);
      });
  };
  //Manejador del checkbox
  const [aceptaTerminos, setAceptaTerminos] = useState(false);



  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <h2>Registro de Cliente</h2>
          <form onSubmit={manejadorBoton}>
          <div className="mb-3">
              <label htmlFor="apellidos" className="form-label">Nombre Social</label>
              <input type="text" 
              className="form-control" 
              id="username" 
              name="username" 
              onChange={manejadorChange}
              onClick={handleUsernameInputClick}/>
              {showInstructions && (
                <div className="username-instructions">
                  <p>El nombre social debe ser de al menos 2 caracteres</p>
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
                <div className="apellido-instructions">
                  <p>El apellido debe tener un minimo de 2 caracteres</p>
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
              onClick={handleCorreoInputClick}/>
              {showInstructionsCorreo && (
              <div className="email-instructions">
                <p>Ingresar una direccion de correo valida como sujetoPrueba@hotmail.com</p>
              </div>
              )}
              {errorEmail && <p className="error-message">{errorEmail}</p>} {/* Mostrar mensaje de error por correo electronico usado */}
            </div>
            {/*Esta es la parte de la contrasena, aqui hay varias cosas interesantes respecto a funciones*/}
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Contraseña</label>
              <input 
              type="password" 
              className="form-control" 
              id="password" 
              name="password" 
              onChange={manejadorChange}
              onClick={handlePasswordInputClick}
              ref={passwordInputRef} //Manejar el clic en true o false
              />
              {/* Mostrar reglas de construccion de contrasena cuando se hace clic en el campo*/}
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
              onClick={handlePassConfirmInputClick}/>
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
              onClick={handleCiudadInputClick} />
              {showInstructionsCiudad && (
                <div className="ciudad-rules">
                  <p>Ingresa el nombre de la ciudad donde resides</p>
                </div>
              )}
            </div>
           {/* Pondremos un manejador para que si el checkbox no esta tickeado, no se pueda registrar */}
            <div className="mb-3 form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="terminos"
                name="aceptaTerminos"
                checked={aceptaTerminos}
                onChange={manejadorChange}/>
              <label className="form-check-label" htmlFor="terminos">Acepto los términos y condiciones</label>
            </div>

            <button type="submit" className="btn btn-primary" disabled={!aceptaTerminos}>Registrarme</button>
          </form>
        </div>
        <div className="col-md-6 d-flex justify-content-center align-items-center">
          <div className="card">
            <img src={cliente2} className="card-img-top" alt="Cliente" />
          </div>
        </div>
      </div>
      <hr className="mt-4 mb-4" />
      <p className="psesion">¿Ya tienes una cuenta? <a href="/LoginC">Iniciar Sesión</a></p>
    </div>
  );
};

export default RegistroC;