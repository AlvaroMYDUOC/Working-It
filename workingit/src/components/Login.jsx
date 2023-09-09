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
from 'mdb-react-ui-kit';
import {BsFacebook} from 'react-icons/bs';
import {FcGoogle} from 'react-icons/fc';
import {FaXTwitter} from 'react-icons/fa6';

function App() {

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
                  <MDBIcon fab icon='twitter' size="sm"/>
                  <h3><FcGoogle /></h3>
                </MDBBtn>

                <MDBBtn tag='a' color='none' className='m-1'>
                  <MDBIcon fab icon='google' size="sm"/>
                  <h3><FaXTwitter /></h3>
                </MDBBtn>

              </div>

              <p className="text-center mt-3">o</p>
            </div>
          <label >Correo electrónico</label>
            <MDBInput wrapperClass='mb-4' label='' id='form1' type='email'/>
            <label >Contraseña</label>
            <MDBInput wrapperClass='mb-4' label='' id='form2' type='password'/>

            <div className="d-flex justify-content-between mx-4 mb-4">
              <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Recordarme' />
              <a href="!#">He olvidado mi contraseña</a>
            </div>

            <MDBBtn className="mb-4 w-100">Ingresar</MDBBtn>
            <p className="text-center">¿Aún no tienes cuenta? </p>
            <p className='text-center'><a href="">Registrate</a></p>

          </MDBTabsPane>


        </MDBTabsContent>
      </MDBRow>
    </MDBContainer>
  );
}

export default App;