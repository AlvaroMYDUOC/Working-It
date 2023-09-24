import React from 'react'
import Navbar2 from "../components/Navbar2"
import Footer from "../components/Footer"
import ChatBot from '../components/BotChat'
import Carrusel from '../components/Carrusel'
import Buscador from '../components/Buscador'
import DataTable from '../components/DataTable'

const Home = () => {
  return (
    <>
      <Navbar2 />
      <ChatBot />
      <DataTable />
      <Footer />
    </>
  )
}

export default Home
