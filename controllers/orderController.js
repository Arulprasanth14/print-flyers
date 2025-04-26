const orderModel = require('../models/orderModel');

// Get all orders
const getAllOrders = async (req, res) => {
  try {
    const orders = await orderModel.getAllOrders();
    res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get order by ID
const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await orderModel.getOrderById(id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json(order);
  } catch (error) {
    console.error('Error fetching order by ID:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all orders by Customer (User ID)
const getOrdersByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const orders = await orderModel.getOrdersByUserId(userId);
    res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching user orders:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all orders by Shopkeeper (Shopkeeper ID)
const getOrdersByShopkeeper = async (req, res) => {
  try {
    const { shopkeeperId } = req.params;
    const orders = await orderModel.getOrdersByShopkeeperId(shopkeeperId);
    res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching shopkeeper orders:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Create a new order
const createOrder = async (req, res) => {
  try {
    const { userId, orderType, docLinks, additionalInfo } = req.body;
    const newOrder = await orderModel.createOrder(userId, orderType, docLinks, additionalInfo);
    res.status(201).json(newOrder);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Assign a shopkeeper to an order
const assignShopkeeper = async (req, res) => {
  try {
    const { orderId, shopkeeperId } = req.body;
    const updatedOrder = await orderModel.assignShopkeeper(orderId, shopkeeperId);
    res.status(200).json(updatedOrder);
  } catch (error) {
    console.error('Error assigning shopkeeper:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update order status
const updateOrderStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    const updatedOrder = await orderModel.updateOrderStatus(orderId, status);
    res.status(200).json(updatedOrder);
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getAllOrders,
  getOrderById,
  getOrdersByUser,
  getOrdersByShopkeeper,
  createOrder,
  assignShopkeeper,
  updateOrderStatus,
};
