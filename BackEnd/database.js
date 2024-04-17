const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME, // Directly use the database name
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

async function ensureDatabaseExists() {
  const dbName = process.env.DB_NAME;
  try {
    await pool.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`);
    await pool.query(`USE \`${dbName}\``); // Switch to using the database
    console.log(`Database ${dbName} is ensured to exist.`);
  } catch (error) {
    console.error('Failed to ensure database existence:', error);
    throw error;
  }
}

async function createDefaultUser() {
  await ensureDatabaseExists(); // Ensure the database exists first
  const username = 'triDstruC';
  const defaultPassword = 'truc1973A$$';
  const hashedPassword = await bcrypt.hash(defaultPassword, 10);
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(255) NOT NULL,
      password VARCHAR(255) NOT NULL
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;`;
  await pool.query(createTableQuery);
  const [rows] = await pool.query("SELECT * FROM users WHERE username = ?", [username]);
  if (rows.length === 0) {
    await pool.query("INSERT INTO users (username, password) VALUES (?, ?)", [username, hashedPassword]);
    console.log("Default user created");
  }
}

module.exports = { pool, createDefaultUser }; // Export both pool and function
