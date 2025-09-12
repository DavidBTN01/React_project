import { Router } from "express";
import { getAllWarehouses, createWarehouse } from "../controllers/warehouseController.js";

const router = Router();

router.get("/", getAllWarehouses);
router.post("/", createWarehouse);

export default router;
