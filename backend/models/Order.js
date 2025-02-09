const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Order = sequelize.define("Order", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  order_number: {
    type: DataTypes.STRING(20),
    allowNull: false,
    unique: true,
  },
  total_price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM("pending", "preparing", "ready", "completed", "canceled"),
    defaultValue: "pending",
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
},

{
    tableName: "orders",
    timestamps: false,
}


);

module.exports = Order;
