/* Importando o sequelize */
const { Sequelize } = require('sequelize');

/* Estou usando o sequelize */
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSOWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    port: process.env.DB_PORT,
});

module.exports = {
    sequelize,
}
