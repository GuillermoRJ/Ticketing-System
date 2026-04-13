import { Router } from "express";
import {
  getTicketsByStatus,
  getTicketsByUser,
} from "../controllers/kpiController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/tickets/status", authMiddleware, getTicketsByStatus);
router.get("/tickets/user", authMiddleware, getTicketsByUser);

export default router;
