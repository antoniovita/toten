const { Order, OrderItem, Product } = require("../models");

const generateOrderNumber = () => {
  return `ORD-${Math.floor(100000 + Math.random() * 900000)}`;
};

const createOrder = async (req, res) => {
  try {
    const { items } = req.body;

    let total_price = 0;
    const order_number = generateOrderNumber();
    const order = await Order.create({ order_number, total_price });

    for (let item of items) {
      const product = await Product.findByPk(item.product_id);
      if (!product) continue;

      const subtotal = product.price * item.quantity;
      total_price += subtotal;

      await OrderItem.create({
        order_id: order.id,
        product_id: product.id,
        quantity: item.quantity,
        subtotal,
      });
    }
    await order.update({ total_price });

    res.status(201).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao criar pedido" });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      include: OrderItem,
    });
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar pedidos" });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const order = await Order.findByPk(id);
    if (!order) {
      return res.status(404).json({ error: "Pedido não encontrado." });
    }

    await order.update({ status });

    res.json({ message: "Status do pedido atualizado com sucesso", order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao atualizar status do pedido" });
  }
};

module.exports = { createOrder, getAllOrders, updateOrderStatus };
