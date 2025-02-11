const { OrderItem, Product } = require("../models");

const getItemsByOrderId = async (req, res) => {
  try {
    const { orderId } = req.params;
    const items = await OrderItem.findAll({
      where: { order_id: orderId },
      include: [
        {
          model: Product,
          as: 'product'
        }
      ]
    });
    res.json(items);
  } catch (error) {
    console.error('Erro ao buscar itens do pedido', error);
    res.status(500).json({ error: "Erro ao buscar itens do pedido" });
  }
};

const createOrderItem = async (req, res) => {
  const { orderId, productId, quantity, subtotal } = req.body;
  try {
    const orderItem = await OrderItem.create({
      order_id: orderId,
      product_id: productId,
      quantity,
      subtotal
    });
    res.status(201).json(orderItem);
  } catch (error) {
    console.error('Erro ao criar item do pedido', error);
    res.status(500).json({ error: 'Erro ao criar item do pedido' });
  }
};

const updateOrderItem = async (req, res) => {
  const { id } = req.params;
  const { quantity, subtotal } = req.body;
  try {
    const orderItem = await OrderItem.findByPk(id);
    if (orderItem) {
      await orderItem.update({ quantity, subtotal });
      res.json(orderItem);
    } else {
      res.status(404).json({ error: 'Item do pedido não encontrado' });
    }
  } catch (error) {
    console.error('Erro ao atualizar item do pedido', error);
    res.status(500).json({ error: 'Erro ao atualizar item do pedido' });
  }
};

const deleteOrderItem = async (req, res) => {
  const { id } = req.params;
  try {
    const orderItem = await OrderItem.findByPk(id);
    if (orderItem) {
      await orderItem.destroy();
      res.status(204).end();
    } else {
      res.status(404).json({ error: 'Item do pedido não encontrado' });
    }
  } catch (error) {
    console.error('Erro ao deletar item do pedido', error);
    res.status(500).json({ error: 'Erro ao deletar item do pedido' });
  }
};

module.exports = { getItemsByOrderId, createOrderItem, updateOrderItem, deleteOrderItem };