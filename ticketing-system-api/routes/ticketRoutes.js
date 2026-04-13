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
  filterTickets,
} from "../controllers/ticketController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/", authMiddleware, getTickets);
router.get("/filter", authMiddleware, filterTickets);
router.post("/", authMiddleware, createTicket);
router.post("/assign", authMiddleware, assignTicket);
router.get("/user/:id", authMiddleware, getTicketsByUser);
router.get("/:id", authMiddleware, getTicketById);
router.put("/:id", authMiddleware, updateTicket);
router.patch("/:id/status", authMiddleware, changeStatus);
router.delete("/:id", authMiddleware, deleteTicket);

export default router;
