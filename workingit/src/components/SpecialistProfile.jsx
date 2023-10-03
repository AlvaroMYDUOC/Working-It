import React, { Component } from 'react'
import Navbar2 from '../components/Navbar2'
import Footer from '../components/Footer'
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBBtn, MDBTypography} from 'mdb-react-ui-kit';
import Carrusel from './CarruselPerfil'
import '../assets/css/SpecialistProfile.css';
import {BsStarFill} from 'react-icons/bs';




export class SpecialistProfile extends Component {
  render() {
    return (
        <div className="gradient-custom-2" style={{ backgroundColor: '#9de2ff' }}>
          <MDBContainer className="py-5 h-100">
            <MDBRow className="justify-content-center align-items-center h-100">
              <MDBCol lg="9" xl="7">
                <MDBCard>
                  <div className="rounded-top text-white d-flex flex-row" style={{ backgroundColor: '#000', height: '200px' }}>
                    <div className="ms-4 mt-5 d-flex flex-column" style={{ width: '150px' }}>
                      <MDBCardImage src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp"
                        alt="Generic placeholder image" className="mt-4 mb-2 img-thumbnail rounded-circle" fluid style={{ width: '150px', zIndex: '1' }} />
                      <MDBBtn outline color="light" style={{height: '36px', overflow: 'visible'}}>
                        Edit profile
                      </MDBBtn>
                    </div>
                    <div className="ms-3" style={{ marginTop: '130px' }}>
                      <MDBTypography tag="h5">Roberto Manfinfla</MDBTypography>
                      <MDBCardText>Valparaíso</MDBCardText>
                    </div>
                  </div>
                  <div className="p-4 text-black" style={{ backgroundColor: '#f8f9fa' }}>
                  {/*Aqui iran las valoraciones que el profesionista ya tenga*/}
                  <div className="d-flex justify-content-start align-items-center py-1" style={{width: '75px'}}>
                  </div>
                    <div className="d-flex justify-content-end text-center py-1">
                      <div>
                        <MDBCardText className="mb-1 h5">5+</MDBCardText>
                        <MDBCardText className="small text-muted mb-0">Años trabajando</MDBCardText>
                      </div>
                      <div className="px-3">
                        <MDBCardText className="mb-1 h5"><BsStarFill /><BsStarFill /><BsStarFill /><BsStarFill /><BsStarFill /></MDBCardText>
                        <MDBCardText className="small text-muted mb-0">Valoracion</MDBCardText>
                      </div>
                      <div>
                        <MDBCardText className="mb-1 h5">3 años</MDBCardText>
                        <MDBCardText className="small text-muted mb-0">Miembro desde</MDBCardText>
                      </div>
                    </div>
                  </div>
                  <MDBCardBody className="text-black p-4">
                    <div className="mb-5">
                      <p className="lead fw-normal mb-1">Sobre mí</p>
                      <div className="p-4" style={{ backgroundColor: '#f8f9fa' }}>
                        <MDBCardText className="font-italic mb-1">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</MDBCardText>
                      </div>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <MDBCardText className="lead fw-normal mb-0">Trabajos Recientes</MDBCardText>
                      <MDBCardText className="mb-0"><a href="#!" className="text-muted">Show all</a></MDBCardText>
                    </div>
                    <MDBRow>
                      <Carrusel />
                    </MDBRow>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </div>
      );
    }
}
export default SpecialistProfile