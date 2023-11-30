import React, { Component } from 'react';
import axios from 'axios';

class ProfesionalesDisponibles extends Component {
    constructor(props) {
        super(props);
        this.state = {
            profesionales: [],
            loading: true,
        };
    }

    componentDidMount() {
        // Realiza una solicitud a la API utilizando Axios para obtener la lista de profesionales disponibles
        axios.get('http://149.50.130.111:8000/especialistas/')
            .then((response) => {
                this.setState({
                    profesionales: response.data.results, // Accedemos a "results" en la respuesta
                    loading: false,
                });
            })
            .catch((error) => {
                console.error('Error al cargar los profesionales:', error);
                this.setState({ loading: false });
            });
    }

    render() {
        const { profesionales, loading } = this.state;

        if (loading) {
            return <p>Cargando profesionales...</p>;
        }

        if (profesionales.length === 0) {
            return <p>No hay profesionales disponibles en este momento.</p>;
        }

        return (
            <div>
                <h2>Profesionales Disponibles:</h2>
                <ul>
                    {profesionales.map((profesional) => (
                        <li key={profesional.id}>
                            <a href={`http://149.50.130.111:8000/especialistas/${profesional.id}`} target="_blank">
                                {profesional.name} {/* Usamos "name" en lugar de "nombre" */}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

export default ProfesionalesDisponibles;
