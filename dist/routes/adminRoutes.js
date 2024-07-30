"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const adminController_1 = require("../controllers/adminController"); // Importar novos controladores
const authMiddleware_1 = require("../middlewares/authMiddleware"); // Importar middlewares de autenticação e autorização
const router = (0, express_1.Router)();
// Rotas existentes
router.get('/admin/users/stats', adminController_1.getUserStats);
router.get('/admin/reports/stats', adminController_1.getReportStats);
router.get('/admin/settings/stats', adminController_1.getSettingsStats);
router.get('/admin/notifications/stats', adminController_1.getNotificationStats);
// Novas rotas para gerenciamento de permissões
router.patch('/admin/users/:id/add-permission', authMiddleware_1.authMiddleware, (0, authMiddleware_1.permissionMiddleware)('ManagePermissions'), adminController_1.addPermission); // Rota para adicionar permissão a um usuário
router.patch('/admin/users/:id/remove-permission', authMiddleware_1.authMiddleware, (0, authMiddleware_1.permissionMiddleware)('ManagePermissions'), adminController_1.removePermission); // Rota para remover permissão de um usuário
exports.default = router;
