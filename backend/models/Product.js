module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define("Product", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    image_url: {
      type: DataTypes.STRING
    },
    category: {
      type: DataTypes.STRING
    },
    available: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    tableName: "products",
    timestamps: true
  });

  Product.associate = (models) => {
    Product.hasMany(models.OrderItem, {
      foreignKey: "product_id",
      as: "orderItems",
      onDelete: "CASCADE"
    });
  };

  return Product;
};