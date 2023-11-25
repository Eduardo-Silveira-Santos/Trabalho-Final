const { DataTypes } = require('sequelize');
const { sequelize } = require("../sequelize");
const { Produtos } = require('./produtos');

const ItemPedido = sequelize.define('item_pedido', {
    // Model attributes are defined here
    codigo_pedido: {
        type: DataTypes.NUMBER,
        allowNull: false,
    },
    sequencial: {
        type: DataTypes.NUMBER,
        allowNull: false,
    },
    codigo_produto: {
        type: DataTypes.NUMBER,
        allowNull: false,
    },
    quantidade: {
        type: DataTypes.NUMBER,
        allowNull: false,
    },
    total_item: {
        type: DataTypes.NUMBER,
        allowNull: false,
    },
}, {
    timestamps: false,

    createdAt: false,

    updatedAt: false,

    freezeTableName: true,
    
    tableName: 'item_pedido',

    indexes: [
        {
            fields: ['codigo_pedido', 'sequencial'],
            unique: true,
        }
    ]
});
ItemPedido.removeAttribute('id')
ItemPedido.belongsTo(Produtos, {
    foreignKey: 'codigo_produto',
    targetKey: 'codigo_produto',
});

module.exports = {
    ItemPedido,
}
