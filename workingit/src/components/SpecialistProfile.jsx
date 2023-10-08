import React, { Component } from 'react';
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBBtn, MDBTypography } from 'mdb-react-ui-kit';
import Carrusel from './CarruselPerfil';
import '../assets/css/SpecialistProfile.css';
import { BsStarFill } from 'react-icons/bs';
import axios from 'axios';
import fotoDefault from '../assets/img/defaultProfile.jpg'

export class SpecialistProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userProfile: null,
      loading: true,
      error: null,
    };
  }

  componentDidMount() {
    const userData = JSON.parse(localStorage.getItem('usuario'))
    const userProfId = userData.professional_id;
    const apiUrl = `http://149.50.130.111:8001/api/profiles/` + userProfId;

    axios
      .get(apiUrl)
      .then((response) => {
        this.setState({
          userProfile: response.data,
          loading: false,
        });
        console.log(response.data)

        //Aqui extraemos los datos para el perfil de usuario
        const {first_name, last_name, specialties, about_me, professional_photo} = response.data;
        this.setState({
          firstName: first_name,
          lastName: last_name,
          specialties: specialties,
          aboutMe: about_me,
          photoP: professional_photo,
        });
        console.log('Valor de specialties: ', specialties)
      //Realizar una solicitud adicional para obtener el tipo de especialidad
        if (specialties && specialties.length > 0) {
          const specialtiesEndpoint = 'http://149.50.130.111:8000/especialistas/'
          const specialtyIds = specialties; // Suponiendo que specialties es un array de IDs


          axios
            .get(specialtiesEndpoint)
            .then((specialtyResponse) => {
              //Specialty response.data contiene la lista de especialidades
              const specialtiesList = specialtyResponse.data.results;

              // Mapear los IDs de especialidades a los nombres correspondientes
              const specialtyNames = specialtyIds.map((specialtyId) => {
                const matchingSpecialty = specialtiesList.find((s) => s.id === specialtyId);
                return matchingSpecialty ? matchingSpecialty.name : 'Especialidad no encontrada';
              });

              // Combina los nombres de especialidades en una cadena o array, según tus necesidades
              const specialtyNamesCombined = specialtyNames.join(', '); // Combina en una cadena separada por comas

              // Asignar el nombre de la especialidad al estado
              this.setState({ specialtyType: specialtyNamesCombined });
              console.log('Valor de specialtyType: ', this.state.specialtyType);
            })
            .catch((error) => {
              console.error('Error al obtener el tipo de especialidad:', error);
            });
          }
        })
      .catch((error) => {
        this.setState({
          error: error.message,
          loading: false,
          userData: null
        });
      });
  }
  render() {
    const { userProfile, loading, error } = this.state;
    const aboutMeText = this.state.aboutMe ? this.state.aboutMe : "Aun no se ha brindado información de este profesional";
    const photoPerfil = this.state.photoP ? this.state.photoP : fotoDefault;

    return (
        <div className="gradient-custom-2" style={{ backgroundColor: '#9de2ff' }}>
          <MDBContainer className="py-5 h-100">
            <MDBRow className="justify-content-center align-items-center h-100">
              <MDBCol lg="9" xl="7">
                <MDBCard>
                  <div className="rounded-top text-white d-flex flex-row" style={{ backgroundColor: '#000', height: '200px' }}>
                    <div className="ms-4 mt-5 d-flex flex-column" style={{ width: '150px' }}>
                      <MDBCardImage src={photoPerfil}
                        alt="Generic placeholder image" 
                        className="mt-4 mb-2 img-thumbnail rounded-circle" 
                        fluid style={{ width: '150px', zIndex: '1' }} />
                      <MDBBtn outline color="light" style={{height: '36px', overflow: 'visible'}}>
                        Edit profile
                      </MDBBtn>
                    </div>
                    <div className="ms-3" style={{ marginTop: '130px' ,color: 'white'}}>
                      <MDBTypography tag="h5">{this.state.firstName} {this.state.lastName}</MDBTypography>
                      <MDBCardText style={{ color: 'white' }}>{this.state.specialtyType}</MDBCardText>
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
                        <MDBCardText className="font-italic mb-1">{aboutMeText}</MDBCardText>
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