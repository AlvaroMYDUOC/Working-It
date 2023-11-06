import React, { useState, useEffect } from 'react';

function ConversationsList() {
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Realizar la solicitud a tu servidor proxy
    fetch('http://149.50.130.111:8080/conversations?userID=1')
      .then((response) => response.json())
      .then((data) => {
        setConversations(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error al obtener las conversaciones', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <h2>Lista de Conversaciones</h2>
      <ul>
        {conversations.map((conversation) => (
          <li key={conversation._id}>
            <strong>Conversación ID:</strong> {conversation._id}
            <br />
            <strong>Último mensaje:</strong> {conversation.last_message}
            <br />
            <strong>Fecha y hora del último mensaje:</strong>{' '}
            {conversation.last_message_timestamp}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ConversationsList;