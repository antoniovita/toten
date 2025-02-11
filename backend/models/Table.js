const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Table = sequelize.define('Table', {
        number: {
            type: DataTypes.INTEGER,
            unique: true,
            allowNull: false
        }
    }, {
        tableName: 'tables',
        timestamp: false
    });

    return Table;

module.exports = Table;