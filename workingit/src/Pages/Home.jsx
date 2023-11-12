import React from 'react'
import Navbar2 from "../components/Navbar2"
import FooterD from "../components/FooterD"
import ChatBot from '../components/BotChat'
import CarruselPerfil from '../components/CarruselPerfil'
import { Card } from 'react-bootstrap'
import AboutSection from '../components/Sobre'
import Info from '../components/Info'

const Home = () => {
  return (
    <>
      <Navbar2 />
      <Info />
      <ChatBot />
      <div className='WholePageContainer'>
      <div style={{padding: '80px'}}>
      <h1 style={{textAlign: 'center'}}>Algunos de los proyectos llevados a cabo</h1>
      <CarruselPerfil />
      </div>
      </div>
      <AboutSection />
      <hr/>
      <FooterD />
    </>
  )
}

export default Home
