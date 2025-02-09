const { OrderItem } = require("../models");

const getItemsByOrderId = async (req, res) => {
  try {
    const { orderId } = req.params;
    const items = await OrderItem.findAll({ where: { order_id: orderId } });
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar itens do pedido" });
  }
};

module.exports = { getItemsByOrderId }; 
