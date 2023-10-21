import React from 'react';
import '../assets/css/CardProyecto.css'


function ProjectCard({ project }) {
  return (
    <div className="project-card">
      <div className="project-card-image">
        {project.photos.length > 0 && (
          <img src={project.photos[0].photo} alt={project.name} />
        )}
      </div>
      <div className="project-card-details">
        <h3>{project.name}</h3>
        <p>{project.description}</p>
        <div className="mini-card">
          <p>Tipo de Casa: {project.type}</p>
          <p>Ubicación: {project.location}</p>
          <p>Metros Cuadrados: {project.mt2} m²</p>
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;
