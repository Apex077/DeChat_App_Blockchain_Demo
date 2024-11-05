// src/app/page.tsx
'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';

interface Block {
  index: number;
  message: string;
  timestamp: number;
  hash: string;
  previousHash: string;
}

export default function Home() {
  const [messages, setMessages] = useState<Block[]>([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    const response = await axios.get('/api/blockchain');
    setMessages(response.data);
  };

  const sendMessage = async () => {
    if (newMessage.trim()) {
      await axios.post('/api/blockchain', { message: newMessage });
      fetchMessages();
      setNewMessage('');
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      sendMessage();
    }
  };

  // New function to clear the blockchain
  const clearBlockchain = async () => {
    await axios.delete('/api/blockchain');
    fetchMessages();
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-4 text-black">DeChat</h1>

      {/* Display blockchain messages */}
      <div className="bg-white w-full max-w-md rounded-lg shadow-md p-4 mb-4 overflow-y-auto h-80">
        {messages.map((block) => (
          <div key={block.index} className="mb-4 p-2 border-b text-black">
            <p className="text-black"><strong>Block #{block.index}</strong></p>
            <p className="text-black">Message: {block.message}</p>
            <p className="text-black">Timestamp: {new Date(block.timestamp).toLocaleString()}</p> {/* Display timestamp */}
            <p className="text-black">Hash: <span className="text-xs text-gray-500">{block.hash}</span></p>
            <p className="text-black">Previous Hash: <span className="text-xs text-gray-500">{block.previousHash}</span></p>
          </div>
        ))}
      </div>

      {/* Input and button to add messages */}
      <div className="flex w-full max-w-md">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Enter your message"
          className="flex-grow p-2 border rounded-l-md text-black"
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600"
        >
          Send
        </button>
      </div>

      {/* Button to clear the blockchain */}
      <button
        onClick={clearBlockchain}
        className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
      >
        Clear Blockchain
      </button>
    </div>
  );
}
