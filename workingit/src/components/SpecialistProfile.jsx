import React, { useState, useEffect } from 'react';
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBBtn, MDBTypography } from 'mdb-react-ui-kit';
import Carrusel from './CarruselPerfil';
import '../assets/css/SpecialistProfile.css';
import { BsStarFill } from 'react-icons/bs';
import axios from 'axios';
import fotoDefault from '../assets/img/defaultProfile.jpg';
import EditModal from './editModal.jsx';

const SpecialistProfile = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [specialtyType, setSpecialtyType] = useState('');
  const [aboutMe, setAboutMe] = useState('');
  const [photoP, setPhotoP] = useState(fotoDefault);
  const photoPerfil = photoP || fotoDefault; // Si PhotoP es null, te trae la imagen que corresponde
  const datosUsuario = JSON.parse(localStorage.getItem('usuario'));
  const esProfesional = datosUsuario.is_professional



  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('usuario'));

    if (userData) {
      const isProfessional = userData.is_professional;
      const professionalId = isProfessional ? userData.professional_id : localStorage.getItem('id_profesional');
      console.log('professionalId = ', professionalId)

      if (professionalId) {
        let apiUrl = '';

        if(isProfessional === false){
          const profesionalAjeno = JSON.parse(professionalId)
          const {id_profesional} = profesionalAjeno;
          apiUrl = `http://149.50.130.111:8001/api/profiles/` + id_profesional;
          console.log('El usuario no es profesional ', apiUrl)

        } else {
          apiUrl = `http://149.50.130.111:8001/api/profiles/` + professionalId;
          console.log('El usuario  es profesional ',apiUrl)
        }
        

        axios
          .get(apiUrl, { withCredentials: true })
          .then((response) => {
            setUserProfile(response.data);
            setLoading(false);

            const { first_name, last_name, specialties, about_me, professional_photo } = response.data;
            setFirstName(first_name);
            setLastName(last_name);
            setAboutMe(about_me);
            setPhotoP(professional_photo);

            if (specialties && specialties.length > 0) {
              const specialtiesEndpoint = 'http://149.50.130.111:8000/especialistas/';
              const specialtyIds = specialties;

              axios
                .get(specialtiesEndpoint)
                .then((specialtyResponse) => {
                  const specialtiesList = specialtyResponse.data.results;

                  const specialtyNames = specialtyIds.map((specialtyId) => {
                    const matchingSpecialty = specialtiesList.find((s) => s.id === specialtyId);
                    return matchingSpecialty ? matchingSpecialty.name : 'Especialidad no encontrada';
                  });

                  const specialtyNamesCombined = specialtyNames.join(', ');
                  setSpecialtyType(specialtyNamesCombined);
                })
                .catch((error) => {
                  console.error('Error al obtener el tipo de especialidad:', error);
                });
            }
          })
          .catch((error) => {
            setError(error.message);
            setLoading(false);
          });
      } else {
        setError('No se encontró el ID del profesional en el almacenamiento local.');
        setLoading(false);
      }
    } else {
      setError('No se encontró información de usuario en el almacenamiento local.');
      setLoading(false);
    }
  }, []);

  const aboutMeText = aboutMe ? aboutMe : "Aun no se ha brindado información de este profesional";

  return (
    <div className="gradient-custom-2" style={{ backgroundColor: '#9de2ff' }}>
      <MDBContainer className="py-5 h-100">
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol lg="9" xl="7">
            <MDBCard>
              <div className="rounded-top text-white d-flex flex-row" style={{ backgroundColor: '#89acf7', height: '200px' }}>
                <div className="ms-4 mt-5 d-flex flex-column" style={{ width: '150px' }}>
                  <MDBCardImage
                    src={photoPerfil} //Utiliza la imagen anteriormente mencionada
                    alt="Imagen de perfil genérica"
                    className="mt-4 mb-2 img-thumbnail rounded-circle"
                    fluid
                    style={{ width: '150px', zIndex: '1' }}
                  />
                </div>
                <div className="ms-3" style={{ marginTop: '130px', color: 'white' }}>
                  <MDBTypography tag="h5">{firstName} {lastName}</MDBTypography>
                  <MDBCardText style={{ color: 'white' }}>{specialtyType}</MDBCardText>
                </div>
              </div>
              <div className="p-4 text-black" style={{ backgroundColor: '#f8f9fa' }}>
                <div className="d-flex justify-content-start align-items-center py-1" style={{ width: '75px' }}>
                  {/* Aquí irán las valoraciones que el profesionista ya tenga */}
                </div>
                <div className="Supercontenedor" style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gridGap: '10px' }}>
                  <div className="d-flex justify-content-start text-center py-1" style={{ gridColumn: 'span 3', display: 'grid', alignItems: 'center',justifyContent: 'center' }}>
                  <MDBCardText className="small text-muted mb-0">Disponible</MDBCardText>
                  </div>
                  <div className="d-flex justify-content-end text-center py-1" style={{ gridColumn: 'span 3' }}>
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
                  <MDBCardText className="mb-0"><a href="#!" className="text-muted">Mostrar todos</a></MDBCardText>
                </div>
                <MDBRow>
                  <Carrusel />
                </MDBRow>
              </MDBCardBody>
              {esProfesional &&(<EditModal/>
)}
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
};

export default SpecialistProfile;
