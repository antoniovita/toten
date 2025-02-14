const express = require('express');
const { createOrder, getAllOrders, updateOrderStatus, deleteOrder, getOrderById, getOrdersByTableNumber } = require('../controllers/orderController');
const authenticateToken = require('../middlewares/auth');
const router = express.Router({ mergeParams: true });

router.post('/', createOrder);
router.get('/', authenticateToken, getAllOrders);
router.put('/:id', authenticateToken, updateOrderStatus);
router.delete('/:id', deleteOrder);
router.get('/:id', authenticateToken, getOrderById);
router.get('/table/:table_number', getOrdersByTableNumber);

module.exports = router;