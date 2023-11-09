import React, { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import '../assets/css/Chat.css';
import fotoDefault from '../assets/img/defaultProfile.jpg';

function Chat() {
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [user_id, setUserID] = useState('');
  const [recipientId, setRecipientId] = useState('');
  const [userData, setUserData] = useState(null);

  const [selectedConversationId, setSelectedConversationId] = useState(null);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const professionalId = searchParams.get('professionalId');

  useEffect(() => {
    const userToken = localStorage.getItem('usuario');
    const userData = JSON.parse(userToken);
    const userID = userData.id;

    setUserData(userData);
    setUserID(userID || professionalId);

    if (userID || professionalId) {
      fetch(`http://149.50.130.111:8080/conversations?userID=${userID || professionalId}`)
        .then((response) => response.json())
        .then((data) => {
          setConversations(data);
        })
        .catch((error) => console.error('Error al obtener las conversaciones:', error));
    } else {
      console.error('user_id no encontrado en el localStorage ni en la URL');
    }
  }, [professionalId]);

  const loadMessages = useCallback((conversationId) => {
    fetch(`http://149.50.130.111:8080/messages?conversation_id=${conversationId}`)
      .then((response) => response.json())
      .then((data) => {
        setMessages(data);
      })
      .catch((error) => console.error('Error al obtener los mensajes:', error));
  }, []);

  const handleConversationClick = (conversation) => {
    setSelectedConversationId(conversation._id);
    setSelectedConversation(conversation);
  
    // Utiliza el primer participante en la conversación como "recipient_id"
    const participants = conversation.participants;
    
    if (participants.length > 1) {
      // Filtra el participante que no sea el usuario actual (user_id)
      const recipientId = participants.find((participant) => participant !== user_id);
      setRecipientId(recipientId);
    } else {
      console.error('La conversación no tiene suficientes participantes para determinar un destinatario.');
    }
  
    loadMessages(conversation._id);
  };
  
  const handleSendMessage = () => {
    if (inputMessage.trim() === '') {
      return;
    }
  
    // Verifica si no hay una conversación seleccionada
    if (!selectedConversationId) {
      console.error('No hay una conversación seleccionada para enviar mensajes.');
      return;
    }
  
    if (!recipientId) {
      console.error('No se pudo obtener el recipientId de la conversación.');
      return;
    }
  
    if (user_id === recipientId) {
      console.error('No puedes enviarte mensajes a ti mismo.');
      return;
    }
  
    const message = {
      content: inputMessage,
      sender_id: user_id,
      recipient_id: recipientId,
    };
  
    fetch(`http://149.50.130.111:8080/messages?conversation_id=${selectedConversationId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Mensaje enviado exitosamente:', data);
        setMessages([...messages, data]);
        setInputMessage('');
      })
      .catch((error) => {
        console.error('Error al enviar el mensaje:', error);
      });
  };

  const getMessageSenderName = (message) => {
    if (!selectedConversation) {
      return '';
    }

    if (message.sender_id === user_id) {
      return userData.first_name + ' ' + userData.last_name;
    } else {
      return selectedConversation.recipient_name;
    }
  };

  return (
    <div className="chat-app">
      <div className="sidebar">
        {conversations.map((conversation) => (
          <div
            className={`conversation-card ${selectedConversationId === conversation._id ? 'selected' : ''}`}
            key={conversation._id}
            onClick={() => handleConversationClick(conversation)}
          >
            <img src={fotoDefault} alt="User Avatar" />
            <div className="conversation-info">
              <p>{conversation.RecipientName}</p>
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
              className={`message ${message.sender_id === user_id ? 'user-message' : 'other-message'}`}
            >
              <p>
                {getMessageSenderName(message)}: {message.content}
              </p>
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
