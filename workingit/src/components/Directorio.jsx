import React, { useState, useEffect } from 'react';
import ProfessionalCard from './ProfesionalCard';
import '../assets/css/Directorio.css';
import FooterD from '../components/FooterD';
import Navbar2 from '../components/Navbar2';

const Directorio = () => {
  const [professionals, setProfessionals] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 4; // Cantidad de tarjetas por página

  useEffect(() => {
    // Realiza una petición a la API para obtener la lista de profesionales
    fetch('http://149.50.130.111:8001/api/profiles/')
      .then((response) => response.json())
      .then((data) => setProfessionals(data));
  }, []);

  // Calcula el índice de inicio y fin para las tarjetas en la página actual
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = professionals.slice(indexOfFirstCard, indexOfLastCard);

  // Función para cambiar a la página anterior
  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Función para cambiar a la página siguiente
  const goToNextPage = () => {
    if (indexOfLastCard < professionals.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <>
      <Navbar2 />
      <div className="directory">
        {/* Muestra las tarjetas de profesionales en la página actual */}
        {currentCards.map((professional) => (
          <ProfessionalCard key={professional.id} professional={professional} />
        ))}
      </div>
      <div className="pagination">
        <button onClick={goToPreviousPage} disabled={currentPage === 1}>
          Anterior
        </button>
        <button onClick={goToNextPage} disabled={indexOfLastCard >= professionals.length}>
          Siguiente
        </button>
      </div>
      <FooterD />
    </>
  );
};

export default Directorio;
