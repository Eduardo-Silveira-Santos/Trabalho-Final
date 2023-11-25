const { DataTypes } = require('sequelize');
const { sequelize } = require("../sequelize");

const Login = sequelize.define('login', {
    // Model attributes are defined here
    usuario: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    senha: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    codigo_cliente: {
        type: DataTypes.NUMBER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
}, {
    timestamps: false,

    createdAt: false,

    updatedAt: false,

    freezeTableName: true,
    
    tableName: 'login'
});

module.exports = {
    Login,
}
