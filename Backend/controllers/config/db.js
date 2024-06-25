const mariadb = require('mariadb');

// Create a connection pool
const pool = mariadb.createPool({
  host: '127.0.0.1', 
  port: 3306,
  user: 'ar', 
  password: '123',
  database: 'BSI',
  connectionLimit: 5 // Optional: limit the number of connections
});

// Function to test the connection
async function testConnection() {
  let conn;
  try {
    conn = await pool.getConnection();
    console.log('Connection to MariaDB was successful!');
  } catch (err) {
    console.log('Error connecting to MariaDB:', err);
  } finally {
    console.log("con is",conn.info, conn.listeners,conn.threadId,"\n");
    if (conn) conn.release(); // Ensure the connection is released
  }
}

// Test the connection
testConnection();

module.exports = pool;
