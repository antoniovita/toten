const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Product = require('./Product')(sequelize, DataTypes);
const Order = require('./Order')(sequelize, DataTypes);
const OrderItem = require('./OrderItem')(sequelize, DataTypes);
const Table = require('./Table')(sequelize, DataTypes);

const models = {
  Product,
  Order,
  OrderItem,
  Table
};

Object.keys(models).forEach(modelName => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

sequelize.sync({ alter: true }).then(() => {
  console.log("Banco de dados sincronizado.");
}).catch(error => {
  console.error("Erro ao sincronizar o banco de dados:", error);
});

module.exports = {
  sequelize,
  Product,
  Order,
  OrderItem,
  Table
};