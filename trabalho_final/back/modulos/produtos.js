const { DataTypes } = require('sequelize');
const { sequelize } = require("../sequelize");

const Produtos = sequelize.define('produtos', {
    // Model attributes are defined here
    codigo_produto: {
        type: DataTypes.NUMBER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    descricao: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    preco: {
        type: DataTypes.NUMBER,
        allowNull: false,
    },
    imagem: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    timestamps: false,

    createdAt: false,

    updatedAt: false,

    freezeTableName: true,
    
    tableName: 'produtos'

});

module.exports = {
    Produtos,
}
