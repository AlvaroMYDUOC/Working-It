import React, {} from 'react';
import '../assets/css/Chat.css';


const Chat = () => {
return (
    <>
    <div className="chat_window">
        <div className="top_menu">
        <div className="title">Chat</div>
        </div>
        <ul className="messages"></ul>
        <div className="bottom_wrapper clearfix">
        <div className="message_input_wrapper">
            <input className="message_input" placeholder="Escribe tu mensaje..." />
        </div>
        <div className="send_message">
            <div className="icon"></div>
            <div className="text">Enviar</div>
        </div>
        </div>
    </div>
    </>
);
};

export default Chat;