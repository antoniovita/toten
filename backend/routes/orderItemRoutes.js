const express = require("express");
const { getItemsByOrderId, createOrderItem, updateOrderItem, deleteOrderItem } = require("../controllers/orderItemController");

const router = express.Router();

router.get("/:orderId", getItemsByOrderId);
router.post("/", createOrderItem);
router.put("/:id", updateOrderItem);
router.delete("/:id", deleteOrderItem);

module.exports = router;