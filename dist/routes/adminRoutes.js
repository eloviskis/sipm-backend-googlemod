"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const adminController_1 = require("../controllers/adminController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = (0, express_1.Router)();
// Rotas existentes com middleware de autenticação e autorização
router.get('/admin/users/stats', authMiddleware_1.authMiddleware, adminController_1.getUserStats);
router.get('/admin/reports/stats', authMiddleware_1.authMiddleware, adminController_1.getReportStats);
router.get('/admin/settings/stats', authMiddleware_1.authMiddleware, adminController_1.getSettingsStats);
router.get('/admin/notifications/stats', authMiddleware_1.authMiddleware, adminController_1.getNotificationStats);
// Novas rotas para gerenciamento de permissões
router.patch('/admin/users/:id/add-permission', authMiddleware_1.authMiddleware, adminController_1.addPermission);
router.patch('/admin/users/:id/remove-permission', authMiddleware_1.authMiddleware, adminController_1.removePermission);
exports.default = router;
