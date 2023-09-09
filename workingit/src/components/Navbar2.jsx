import React, {useState, useEffect} from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas'
import axios from 'axios';


function Navbar2() {
  const [categories, setCategories] = useState([]);

useEffect(() => {
  axios.get('http://149.50.130.111:8000/specialties/')
    .then((response) => {
      setCategories(response.data.results);
      console.log(response);
    })
    .catch((error) => {
      console.error('Error al obtener las categorías:', error);
    });
}, []);

  return (
    <>
      {['lg'].map((expand) => (
        <Navbar key={expand} expand={expand} className="bg-body-tertiary mb-3">
          <Container fluid>
            <Navbar.Brand href="#home">
                <img
                alt=""
                src="./assets/img/icon.png"
                width="30"
                height="30"
                className="d-inline-block align-top"
                />
            </Navbar.Brand>
            <Navbar.Brand href="#">Working It</Navbar.Brand>
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
                {/* Esta sección es el dropdown que traerá las categorías de los profesionistas */}
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
                  <Nav.Link href="#action1">Solicita una asesoría</Nav.Link>
                  <Nav.Link href="#action1">¿Eres un especialista?</Nav.Link>
                  <Nav.Link href="#action2">Crea tu cuenta</Nav.Link>
                  <Nav.Link href="#action2">Ingresar</Nav.Link>
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