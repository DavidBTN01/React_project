import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import { Product } from "./Product.js";
import { Warehouse } from "./Warehouse.js";

export const Stock = sequelize.define("Stock", {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  quantity: { type: DataTypes.INTEGER, defaultValue: 0 },
});

// Relaciones
Product.hasMany(Stock);
Stock.belongsTo(Product);

Warehouse.hasMany(Stock);
Stock.belongsTo(Warehouse);
