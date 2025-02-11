const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Order = require("./Order");
const Product = require("./Product");

const OrderItem = sequelize.define("OrderItem", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  order_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Order,
      key: "id",
    },
  },
  product_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Product,
      key: "id",
    },
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  subtotal: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
},

{
    tableName: "order_items",
    timestamps: true,
}

);


OrderItem.associate = (models) => {
  OrderItem.belongsTo(models.Order, {
    foreignKey: "order_id",
    as: "order",
    onDelete: "CASCADE"
  });

  OrderItem.belongsTo(models.Product, {
    foreignKey: "product_id",
    as: "product",
    onDelete: "CASCADE"
  });
};

module.exports = OrderItem;