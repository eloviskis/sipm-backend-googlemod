"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const themePreferencesController_1 = require("../controllers/themePreferencesController");
const authMiddleware_1 = require("../middlewares/authMiddleware"); // Adicionando middleware de autenticação
const router = (0, express_1.Router)();
// Aplicar o middleware de autenticação à rota de atualização de preferências de tema
router.patch('/theme-preferences/:userId', authMiddleware_1.authMiddleware, themePreferencesController_1.updateThemePreferences);
exports.default = router;
