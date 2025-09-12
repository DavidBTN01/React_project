import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

export const Warehouse = sequelize.define("Warehouse", {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  location: DataTypes.STRING,
});
