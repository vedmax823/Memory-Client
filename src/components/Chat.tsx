import React, { useEffect, useState } from 'react';
import * as signalR from '@microsoft/signalr';
import axios from 'axios';

interface Message {
  user: string;
  message: string;
}

const Chat: React.FC = () => {
//   const [connection, setConnection] = useState<signalR.HubConnection | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [user, setUser] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const connect = new signalR.HubConnectionBuilder()
      .withUrl('http://localhost:5197/gamehub')
      .withAutomaticReconnect()
      .build();
  
    const handleReceiveMessage = (user: string, message: string) => {
      console.log('Received:', message);
      setMessages((prevMessages) => [...prevMessages, { user, message }]);
    };
  
    connect.start()
      .then(() => {
        console.log('Connected to the SignalR hub');
        // setConnection(connect);
        connect.on('ReceiveMessage', handleReceiveMessage);
      })
      .catch(err => console.error('Connection failed: ', err));
  
    return () => {
      connect.off('ReceiveMessage', handleReceiveMessage);
      connect.stop().then(() => {
        console.log('Connection stopped');
      }).catch(err => console.error('Error while stopping connection: ', err));
    };
  }, []);

  const sendMessage = async () => {
    if (user && message) {
      try {
        const text = await axios.post('http://localhost:5197/api/RealTimeGame/send', { user, message }, {withCredentials : true});
        console.log(text.data);
        setMessage(''); // Очистити поле повідомлення після відправки
      } catch (err) {
        console.error('Error sending message: ', err);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-4">
        <h2 className="text-2xl font-bold mb-4">Chat Room</h2>

        <div className="flex flex-col space-y-2 mb-4 h-64 overflow-y-scroll">
          {messages.map((msg, index) => (
            <div key={index} className="p-2 rounded bg-gray-200">
              <strong>{msg.user}:</strong> {msg.message}
            </div>
          ))}
        </div>

        <input
          type="text"
          placeholder="Your name"
          value={user}
          onChange={(e) => setUser(e.target.value)}
          className="mb-2 p-2 border rounded w-full"
        />
        <input
          type="text"
          placeholder="Type a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="mb-2 p-2 border rounded w-full"
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 text-white p-2 rounded w-full"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;