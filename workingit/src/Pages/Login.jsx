import React from 'react'
import LoginC from '../components/LoginC'
import Navbar2 from '../components/Navbar2'
import FooterD from '../components/FooterD'
import { Card, Container, Row, Col } from 'react-bootstrap'

const Login = () => {
  return (
    <>
      <Navbar2 />
      <Container className="login-container">
        <Row className="justify-content-center">
          <Col md={16}>
            <Card>
              <Card.Body>
                <LoginC />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <hr/>
      <FooterD />
    </>
  )
}

export default Login
