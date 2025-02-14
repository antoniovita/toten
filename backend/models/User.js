module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define( "User" , {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },


        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },

        username: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },

        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        tableName: 'users',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    });

    User.associate = (models) => {
        User.hasMany(models.Order, {
            foreignKey: 'user_id',
            as: 'orders'
        });

        User.hasMany(models.Product, {
            foreignKey: 'user_id',
            as: 'products'
        });

        User.hasMany(models.Table, {
            foreignKey: 'user_id',
            as: 'tables'
        });
    };

    return User;
    }