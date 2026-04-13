import { Router } from "express";
import {
  getTicketsByStatus,
  getTicketsByUser,
  getTicketsByType,
} from "../controllers/kpiController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/tickets/status", authMiddleware, getTicketsByStatus);
router.get("/tickets/user", authMiddleware, getTicketsByUser);
router.get("/tickets/type", authMiddleware, getTicketsByType);

export default router;
