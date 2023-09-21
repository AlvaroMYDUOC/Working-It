import React, { useState } from 'react';
import '../assets/css/ChatB.css';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`chatbot ${isOpen ? 'open' : ''}`}>
      <div className="circle" onClick={toggleChat}>
        🗨️
      </div>
      {isOpen && (
        <div className="popup">
          <div className="chat-container">
            <div className="chat-messages">
              {/* Aquí puedes mostrar los mensajes del chatbot */}
              {/* Por ejemplo: */}
              <div className="message-user">Manuel dame bono 18!!</div>
            </div>
            <div className="message-input">
              <input
                type="text"
                placeholder="Escribe tu mensaje..."
                // Agrega el manejo de entrada del usuario aquí
              />
              <button>Enviar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;