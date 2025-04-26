const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

router.get('/', orderController.getAllOrders);
router.get('/:id', orderController.getOrderById);
router.get('/user/:userId', orderController.getOrdersByUser);
router.get('/shopkeeper/:shopkeeperId', orderController.getOrdersByShopkeeper);
router.post('/', orderController.createOrder);
router.put('/assign', orderController.assignShopkeeper);
router.put('/status', orderController.updateOrderStatus);

module.exports = router;
