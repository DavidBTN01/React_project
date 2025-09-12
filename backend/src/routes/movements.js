import { Router } from "express";
import { getAllMovements, createMovement } from "../controllers/movementController.js";

const router = Router();

router.get("/", getAllMovements);
router.post("/", createMovement);

export default router;
