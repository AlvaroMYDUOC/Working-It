import React, { useState, useEffect, useCallback } from 'react';
import '../assets/css/Chat.css';
import fotoDefault from '../assets/img/defaultProfile.jpg';

function Chat() {
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [user_id, setUserID] = useState('');
  const [recipientId, setRecipientId] = useState('');

  useEffect(() => {
    // Obtén el user_id del localStorage
    const userToken = localStorage.getItem('usuario');
    const userData = JSON.parse(userToken);
    const userID = userData.id;
    setUserID(userID);

    if (userID) {
      fetch(`http://149.50.130.111:8080/conversations?userID=${userID}`)
        .then((response) => response.json())
        .then((data) => {
          setConversations(data);
        })
        .catch((error) => console.error('Error al obtener las conversaciones:', error));
    } else {
      console.error('user_id no encontrado en el localStorage');
    }
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
    setRecipientId(conversation.recipient_id);
  };

  const handleSendMessage = () => {
    if (inputMessage.trim() === '') {
      return;
    }

    const message = {
      content: inputMessage,
      sender_id: user_id,
      recipient_id: recipientId,
    };

    fetch('http://149.50.130.111:8080/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    })
      .then((response) => response.json())
      .then((data) => {
        setMessages([...messages, data]);
        setInputMessage('');
      })
      .catch((error) => console.error('Error al enviar el mensaje:', error));
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