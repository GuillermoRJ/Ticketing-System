import { Router } from "express";
import {
  createTicket,
  getTickets,
  getTicketById,
  updateTicket,
  changeStatus,
  deleteTicket,
  assignTicket,
  getTicketsByUser,
} from "../controllers/ticketController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/", authMiddleware, createTicket);
router.get("/", authMiddleware, getTickets);
router.post("/assign", authMiddleware, assignTicket);
router.get("/user/:id", authMiddleware, getTicketsByUser);
router.get("/:id", authMiddleware, getTicketById);
router.put("/:id", authMiddleware, updateTicket);
router.patch("/:id/status", authMiddleware, changeStatus);
router.delete("/:id", authMiddleware, deleteTicket);

export default router;
