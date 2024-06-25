const pool = require('../config/db');

const User = {
  create: async (user) => {
    const { username, password, S_Role } = user;
    console.log(`Creating user with username: ${username}`);
    const conn = await pool.getConnection();
    const query = `INSERT INTO users (username, password, S_Role) VALUES (?, ?, ?)`;
    await conn.query(query, [username, password, S_Role]);
    conn.release();
    console.log(`User with username: ${username} created successfully`);
  },

  booking: async (user) => {
    const { Id, username, Source, Target } = user;
    console.log(`Booking user with username: ${username}`);
    const conn = await pool.getConnection();
    const query1 = `INSERT INTO booking (id, username, Source_City, Destination_City) VALUES (?, ?, ?, ?)`;
    await conn.query(query1, [Id, username, Source, Target]);
    conn.release();
    console.log(`Booking username: ${username} successfully`);
  },
  findByUsername: async (username) => {
    console.log(`Finding user with username: ${username}`);
    const conn = await pool.getConnection();
    const query = `SELECT * FROM users WHERE username = ?`;
    const rows = await conn.query(query, [username]);
    conn.release();
    console.log(`User found: ${JSON.stringify(rows[0])}`);
    return rows[0];
  },
  getAll: async () => {
    console.log('Getting all users');
    const conn = await pool.getConnection();
    const query = 'SELECT * FROM users';
    const rows = await conn.query(query);
    conn.release();
    console.log(`Found ${rows.length} users`);
    return rows;
  },
  getbookings: async () => {
    console.log('Getting all users');
    const conn = await pool.getConnection();
    const query = 'SELECT * FROM users';
    const query1 = 'SELECT * FROM booking';
    const rows = await conn.query(query);
    const rows1 = await conn.query(query1);
    var packing = [];
    rows1.forEach(element => {
      rows.forEach(e => {
        if (element.id == e.id) {
          element.S_Role = e.S_Role;
          packing.push(element);
        }
        else {
          console.log("No Bookings Found");
        }
      });
    });
    conn.release();
    console.log(`Found ${packing.length} users`);
    return packing;
  }
};

module.exports = User;
