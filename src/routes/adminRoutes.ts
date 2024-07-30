import { Router } from 'express';
import { getUserStats, getReportStats, getSettingsStats, getNotificationStats, addPermission, removePermission } from '../controllers/adminController'; // Importar novos controladores
import { authMiddleware, permissionMiddleware } from '../middlewares/authMiddleware'; // Importar middlewares de autenticação e autorização

const router = Router();

// Rotas existentes
router.get('/admin/users/stats', getUserStats);
router.get('/admin/reports/stats', getReportStats);
router.get('/admin/settings/stats', getSettingsStats);
router.get('/admin/notifications/stats', getNotificationStats);

// Novas rotas para gerenciamento de permissões
router.patch('/admin/users/:id/add-permission', authMiddleware, permissionMiddleware('ManagePermissions'), addPermission); // Rota para adicionar permissão a um usuário
router.patch('/admin/users/:id/remove-permission', authMiddleware, permissionMiddleware('ManagePermissions'), removePermission); // Rota para remover permissão de um usuário

export default router;
