import React from 'react'
import Navbar2 from "../components/Navbar2"
import Footer from "../components/Footer"
import ChatBot from '../components/BotChat'
import Carrusel from '../components/Carrusel'
import Buscador from '../components/Buscador'

const Home = () => {
  return (
    <>
      <Navbar2 />
      <ChatBot />
      <Buscador />
      <Carrusel />
      <Footer />
    </>
  )
}

export default Home
