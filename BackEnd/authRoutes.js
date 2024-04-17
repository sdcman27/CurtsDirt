const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('./database'); // Assuming this is now a MySQL pool

const router = express.Router();

// Helper function to find a user by username
async function findUserByUsername(username) {
  const query = 'SELECT * FROM users WHERE username = ?';
  const [rows] = await db.promise().query(query, [username]);
  return rows[0];
}

// Helper function to validate user's password
async function validatePassword(inputPassword, userPassword) {
  const isMatch = await bcrypt.compare(inputPassword, userPassword);
  return isMatch;
}

// Helper function to generate JWT
function generateJWT(userId) {
  const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '2h' });
  return token;
}

// Route for handling login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
      // Find the user by username
      const user = await findUserByUsername(username);

      // If no user is found, send a 401 Unauthorized response
      if (!user) {
        return res.status(401).json({ message: "Login failed: User not found" });
      }

      // Validate the password
      const passwordIsValid = await validatePassword(password, user.password);
      if (!passwordIsValid) {
        return res.status(401).json({ message: "Login failed: Incorrect password" });
      }

      // Generate a JWT token
      const token = generateJWT(user.id);

      // Respond with the token and a success message
      res.json({ message: "Login successful", token });
    } catch (err) {
      // Log the error and send a 500 Internal Server Error response
      console.error(err);
      res.status(500).json({ message: "An error occurred during login." });
    }
});

module.exports = router;
