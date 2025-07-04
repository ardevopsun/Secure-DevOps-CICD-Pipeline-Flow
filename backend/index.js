const express = require('express');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// POST /api/feedback endpoint
app.post('/api/feedback', (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  // Log to console instead of DB
  console.log(`📝 Received feedback: ${message}`);

  res.status(200).json({ message: '✅ Feedback received successfully (no DB).' });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Backend server is running on port ${PORT}`);
});
