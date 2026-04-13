import { Router } from 'express';
import { createUser, getUsers, getUserById, filterUsers, updateStatus, editUser, deleteUser } from '../controllers/userController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = Router();

router.post('/', authMiddleware, createUser);
router.get('/', authMiddleware, getUsers);
router.get('/filter', authMiddleware, filterUsers); // Debe ir antes de /:id para evitar conflictos
router.get('/:id', authMiddleware, getUserById);
router.patch('/:id/status', authMiddleware, updateStatus);
router.put('/:id', authMiddleware, editUser);
router.delete('/:id', authMiddleware, deleteUser);

export default router;