import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import Offcanvas from 'react-bootstrap/Offcanvas';
import axios from 'axios';
import { IoNotificationsSharp } from 'react-icons/io5';
import logoBlue from '../assets/img/logoBlue.png';

function Navbar2() {
  const [isTokenValid, setIsTokenValid] = useState(false);
  const [accessTokenExists, setAccessTokenExists] = useState(false);
  const [showNotificationsPopover, setShowNotificationsPopover] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const accessToken = localStorage.getItem('token');

    if (accessToken) {
      setAccessTokenExists(true);

      axios
        .post('http://149.50.130.111:8000/validate-token/', {}, {
          headers: {
            Authorization: "Bearer " + accessToken,
          },
        })
        .then((response) => {
          setIsTokenValid(true);
        })
        .catch((error) => {
          setIsTokenValid(false);
          console.error('Error al validar el token: ', error);
          if (
            error.response &&
            error.response.data &&
            error.response.data.detail === 'Given token not valid for any token type' &&
            error.response.data.code === 'token_not_valid'
          ) {
            localStorage.removeItem('token');
            localStorage.removeItem('usuario');
            window.location.href = 'Login';
            return;
          }
        });
    }
  }, []);

  const usuarioJSON = localStorage.getItem('usuario');
  const usuario = usuarioJSON ? JSON.parse(usuarioJSON) : null;

  if (usuario == null) {
    // console.log('No hay usuario conectado');
  } else {
    // console.log('is_professional: ', usuario.is_professional);
  }

  function handleLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('id_profesional');
    window.location.href = '/';
  }

  useEffect(() => {
    axios.get('http://149.50.130.111:8000/especialistas/')
      .then((response) => {
        setCategories(response.data.results);
      })
      .catch((error) => {
        console.error('Error al obtener las categorías:', error);
      });

    const accessToken = localStorage.getItem('token');
    if (accessToken) {
      setAccessTokenExists(true);
    }
  }, []);

  return (
    <>
      {['lg'].map((expand) => (
        <Navbar key={expand} expand={expand} className="bg-body-tertiary mb-3 blue-navbar">
          <Container fluid>
            <Navbar.Brand href="#">
              <img
                alt=""
                src={logoBlue}
                width="30"
                height="30"
                className="d-inline-block align-top"
              />
            </Navbar.Brand>
            <Navbar.Brand href="/" style={{ color: '#2e1b72', fontFamily: 'Chewy, cursive' }}>
              Working It
            </Navbar.Brand>
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
                  {/*Dropdown comentado hasta que le agregemos lógica*/}
                  {/*
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
                  */}

                  {/* Esta parte del codigo estará conectada hasta que le agregemos lógica
                  <OverlayTrigger
                    show={showNotificationsPopover}
                    trigger="click"
                    placement="bottom"
                    overlay={
                      <Popover id="popover-notifications" style={{ zIndex: '1001' }}>
                        <Popover.Header as="h3">Notificaciones</Popover.Header>
                        <Popover.Body>
                        </Popover.Body>
                      </Popover>
                    }
                    transition={false}
                  >
                    <Nav.Link
                      className="notifications-button"
                      onClick={() => setShowNotificationsPopover(!showNotificationsPopover)}
                    >
                      <IoNotificationsSharp />
                    </Nav.Link>
                  </OverlayTrigger> */}
                  
                  {accessTokenExists ? (
                    usuario.is_professional ? (
                      <>
                        <Nav.Link href="/AsesoriasProfesional">Asesorias asignadas</Nav.Link>
                        <Nav.Link href="/DirectorioProyectos">Directorio de proyectos</Nav.Link>
                        <Nav.Link href="/ChatProfesional">Mensajes</Nav.Link>
                        <Nav.Link href="/MiPerfil">Mi Perfil</Nav.Link>
                        <Nav.Link onClick={handleLogout}>Cerrar sesion</Nav.Link>
                      </>
                    ) : (
                      <>
                        <Nav.Link href="/DirectorioProfesionistas">Directorio de profesionistas</Nav.Link>
                        <Nav.Link href="/MisProyectos">Mis Proyectos</Nav.Link>
                        <Nav.Link href="/ChatProfesional">Mensajes</Nav.Link>
                        <Nav.Link onClick={handleLogout}>Cerrar sesion</Nav.Link>
                      </>
                    )
                  ) : (
                    <>
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