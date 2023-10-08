import React, { useState } from 'react';
import Breadcrumb from 'react-bootstrap/Breadcrumb';

function BreadcrumbExample() {
  // Usamos el estado local para mantener un registro de las páginas visitadas.
  const [pageHistory, setPageHistory] = useState([]);
  // Utilizamos una variable para almacenar la página actual.
  const currentPage = "Data";

  // Función para agregar una página al historial.
  const addToHistory = (label, href) => {
    const updatedHistory = [...pageHistory, { label, href }];
    setPageHistory(updatedHistory);
  };

  // Función para retroceder a una página anterior.
  const goBack = (index) => {
    const updatedHistory = pageHistory.slice(0, index + 1);
    setPageHistory(updatedHistory);
  };

  return (
    <Breadcrumb>
      {/* Muestra la página actual utilizando la variable currentPage */}
      <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
      <Breadcrumb.Item active>{currentPage}</Breadcrumb.Item>
      {pageHistory.map((page, index) => (
        <Breadcrumb.Item key={index} onClick={() => goBack(index)}>
          {page.label}
        </Breadcrumb.Item>
      ))}

    </Breadcrumb>
  );
}

export default BreadcrumbExample;
