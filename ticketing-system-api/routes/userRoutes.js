import { Router } from "express";
import {
  createUser,
  getUsers,
  getUserById,
  filterUsers,
  updateStatus,
  editUser,
  deleteUser,
} from "../controllers/userController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/", createUser);
router.get("/", authMiddleware, getUsers);
router.get("/filter", authMiddleware, filterUsers);
router.get("/:id", authMiddleware, getUserById);
router.patch("/:id/status", authMiddleware, updateStatus);
router.put("/:id", authMiddleware, editUser);
router.delete("/:id", authMiddleware, deleteUser);

export default router;
