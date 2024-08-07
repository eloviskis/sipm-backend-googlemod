"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const themeController_1 = require("../controllers/themeController");
const authMiddleware_1 = require("../middlewares/authMiddleware"); // Adicionando middleware de autenticação
const router = (0, express_1.Router)();
// Aplicar o middleware de autenticação a todas as rotas de temas
router.post('/themes', authMiddleware_1.authMiddleware, themeController_1.createTheme);
router.get('/themes', authMiddleware_1.authMiddleware, themeController_1.getThemes);
router.get('/themes/:id', authMiddleware_1.authMiddleware, themeController_1.getTheme);
router.patch('/themes/:id', authMiddleware_1.authMiddleware, themeController_1.updateTheme);
router.delete('/themes/:id', authMiddleware_1.authMiddleware, themeController_1.deleteTheme);
exports.default = router;
