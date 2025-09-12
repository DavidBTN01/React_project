import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import { Product } from "./Product.js";
import { Warehouse } from "./Warehouse.js";
import { User } from "./User.js";

export const Movement = sequelize.define("Movement", {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  type: { type: DataTypes.ENUM('IN','OUT','ADJUST'), allowNull: false },
  quantity: { type: DataTypes.INTEGER, allowNull: false },
  reason: DataTypes.STRING,
});

// Relaciones
Product.hasMany(Movement);
Movement.belongsTo(Product);

Warehouse.hasMany(Movement);
Movement.belongsTo(Warehouse);

User.hasMany(Movement);
Movement.belongsTo(User);
