module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    order_number: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    total_price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('pending', 'preparing', 'ready', 'completed', 'canceled'),
      defaultValue: 'pending'
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    table_number: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'tables',
        key: 'number'
      }
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    }
  }, {
    tableName: 'orders',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false
  });

  Order.associate = (models) => {
    Order.belongsTo(models.Table, {
      foreignKey: 'table_number',
      targetKey: 'number',
      as: 'table'
    });

    Order.hasMany(models.OrderItem, {
      foreignKey: 'order_id',
      as: 'items'
    });

    Order.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user'
    });
  };

  return Order;
};