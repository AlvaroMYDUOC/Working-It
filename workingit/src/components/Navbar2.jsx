import React, {useState, useEffect} from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas'
import axios from 'axios';
import logoBlue from '../assets/img/logoBlue.png'



function Navbar2() {
  //Validacion para ver si el token aun se encuentra activo
  const [isTokenValid, setIsTokenValid] = useState(false); // Nuevo estado para almacenar el resultado de la validación del token

  useEffect(() => {
    const accessToken = localStorage.getItem('token');

    if (accessToken) {
      setAccessTokenExists(true);

      //Realizar una solicitud para validar el token
      axios
        .post(
          'http://149.50.130.111:8000/validate-token/' ,
          {},
          {
          headers: {
            Authorization: "Bearer " + accessToken, //Aqui se incluye el token en las cabeceras
          },
        }
      )
        .then((response) =>{
          //El token es valido
          setIsTokenValid(true);
          //console.log("El token es valido")
        })
        .catch((error) => {
          //El token no es valido
          setIsTokenValid(false);
          console.error('Error al validar el token: ', error)
          if (
            error.response &&
            error.response.data &&
            error.response.data.detail === 'Given token not valid for any token type' &&
            error.response.data.code === 'token_not_valid'
          ) {
            //Borra los objetos del localStorage si el token no es valido
            localStorage.removeItem('token');
            localStorage.removeItem('usuario');
            //Redireecciona al usuario a la pagina de inicio de sesion
            window.location.href = 'Login'
            return;
          }
        });
    }
  }, []);

    //Ahora vamos a conseguir el is_professional del localStorage
  const usuarioJSON = localStorage.getItem('usuario'); //Almacenamos en una constante local el item almacenado en el localStorage
  const usuario = usuarioJSON ? JSON.parse(usuarioJSON): null; // Convertimos el valor de JSON a un objeto de JavaScript y en caso de que no exista usuario se asigna el valor null

  //Revisaremos por consola si is_professional es true o false
  if(usuario == null){
    //console.log('No hay usuario conectado') //Si el usuario queda como null entrega este mensaje en la consola.
  } else{
    //console.log('is_professional: ', usuario.is_professional);
  }

  //Funcion para el logout
  function handleLogout(){
    localStorage.removeItem('token') // Eliminamos el token del local storage para que el Navbar deje de entender que hay un usuario ingreado
    localStorage.removeItem('usuario') // Al Cerrar sesion eliminamos los datos del usuario
    localStorage.removeItem('id_profesional') // Al cerrar la sesión nos aseguramos de eliminar también el objeto del localStorage
    window.location.href = '/' //Redireccion a la carpeta raiz para poder reiniciar el Navbar
  }
  
  const [categories, setCategories] = useState([]);
  //Seteamos en un inicio que el accessToken no existe
  const [accessTokenExists, setAccessTokenExists] = useState(false);

useEffect(() => {
  axios.get('http://149.50.130.111:8000/especialistas/')
    .then((response) => {
      setCategories(response.data.results);
      //console.log(response);
    })
    .catch((error) => {
      console.error('Error al obtener las categorías:', error);
    });
    //Aqui hacemos que accessToken tome lo que esta en el localStorage
    const accessToken = localStorage.getItem('token');
    //Ahora condicionamos, de que si hay algo, cambiamos el valor de setAccessTokenExists a true
    if (accessToken) {
      setAccessTokenExists(true);
    }

}, []);

  return (
    <>
      {['lg'].map((expand) => (
        <Navbar key={expand} expand={expand} className="bg-body-tertiary mb-3 blue-navbar">
          <Container fluid >
            <Navbar.Brand href="#home">
                <img
                alt=""
                src={logoBlue}
                width="30"
                height="30"
                className="d-inline-block align-top"
                />
            </Navbar.Brand>
            <Navbar.Brand href="/"
            style={{color: '#2e1b72', fontFamily: 'Chewy, cursive'}}>Working It</Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  Menú
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                <NavDropdown
                  title="Categorías"
                  id={`offcanvasNavbarDropdown-expand-${expand}`}
                  > 

                  {categories.map((category) => (
                    <NavDropdown.Item key={category.id} href={`#${category.id}`}>
                      {category.name}
                    </NavDropdown.Item>
                  ))}
                </NavDropdown>
                {/* En esta parte condicionamos a que si el token tiene valor true, mostramos crear proyecto y si no, se muestra el resto del navbar*/}
                {accessTokenExists ? (
                  //Menu si hay un token
                  usuario.is_professional ? (
                    //Menu si is_professional es true
                  <>  
                    <Nav.Link href="#">Asesorias asignadas</Nav.Link>            
                    <Nav.Link href="/DirectorioProyectos">Directorio de proyectos</Nav.Link>
                    <Nav.Link href="#">Mensajes</Nav.Link>
                    <Nav.Link href="/MiPerfil">Mi Perfil</Nav.Link>
                    <Nav.Link onClick={handleLogout}>Cerrar sesion</Nav.Link>              
                  </>         
                  ) : (
                    //Menu si is_professional es false         
                    <>
                    <Nav.Link href="/DirectorioProfesionistas">Directorio de profesionistas</Nav.Link>            
                    <Nav.Link href="/MisProyectos">Mis Proyectos</Nav.Link>
                    <Nav.Link href="/ChatProfesional">Mensajes</Nav.Link>
                    <Nav.Link onClick={handleLogout}>Cerrar sesion</Nav.Link>
                    </>
                  )
                ) : (
                  //Menu si es que no hay usuario conectado
                  <>
                  {/*Esto se muestra si es que el token no esta activo*/}
                  <Nav.Link href="#action1">Solicita una asesoría</Nav.Link>
                  <Nav.Link href="#action1">¿Eres un especialista?</Nav.Link>
                  <Nav.Link href="/RegistroInicio">Crea tu cuenta</Nav.Link>
                  <Nav.Link href="/Login">Ingresar</Nav.Link>
                  </>
                )}
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  );
}

export default Navbar2;