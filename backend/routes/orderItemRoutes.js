const express = require('express');
const { createOrderItem, getAllOrderItems, updateOrderItem, deleteOrderItem, getOrderItemById } = require('../controllers/orderItemController');
const authenticateToken = require('../middlewares/auth');
const router = express.Router({ mergeParams: true });

router.post('/', authenticateToken, createOrderItem);
router.get('/', getAllOrderItems);
router.put('/:id', authenticateToken, updateOrderItem);
router.delete('/:id', authenticateToken, deleteOrderItem);
router.get('/:id', getOrderItemById);

module.exports = router;