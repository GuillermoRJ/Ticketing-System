import { Router } from 'express';
import authRoutes from './authRoutes.js';
import userRoutes from './userRoutes.js';
import ticketRoutes from './ticketRoutes.js';
// Importa aquí tus otras rutas (careers, types, categories, kpi)

const router = Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/tickets', ticketRoutes);
// router.use('/careers', careerRoutes);
// router.use('/types', typeRoutes);
// router.use('/kpi', kpiRoutes);

export default router;