module.exports = (sequelize, DataTypes) => {
    const Table = sequelize.define('Table', {
      number: {
        type: DataTypes.INTEGER,
        unique: true,
        allowNull: false
      }
    }, {
      tableName: 'tables',
      timestamps: false
    });
  
    return Table;
  };