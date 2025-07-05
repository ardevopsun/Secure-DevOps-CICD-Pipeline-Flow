const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 5432,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

app.get('/', (req, res) => {
  res.send('<h1>Secure DevOps Backend API</h1>');
});

app.post('/save', async (req, res) => {
  const { key, value } = req.body;
  try {
    await pool.query(
      'INSERT INTO secure_data(key, value) VALUES($1, $2)',
      [key, value]
    );
    res.json({ status: 'ok' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'db error' });
  }
});

app.get('/data', async (req, res) => {
  try {
    const result = await pool.query('SELECT key, value FROM secure_data');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'db error' });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Backend running on port ${port}`));
