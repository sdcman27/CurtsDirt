import express from 'express';
import cors from 'cors';
import authRoutes from './authRoutes.js';
import { initializePool } from './database.js';

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5173;

async function startServer() {
  try {
    await initializePool();

    app.use('/api', authRoutes);

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
