const express = require("express");
const { getItemsByOrderId } = require("../controllers/orderItemController"); 

const router = express.Router();

router.get("/:orderId", getItemsByOrderId); 

module.exports = router;