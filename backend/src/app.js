import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import { sequelize } from "./config/database.js";

import productsRoutes from "./routes/products.js";
import warehousesRoutes from "./routes/warehouses.js";
import stockRoutes from "./routes/stock.js";
import movementsRoutes from "./routes/movements.js";
import authRoutes from "./routes/auth.js";

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Middlewares y rutas
app.use("/api/auth", authRoutes);
app.use("/api/products", productsRoutes);
app.use("/api/warehouses", warehousesRoutes);
app.use("/api/stock", stockRoutes);
app.use("/api/movements", movementsRoutes);

const PORT = process.env.PORT || 4000;

async function start() {
  try {
    await sequelize.authenticate();
    console.log("✅ DB connected");
    await sequelize.sync({ alter: true }); // crea/actualiza tablas
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  } catch (error) {
    console.error("❌ Unable to connect to DB:", error);
  }
}

start();
