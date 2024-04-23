const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { getPool } = require("./database"); // Make sure you destruct pool from the export
require("dotenv").config();
const nodemailer = require("nodemailer");
const router = express.Router();
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

// Helper function to find a user by username
async function findUserByUsername(username) {
  const pool = getPool(); // Get the pool instance using the getPool method
  const query = "SELECT * FROM users WHERE username = ?";
  const [rows] = await pool.query(query, [username]);
  return rows[0];
}

// Helper function to validate user's password
async function validatePassword(inputPassword, userPassword) {
  const isMatch = await bcrypt.compare(inputPassword, userPassword);
  return isMatch;
}

// Helper function to generate JWT
function generateJWT(userId) {
  const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "2h",
  });
  return token;
}

// Route for handling login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const pool = getPool(); // Obtain the pool instance
  if (!pool) {
    return res
      .status(500)
      .json({ message: "Database connection not initialized" });
  }

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
      return res
        .status(401)
        .json({ message: "Login failed: Incorrect password" });
    }

    // Generate a JWT token
    const token = generateJWT(user.id);

    // Respond with the token and a success message
    res.json({ message: "Login successful", token });
  } catch (err) {
    // Log the error and send a 500 Internal Server Error response
    console.error(err);
    res.status(500).json({ message: "Uh oh, An error occurred during login." });
  }
});

// New route to handle order submissions
router.post("/submit-order", async (req, res) => {
  const { name, street, city, zipcode, phone, description } = req.body;
  const pool = getPool(); // Get the pool instance using the getPool method
  try {
    const query = `
      INSERT INTO orders (name, street, city, zipcode, phone, description)
      VALUES (?, ?, ?, ?, ?, ?);
    `;
    const result = await pool.query(query, [
      name,
      street,
      city,
      zipcode,
      phone,
      description,
    ]);
    res.json({
      message: "Order submitted successfully",
      orderId: result.insertId,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error submitting order" });
  }
});

// OAuth2 callback route
router.get('/oauth2callback', async (req, res) => {
  const { code } = req.query;
  if (!code) {
    return res.status(400).send('Authorization code is missing');
  }
  try {
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);
    console.log('Tokens received:', tokens); // You should see the refresh token here if 'access_type' was set to 'offline'
    // Save your tokens to the database here instead of logging them
    // ...

    res.redirect('http://localhost:3001'); // Redirect user to a success page or another endpoint
  } catch (error) {
    console.error('Error retrieving tokens:', error);
    res.status(500).send('Server error during authentication');
  }
});

const oauth2Client = new OAuth2(
  process.env.OAUTH_CLIENT_ID,
  process.env.OAUTH_CLIENT_SECRET,
  "http://localhost:3001" // This should match the redirect URI in your Google Cloud Console
);

// Scopes define the level of access you are requesting from the user's account
const scopes = ["https://www.googleapis.com/auth/gmail.send"];

const url = oauth2Client.generateAuthUrl({
  // 'online' (default) or 'offline' (gets refresh_token)
  access_type: "offline",
  // If you only need one scope you can pass it as a string
  scope: scopes,
  prompt: "consent",
});

console.log("Please visit this URL to authorize:", url);

//

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: process.env.MAIL_USERNAME,
    clientId: process.env.OAUTH_CLIENTID,
    clientSecret: process.env.OAUTH_CLIENT_SECRET,
    //refreshToken: process.env.OAUTH_REFRESH_TOKEN,
  },
});

// Send Email
const mailOptions = {
  from: process.env.MAIL_USERNAME,
  to: "sethcode12@gmail.com",
  subject: "Test Email",
  text: "Hello, this is a test email using OAuth2 and Nodemailer.",
};

module.exports = router;
