const {OrderItem} = require('../models');

const getItemsbyOrderId = async ( req , res ) => {
    try {
        const {orderId} = req.params;
        const items = await OrderItem.findAll({where: {order_id: orderId}});
        res.json(items);
    } catch (error) {
        res.status(500).json({error: "Erro ao buscar itens."})
    }
};

module.exports = {getItemsbyOrderId};