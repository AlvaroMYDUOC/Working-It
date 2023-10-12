import React from 'react'
import Navbar2 from "../components/Navbar2"
import FooterD from "../components/FooterD"
import ChatBot from '../components/BotChat'
import Carrusel from '../components/Carrusel'
import { Card } from 'react-bootstrap'

const Home = () => {
  return (
    <>
      <Navbar2 />
      <ChatBot />
      <Carrusel />
      <FooterD />
    </>
  )
}

export default Home
