import React, { useState, useEffect, useCallback } from 'react';
import '../assets/css/Chat.css';
import fotoDefault from '../assets/img/defaultProfile.jpg';

function Chat() {
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');

  useEffect(() => {
    // Código para cargar las conversaciones iniciales
    // Reemplaza este código con la lógica de carga de conversaciones
    const userID = 1;
    fetch(`http://149.50.130.111:8080/conversations?userID=${userID}`)
      .then((response) => response.json())
      .then((data) => {
        setConversations(data);
      })
      .catch((error) => console.error('Error al obtener las conversaciones:', error));
  }, []);

  const loadMessages = useCallback((conversationId) => {
    fetch(`http://149.50.130.111:8080/messages?conversation_id=${conversationId}`)
      .then((response) => response.json())
      .then((data) => {
        setMessages(data);
      })
      .catch((error) => console.error('Error al obtener los mensajes:', error));
  }, []);

  const handleConversationClick = (conversation) => {
    setSelectedConversation(conversation);
    loadMessages(conversation._id);
  };

  const handleSendMessage = () => {
    // Tu código para enviar mensajes
    // Asegúrate de actualizar el estado de messages cuando envíes un nuevo mensaje
  };

  return (
    <div className="chat-app">
      <div className="sidebar">
        {conversations.map((conversation) => (
          <div
            className={`conversation-card ${selectedConversation === conversation ? 'selected' : ''}`}
            key={conversation._id}
            onClick={() => handleConversationClick(conversation)}
          >
            <img src={fotoDefault} alt="User Avatar" />
            <div className="conversation-info">
              <p>{conversation.participants[1] === 1 ? 'User 1' : 'User 2'}</p>
              <p>{conversation.last_message}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="chat-container">
        <div className="message-list">
          {messages.map((message, index) => (
            <div
              key={message._id}
              className={`message ${message.sender_id === 1 ? 'user-message' : 'other-message'}`}
            >
              {message.content}
            </div>
          ))}
        </div>
        <div className="message-input">
          <input
            type="text"
            placeholder="Escribe un mensaje..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
          />
          <button onClick={handleSendMessage}>Enviar</button>
        </div>
      </div>
    </div>
  );
}

export default Chat;
