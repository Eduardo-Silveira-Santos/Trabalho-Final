const { DataTypes } = require('sequelize');
const { sequelize } = require("../sequelize");

const Cliente = sequelize.define('cliente', {
    // Model attributes are defined here
    codigo_cliente: {
        type: DataTypes.NUMBER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    rua: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    numero: {
        type: DataTypes.NUMBER,
        allowNull: false,
    },
    complemento: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    bairro: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    cidade: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    uf: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    cep: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    timestamps: false,

    createdAt: false,

    updatedAt: false,

    freezeTableName: true,
    
    tableName: 'cliente'

});

module.exports = {
    Cliente,
}
