const db = require('../config/db');


const getAllUsers = async () => {
  const result = await db.query('SELECT * FROM users');
  return result.rows;
};


const createUser = async (name, email, phone, hashedPassword, userType, address) => {
  const result = await db.query(
    `INSERT INTO users (name, email, phone, password, user_type, address) 
     VALUES ($1, $2, $3, $4, $5, $6) 
     RETURNING *`,
    [name, email, phone, hashedPassword, userType, address]
  );
  return result.rows[0];
};


const getUserByName = async (name) => {
  const result = await db.query(
    'SELECT * FROM users WHERE name = $1',
    [name]
  );
  return result.rows[0];
};


const getUserById = async (id) => {
  const result = await db.query(
    'SELECT * FROM users WHERE id = $1',
    [id]
  );
  return result.rows[0];
};


const getUsersByType = async (userType) => {
  const result = await db.query(
    'SELECT * FROM users WHERE user_type = $1',
    [userType]
  );
  return result.rows;
};

module.exports = {
  getAllUsers,
  createUser,
  getUserByName,
  getUserById,
  getUsersByType, // export the new function also
};
