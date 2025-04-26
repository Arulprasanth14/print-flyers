const db = require('../config/db');

// Get all orders
const getAllOrders = async () => {
  const result = await db.query('SELECT * FROM orders ORDER BY created_at DESC');
  return result.rows;
};

// Get order by ID
const getOrderById = async (id) => {
  const result = await db.query('SELECT * FROM orders WHERE id = $1', [id]);
  return result.rows[0];
};

// Get all orders 
const getOrdersByUserId = async (userId) => {
  const result = await db.query('SELECT * FROM orders WHERE user_id = $1 ORDER BY created_at DESC', [userId]);
  return result.rows;
};


const getOrdersByShopkeeperId = async (shopkeeperId) => {
  const result = await db.query('SELECT * FROM orders WHERE sho_id = $1 ORDER BY created_at DESC', [shopkeeperId]);
  return result.rows;
};


const createOrder = async (userId, orderType, docLinks, additionalInfo) => {
  const result = await db.query(
    `INSERT INTO orders (user_id, order_type, doc_links, additional_info)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [userId, orderType, docLinks, additionalInfo]
  );
  return result.rows[0];
};


const assignShopkeeper = async (orderId, shopkeeperId) => {
  const result = await db.query(
    `UPDATE orders
     SET sho_id = $1
     WHERE id = $2
     RETURNING *`,
    [shopkeeperId, orderId]
  );
  return result.rows[0];
};


const updateOrderStatus = async (orderId, status) => {
  const result = await db.query(
    `UPDATE orders
     SET status = $1
     WHERE id = $2
     RETURNING *`,
    [status, orderId]
  );
  return result.rows[0];
};

module.exports = {
  getAllOrders,
  getOrderById,
  getOrdersByUserId,
  getOrdersByShopkeeperId,
  createOrder,
  assignShopkeeper,
  updateOrderStatus,
};
