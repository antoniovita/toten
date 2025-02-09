const sequelize = require("../config/db");

const Product = require("./Product");
const Order = require("./Order");
const OrderItem = require("./OrderItem");

sequelize.sync({ force: false }).then(() => {
  console.log("Banco de dados inicializado.");
});

module.exports = {
  sequelize,
  Product,
  Order,
  OrderItem,
};
