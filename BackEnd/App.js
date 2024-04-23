const express = require('express');
const cors = require('cors');
const authRoutes = require('./authRoutes');
const { initializePool } = require('./database');


const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5173;

async function startServer() {
  try {
    const pool = await initializePool();
    app.locals.pool = pool;  // Store the pool in the app locals for access in route handlers

    app.use('/api', require('./authRoutes'));

    app.get('/', (req, res) => {
      res.json({ message: 'From backend' });
    });

    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to initialize database or server:", error);
  }
}

startServer();
