import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../assets/css/Filtro.css';


const FilterComponent = () => {
  const [selectedStars, setSelectedStars] = useState(null);
  const [especialidades, setEspecialidades] = useState([]);

  useEffect(() => {
    // Realizar la solicitud para cargar las especialidades desde la API
    axios
      .get('http://149.50.130.111:8000/especialidades/')
      .then((response) => {
        // Extraer las especialidades de la respuesta y guardarlas en el estado
        setEspecialidades(response.data);
      })
      .catch((error) => {
        console.error('Error al cargar las especialidades:', error);
      });
  }, []);

  const handleStarsChange = (star) => {
    setSelectedStars(star);
  };

  return (
    <div className="filter-container">
      <div className="filter-section">
        <h2>Especialidad</h2>
        <ul>
          {especialidades.length > 0 ? (
            especialidades.map((especialidad) => (
              <li key={especialidad.id}>{especialidad.name}</li>
            ))
          ) : (
            <li>No hay especialidades disponibles</li>
          )}
        </ul>
      </div>
      <div className="filter-section">
        <h2>Estrellas</h2>
        <div className="star-filter">
          {[1, 2, 3, 4, 5].map((star) => (
            <label key={star}>
              <input
                type="radio"
                name="star-filter"
                value={star}
                checked={selectedStars === star}
                onChange={() => handleStarsChange(star)}
              />
              {'★'.repeat(star)}
            </label>
          ))}
        </div>
      </div>
      <div className="filter-section">
        <h2>Sello de Garantía</h2>
        {/* ... (opciones de sello de garantía) */}
      </div>
    </div>
  );
};

export default FilterComponent;