const { Sequelize } = require("sequelize");

// ⚠️ Ajusta credenciales según tu instalación de Postgres
const sequelize = new Sequelize("taskdb", "postgres", "byakko", {
  host: "localhost",
  dialect: "postgres",
  logging: false,
});

module.exports = sequelize;