import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://<BACKEND_PUBLIC_IP>:3000/api/feedback', { message });
      setStatus('Message submitted successfully!');
      setMessage('');
    } catch (error) {
      console.error(error);
      setStatus('Failed to submit message.');
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '100px auto', textAlign: 'center' }}>
      <h2>🛡️ Secure DevOps Frontend</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          rows="5"
          cols="50"
          placeholder="Enter your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
        <br />
        <button type="submit" style={{ marginTop: '10px' }}>Submit</button>
      </form>
      {status && <p style={{ marginTop: '20px' }}>{status}</p>}
    </div>
  );
}

export default App;
