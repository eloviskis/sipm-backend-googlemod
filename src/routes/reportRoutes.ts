import { Router } from 'express';
import { createReport, getReports, getReport } from '../controllers/reportController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

// Adicionar middleware de autenticação para cada rota
router.post('/reports', authMiddleware, createReport);
router.get('/reports', authMiddleware, getReports);
router.get('/reports/:id', authMiddleware, getReport);

export default router;
