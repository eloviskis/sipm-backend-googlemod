import { Router } from 'express';
import { createReport, getReports, getReport } from '../controllers/reportController';
import { authMiddleware, permissionMiddleware } from '../middlewares/authMiddleware'; // Importar middlewares de autenticação e autorização

const router = Router();

// Adicionar middleware de autenticação e permissão para cada rota
router.post('/reports', authMiddleware, permissionMiddleware('CreateReport'), createReport);
router.get('/reports', authMiddleware, permissionMiddleware('ViewReports'), getReports);
router.get('/reports/:id', authMiddleware, permissionMiddleware('ViewReport'), getReport);

export default router;
