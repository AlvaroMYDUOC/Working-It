import React from 'react';
//css
import '../assets/css/Proyectos.css'


const Projects = () => {
// lista de proyectos
  const projects = [
    { id: 1, name: 'Proyecto 1', type: 'Tipo 1', state: 'Publicado', date: 'Fecha 1', quotes: 5 },
    { id: 2, name: 'Proyecto 2', type: 'Tipo 4', state: 'Estado 1', date: 'Fecha 1', quotes: 5 },
    { id: 3, name: 'Proyecto 3', type: 'Tipo 5', state: 'Estado 1', date: 'Fecha 1', quotes: 5 },
    { id: 3, name: 'Proyecto 3', type: 'Tipo 5', state: 'Estado 1', date: 'Fecha 1', quotes: 5 },
    { id: 3, name: 'Proyecto 3', type: 'Tipo 5', state: 'Estado 1', date: 'Fecha 1', quotes: 5 }
    // Agrega más proyectos aquí
  ];

  // Paginación
  const itemsPerPage = 6; // Número de proyectos por página
  const totalPages = Math.ceil(projects.length / itemsPerPage);

  // Estado para controlar la página actual
  const [currentPage, setCurrentPage] = React.useState(1);

  // Función para cambiar la página actual
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Calcula el índice de inicio y fin de la lista de proyectos
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Filtra los proyectos según la página actual
  const displayedProjects = projects.slice(startIndex, endIndex);

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center">
        <div>
          <a href="/">Inicio</a>
          <h2>Mis Proyectos</h2>
        </div>
        <button className="btn btn-primary">Nuevo Proyecto</button>
      </div>
      <table className="table mt-3">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Tipo</th>
            <th>Estado</th>
            <th>Fecha de Publicación</th>
            <th>Cotizaciones</th>
            <th>Detalle</th>
          </tr>
        </thead>
        <tbody>
          {displayedProjects.map((project) => (
            <tr key={project.id}>
              <td>{project.name}</td>
              <td>{project.type}</td>
              <td>{project.state}</td>
              <td>{project.date}</td>
              <td>{project.quotes}</td>
              <td><a href={`/project/${project.id}`}>Ver Detalle</a></td>
            </tr>
          ))}
        </tbody>
      </table>
      <nav aria-label="Paginación">
        <ul className="pagination">
          {Array.from({ length: totalPages }).map((_, index) => (
            <li
              key={index}
              className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}
            >
              <button
                className="page-link"
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export default Projects;
