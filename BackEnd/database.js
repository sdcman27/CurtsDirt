const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');
require('dotenv').config();

// Define your basic MySQL connection configuration.
// This configuration does not specify a specific database,
// which is useful for initial connection to create the database if it does not exist.
const baseConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

// Declare a variable to hold the pool globally so it can be accessed throughout the module.
let pool;

// This function initializes the database connection pool.
async function initializePool() {
  // Create a pool with base configuration to connect without specifying a database.
  const initialPool = mysql.createPool(baseConfig);
  
  // Ensure the database exists; create it if it does not.
  await ensureDatabaseExists(initialPool);
  
  // Properly close the initial connection pool since it is no longer needed after database creation.
  initialPool.end();

  // Initialize a new pool with the specific database now included in the configuration.
  pool = mysql.createPool({ ...baseConfig, database: process.env.DB_NAME });

  // Create default users and necessary tables such as orders.
  await createDefaultUser(pool);
  await createOrdersTable(pool);
}

// Execute pool initialization and handle any errors.
initializePool().catch(err => {
  console.error('Failed to initialize database pool:', err);
  process.exit(1); // Exit the process if the pool cannot be initialized.
});

// Function to ensure the specified database exists.
// If it does not, it creates the database with utf8mb4 character set which supports Unicode.
async function ensureDatabaseExists(pool) {
  const dbName = process.env.DB_NAME;
  await pool.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`);
  console.log(`Database '${dbName}' ensured to exist.`);
}

// Function to create a default user in the 'users' table.
// This is useful for having a default login for initial tests or setups.
async function createDefaultUser(pool) {
  const username = 'triDstruC';
  const defaultPassword = 'truc1973A$$';
  const hashedPassword = await bcrypt.hash(defaultPassword, 10);

  // Create the 'users' table if it doesn't exist.
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(255) NOT NULL,
      password VARCHAR(255) NOT NULL
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;`;
  await pool.query(createTableQuery);

  // Check if the default user already exists to avoid duplicates.
  const [rows] = await pool.query("SELECT * FROM users WHERE username = ?", [username]);
  if (rows.length === 0) {
    // Insert the default user if not present.
    await pool.query("INSERT INTO users (username, password) VALUES (?, ?)", [username, hashedPassword]);
    console.log("Default user created");
  }
}

// Function to create the 'orders' table.
// This table holds information about orders submitted via the application.
async function createOrdersTable(pool) {
  const createOrdersTableQuery = `
    CREATE TABLE IF NOT EXISTS orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    street VARCHAR(255) NOT NULL,
    city VARCHAR(255) NOT NULL,
    zipcode VARCHAR(10) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    description TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;`;

  await pool.query(createOrdersTableQuery);
  console.log("Orders table created");
}

// Export a getter function for accessing the initialized pool from other modules.
module.exports = {
  getPool: () => pool,
  initializePool
};
