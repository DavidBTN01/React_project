import { Warehouse } from "../models/Warehouse.js";

export const getAllWarehouses = async (req, res) => {
  const warehouses = await Warehouse.findAll();
  res.json(warehouses);
};

export const createWarehouse = async (req, res) => {
  try {
    const { name, location } = req.body;
    const warehouse = await Warehouse.create({ name, location });
    res.status(201).json(warehouse);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
