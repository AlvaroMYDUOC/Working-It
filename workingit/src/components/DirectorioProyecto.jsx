    import React, { useState, useEffect } from 'react';
    import ProyectoCard from './ProyectoCard';
    import '../assets/css/DirectorioProyecto.css'

    const DirectorioProyecto = () => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        // Realiza una petición a la API para obtener la lista de proyectos
        fetch('http://149.50.130.111:8002/api/projects/')
        .then((response) => response.json())
        .then((data) => setProjects(data));
    }, []);

    return (
        <div className="projects-directory">
        {projects.map((project) => (
            <ProyectoCard key={project.id} project={project} />
        ))}
        </div>
    );
    };

    export default DirectorioProyecto;