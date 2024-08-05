import { Router } from 'express';
import { getUserStats, getReportStats, getSettingsStats, getNotificationStats, addPermission, removePermission } from '../controllers/adminController';
import { authMiddleware, permissionMiddleware } from '../middlewares/authMiddleware';

const router = Router();

// Rotas existentes com middleware de autenticação e autorização
router.get('/admin/users/stats', authMiddleware, permissionMiddleware('ViewStats'), getUserStats);
router.get('/admin/reports/stats', authMiddleware, permissionMiddleware('ViewStats'), getReportStats);
router.get('/admin/settings/stats', authMiddleware, permissionMiddleware('ViewStats'), getSettingsStats);
router.get('/admin/notifications/stats', authMiddleware, permissionMiddleware('ViewStats'), getNotificationStats);

// Novas rotas para gerenciamento de permissões
router.patch('/admin/users/:id/add-permission', authMiddleware, permissionMiddleware('ManagePermissions'), addPermission);
router.patch('/admin/users/:id/remove-permission', authMiddleware, permissionMiddleware('ManagePermissions'), removePermission);

export default router;
