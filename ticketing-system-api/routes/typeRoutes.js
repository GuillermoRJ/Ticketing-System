import { Router } from "express";
import {
  getTypes,
  createType,
  updateType,
  deleteType,
  getCategories,
} from "../controllers/typeController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/", authMiddleware, getTypes);
router.post("/", authMiddleware, createType);
router.put("/:id", authMiddleware, updateType);
router.delete("/:id", authMiddleware, deleteType);
router.get("/categories", authMiddleware, getCategories);

export default router;
