module.exports = (sequelize, DataTypes) => {
  const Table = sequelize.define('Table', {
    number: {
      type: DataTypes.INTEGER,
      primaryKey: true
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
    tableName: 'tables',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });

  Table.associate = (models) => {
    Table.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user'
    });

    Table.hasMany(models.Order, {
      foreignKey: 'table_number',
      as: 'orders'
    });
  };

  return Table;
};