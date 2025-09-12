import { Router } from "express";
import { getAllStock, updateStock } from "../controllers/stockController.js";

const router = Router();

router.get("/", getAllStock);
router.post("/", updateStock);

export default router;
