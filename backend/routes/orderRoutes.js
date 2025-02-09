const express = require('express');
const {createOrder, getAllOrders, updateOrderStatus, deleteOrder} = require('../controllers/orderController');

const router = express.Router();

router.post('/', createOrder);
router.get('/', getAllOrders);
router.put('/:id', updateOrderStatus);
router.delete('/:id', deleteOrder);

module.exports = router;

