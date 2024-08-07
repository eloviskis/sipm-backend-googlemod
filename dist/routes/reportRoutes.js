"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const reportController_1 = require("../controllers/reportController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = (0, express_1.Router)();
// Adicionar middleware de autenticação para cada rota
router.post('/reports', authMiddleware_1.authMiddleware, reportController_1.createReport);
router.get('/reports', authMiddleware_1.authMiddleware, reportController_1.getReports);
router.get('/reports/:id', authMiddleware_1.authMiddleware, reportController_1.getReport);
exports.default = router;
