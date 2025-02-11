const express = require('express');
const {createOrder, getAllOrders, updateOrderStatus, deleteOrder, getOrderById} = require('../controllers/orderController');

const router = express.Router();

router.post('/', createOrder);
router.get('/', getAllOrders);
router.put('/:id', updateOrderStatus);
router.delete('/:id', deleteOrder);
router.get('/:id', getOrderById);

module.exports = router;

