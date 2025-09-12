import { Movement } from "../models/Movement.js";
import { Stock } from "../models/Stock.js";

export const getAllMovements = async (req, res) => {
  const movements = await Movement.findAll();
  res.json(movements);
};

export const createMovement = async (req, res) => {
  try {
    const { type, quantity, reason, productId, warehouseId, userId } = req.body;

    const movement = await Movement.create({
      type,
      quantity,
      reason,
      productId,
      warehouseId,
      userId,
    });

    // Actualizar stock automáticamente
    let stock = await Stock.findOne({ where: { productId, warehouseId } });
    if (!stock) {
      stock = await Stock.create({ productId, warehouseId, quantity: 0 });
    }

    if (type === "IN") stock.quantity += quantity;
    else if (type === "OUT") stock.quantity -= quantity;
    else if (type === "ADJUST") stock.quantity = quantity;

    await stock.save();

    res.status(201).json(movement);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
