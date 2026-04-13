import { Router } from "express";
import {
  createCareer,
  getCareers,
  filterCareers,
  updateCareer,
  deleteCareer,
} from "../controllers/careerController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/", authMiddleware, getCareers);
router.get("/filter", authMiddleware, filterCareers);
router.post("/", authMiddleware, createCareer);
router.put("/:id", authMiddleware, updateCareer);
router.delete("/:id", authMiddleware, deleteCareer);

export default router;
