import { Router } from 'express';
import authRoutes from './authRoutes.js';
import userRoutes from './userRoutes.js';
import ticketRoutes from './ticketRoutes.js';
import careerRoutes from './careerRoutes.js'; 
import typeRoutes from './typeRoutes.js';    
import kpiRoutes from './kpiRoutes.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/tickets', ticketRoutes);
router.use('/careers', careerRoutes);
router.use('/types', typeRoutes);
router.use('/kpi', kpiRoutes);

export default router;
