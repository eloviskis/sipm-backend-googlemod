import { Router } from 'express';
import { getUserStats, getReportStats, getSettingsStats, getNotificationStats, addPermission, removePermission } from '../controllers/adminController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

// Rotas existentes com middleware de autenticação e autorização
router.get('/admin/users/stats', authMiddleware, getUserStats);
router.get('/admin/reports/stats', authMiddleware, getReportStats);
router.get('/admin/settings/stats', authMiddleware, getSettingsStats);
router.get('/admin/notifications/stats', authMiddleware, getNotificationStats);

// Novas rotas para gerenciamento de permissões
router.patch('/admin/users/:id/add-permission', authMiddleware, addPermission);
router.patch('/admin/users/:id/remove-permission', authMiddleware, removePermission);

export default router;
