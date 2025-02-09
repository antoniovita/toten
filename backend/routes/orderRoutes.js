const express = require('express');
const {createOrder, getAllOrders, updateOrderStatus} = require('../controllers/orderController');

const router = express.Router();

router.post('/', createOrder);
router.get('/', getAllOrders);
router.put('/:id', updateOrderStatus);

module.exports = router;

