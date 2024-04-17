const express = require('express');
const cors = require('cors');
const authRoutes = require('./authRoutes');
const { createDefaultUser } = require('./database'); // Correctly import createDefaultUser


const app = express();
app.use(cors());
app.use(express.json());

// Since initializeDatabase is a pool, we don't need to wait for a connection to use it.
app.use('/api', authRoutes);

app.get('/', (req, res) => {
  res.json('From backend');
});

const PORT = process.env.PORT || 5173;
app.listen(PORT, async () => {
  console.log(`Server is listening on port ${PORT}`);
  // After the server starts, create the default user
  try {
    await createDefaultUser();
  } catch (err) {
    console.error("Failed to create the default user:", err);
  }
});