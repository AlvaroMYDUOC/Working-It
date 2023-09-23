import React, { useState } from 'react';
import {
  MDBContainer,
  MDBRow,
  MDBTabsContent,
  MDBTabsPane,
  MDBBtn,
  MDBIcon,
  MDBInput,
  MDBCheckbox
}
//Importe de MDB
from 'mdb-react-ui-kit';
//Importe de iconos desde la libreria React-icons
import {BsFacebook} from 'react-icons/bs';
import {FcGoogle} from 'react-icons/fc';
import {FaXTwitter} from 'react-icons/fa6';
//Importe de css
import '../assets/css/Login.css';
//Importe de Axios
import axios from 'axios';
//Importe de servicios
import { ApiLogin } from '../services/apirest';
import { useNavigate } from 'react-router-dom'

const homePageURL = "/"; //Variable que guarda la pagina de login para la funcion que sigue

function Login() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: "",
        password: ""
      });

      const [error, setError] = useState(false);
      const [errorMsg, setErrorMsg] = useState("");
    
      const manejadorChange = (e) => {
        setForm({
          ...form,
          [e.target.name]: e.target.value
        });
        console.log(form);
      }
      const manejadorBoton = () => {
        let url =  ApiLogin;
        axios.post(url, form)
        .then(response =>{
            console.log(response);
            if(response.data.user && response.data.access_token){
              const accessToken = response.data.access_token;
              // Aqui se almacena el access token traido de la response
              localStorage.setItem('token', accessToken)

              //Configurar axios para incluir el token en las cabeceras de la solicitud
              axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
              //Redirigimos al usuario a la pagina de inicio
              navigate(homePageURL);
              console.log("Redireccion exitosa")
            } else {
              //Entregar el inicio de sesion fallido
              console.log("Inicio de sesion fallido")
              console.log("Redireccion no completada")
            }
        })
        .catch((error) =>{
            setError(true)
            setErrorMsg("Ha ocurrido un error con el inicio de sesion")
        })
      }
    

  const [justifyActive, setJustifyActive] = useState('tab1');;

  const handleJustifyClick = (value) => {
    if (value === justifyActive) {
      return;
    }

    setJustifyActive(value);
  };

  return (
    <MDBContainer className="p-3 my-5 d-flex flex-column w-50">

      <MDBRow className='col-sm-12 col-md-8 col-lg8'>

        <MDBTabsContent>

          <MDBTabsPane show={justifyActive === 'tab1'}>

            <div className="text-center mb-3">
              <h1>Iniciar Sesión</h1>

              <div className='d-flex justify-content-between mx-auto' style={{width: '20%'}}>
                <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                  <h3><BsFacebook /></h3>
                </MDBBtn>

              <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                <MDBIcon  size="sm"/>
                <h3><FcGoogle /></h3>
              </MDBBtn>

              <MDBBtn tag='a' color='none' className='m-1'>
                <MDBIcon  size="sm"/>
                <h3><FaXTwitter /></h3>
              </MDBBtn>

              </div>

            <p className="text-center mt-3">o</p>
          </div>
        <label >Correo electrónico</label>
          <MDBInput wrapperClass='mb-4' label='' id='form1' name="email" type='email' onChange={manejadorChange}/>
          <label >Contraseña</label>
          <MDBInput wrapperClass='mb-4' label='' id='form2' name="password" type='password' onChange={manejadorChange}/>

            <div className="d-flex justify-content-between mx-4 mb-4">
              <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Recordarme' />
              <a href="!#">He olvidado mi contraseña</a>
            </div>

          <MDBBtn className="mb-4 w-100" onClick={manejadorBoton}>Ingresar</MDBBtn>
          <p className="text-center">¿Aún no tienes cuenta? </p>
          <p className='text-center'><a href="">Registrate</a></p>

          </MDBTabsPane>


        </MDBTabsContent>
      </MDBRow>
    </MDBContainer>
  );
}

export default Login;