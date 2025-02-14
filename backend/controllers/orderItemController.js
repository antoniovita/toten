const { OrderItem, Product } = require("../models");

const createOrderItem = async (req, res) => {
  try {
    const { order_id, product_id, quantity } = req.body;
    const user_id = req.params.user_id;

    const product = await Product.findByPk(product_id);
    if (!product || product.user_id !== user_id) {
      return res.status(404).json({ error: "Produto não encontrado" });
    }

    const subtotal = product.price * quantity;
    const orderItem = await OrderItem.create({ order_id, product_id, quantity, subtotal });

    res.status(201).json(orderItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao criar item do pedido" });
  }
};

const getAllOrderItems = async (req, res) => {
  try {
    const user_id = req.params.user_id;
    const orderItems = await OrderItem.findAll({
      include: {
        model: Product,
        where: { user_id }
      }
    });
    res.json(orderItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar itens do pedido" });
  }
};

const getOrderItemById = async (req, res) => {
  try {
    const { id } = req.params;
    const user_id = req.params.user_id;
    const orderItem = await OrderItem.findOne({
      where: { id },
      include: {
        model: Product,
        where: { user_id }
      }
    });
    if (orderItem) {
      res.json(orderItem);
    } else {
      res.status(404).json({ error: "Item do pedido não encontrado" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar item do pedido" });
  }
};

const updateOrderItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;
    const user_id = req.params.user_id;

    const orderItem = await OrderItem.findOne({
      where: { id },
      include: {
        model: Product,
        where: { user_id }
      }
    });
    if (!orderItem) {
      return res.status(404).json({ error: "Item do pedido não encontrado" });
    }

    const product = await Product.findByPk(orderItem.product_id);
    const subtotal = product.price * quantity;

    await orderItem.update({ quantity, subtotal });

    res.json(orderItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao atualizar item do pedido" });
  }
};

const deleteOrderItem = async (req, res) => {
  try {
    const { id } = req.params;
    const user_id = req.params.user_id;

    const orderItem = await OrderItem.findOne({
      where: { id },
      include: {
        model: Product,
        where: { user_id }
      }
    });
    if (!orderItem) {
      return res.status(404).json({ error: "Item do pedido não encontrado" });
    }

    await orderItem.destroy();
    res.json({ message: "Item do pedido deletado com sucesso" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao deletar item do pedido" });
  }
};

module.exports = { createOrderItem, getAllOrderItems, getOrderItemById, updateOrderItem, deleteOrderItem };