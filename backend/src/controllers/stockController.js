import { Stock } from "../models/Stock.js";
import { Product } from "../models/Product.js";
import { Warehouse } from "../models/Warehouse.js";

export const getAllStock = async (req, res) => {
  const stock = await Stock.findAll({ include: [Product, Warehouse] });
  res.json(stock);
};

export const updateStock = async (req, res) => {
  try {
    const { productId, warehouseId, quantity } = req.body;
    let stock = await Stock.findOne({ where: { productId, warehouseId } });
    if (!stock) {
      stock = await Stock.create({ productId, warehouseId, quantity });
    } else {
      stock.quantity = quantity;
      await stock.save();
    }
    res.json(stock);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
