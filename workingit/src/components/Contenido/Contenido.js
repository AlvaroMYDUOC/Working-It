import React, { Component } from 'react';
import ChatBot from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';
import ProfesionalesDisponibles from '../ProfesionalesDisponibles';

const theme = {
    background: '#f5f8fb',
    headerBgColor: '#eb3449',
    headerFontColor: '#fff',
    headerFontSize: '20px',
    botBubbleColor: '#eb3449',
    botFontColor: '#fff',
    userBubbleColor: '#0cb3c9',
    userFontColor: '#fff',
};

export default class Contenido extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chatOpen: false,
        };
    }

    handleClick = () => {
        this.setState((prevState) => ({
            chatOpen: !prevState.chatOpen,
        }), () => {
            console.log('Chat Open:', this.state.chatOpen);
        });
    };

    handleEnd = ({ renderedSteps, values }) => {
        console.log('Handle End - Rendered Steps:', renderedSteps);
        console.log('Handle End - Values:', values);

        // Elimina la validación de 'No' y cierra el chat directamente
        this.setState({ chatOpen: false });
    };

    render() {
        return (
            <ThemeProvider theme={theme}>
                <div>
                    <button className={`circle ${this.state.chatOpen ? 'open' : ''}`} onClick={this.handleClick}>
                        <span>Chat</span>
                    </button>
                    {this.state.chatOpen && (
                        <div className={`chatbot ${this.state.chatOpen ? 'open' : ''}`}>
                            <ChatBot
                                handleEnd={this.handleEnd}
                                steps={[
                                    {
                                        id: '1',
                                        message: 'Bienvenido, ¿cuál es tu nombre?',
                                        trigger: '2',
                                    },
                                    {
                                        id: '2',
                                        user: true,
                                        validator: (value) => {
                                            if (/^[A-Z]{1}[a-z]{2,15}$/.test(value)) {
                                                return true;
                                            } else {
                                                return 'Por favor, ingresa un nombre válido.';
                                            }
                                        },
                                        trigger: '3',
                                    },
                                    {
                                        id: '3',
                                        message: 'Hola {previousValue}, ¡encantado de conocerte!',
                                        trigger: '4',
                                    },
                                    {
                                        id: '4',
                                        message: '¿Estás buscando un profesional?',
                                        trigger: '5',
                                    },
                                    {
                                        id: '5',
                                        options: [
                                            { value: 's', label: 'Sí', trigger: '6A' },
                                            { value: 'n', label: 'No', trigger: 'noCierre' },
                                        ],
                                    },
                                    {
                                        id: '6A',
                                        message: '¡Genial! Aquí tienes un enlace a nuestros profesionales disponibles:',
                                        trigger: 'mostrarProfesionales',
                                    },
                                    {
                                        id: 'noCierre',
                                        message: 'Entiendo. Si necesitas ayuda en el futuro, estoy aquí. ¡Hasta luego!',
                                        end: true,
                                    },
                                    {
                                        id: 'mostrarProfesionales',
                                        component: <ProfesionalesDisponibles />,
                                        asMessage: true,
                                        trigger: 'preguntaVuelta',
                                    },
                                    {
                                        id: 'preguntaVuelta',
                                        message: '¿Necesitas saber algo más?',
                                        trigger: 'respuestaVuelta',
                                    },
                                    {
                                        id: 'respuestaVuelta',
                                        options: [
                                            { value: 's', label: 'Sí', trigger: '6A' },
                                            { value: 'n', label: 'No', trigger: 'noCierre' },
                                        ],
                                    },
                                ]}
                            />
                            <button className="close-button" onClick={this.handleClick}>
                                Cerrar
                            </button>
                        </div>
                    )}
                </div>
            </ThemeProvider>
        );
    }
}