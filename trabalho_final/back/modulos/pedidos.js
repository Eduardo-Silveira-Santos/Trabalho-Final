const { DataTypes } = require('sequelize');
const { sequelize } = require("../sequelize");

const Pedidos = sequelize.define('pedidos', {
    // Model attributes are defined here
    codigo_pedido: {
        type: DataTypes.NUMBER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    codigo_cliente: {
        type: DataTypes.NUMBER,
        allowNull: false,
    },
    total: {
        type: DataTypes.NUMBER,
        allowNull: false,
    },
}, {
    timestamps: false,

    createdAt: false,

    updatedAt: false,

    freezeTableName: true,
    
    tableName: 'pedidos'

});

module.exports = {
    Pedidos,
}
