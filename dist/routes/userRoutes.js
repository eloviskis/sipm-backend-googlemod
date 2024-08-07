"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const authMiddleware_1 = require("../middlewares/authMiddleware"); // Adicionando middleware de autenticação
const router = (0, express_1.Router)();
// Aplicar o middleware de autenticação a todas as rotas de usuários
router.post('/users', authMiddleware_1.authMiddleware, userController_1.createUser);
router.patch('/users/:id', authMiddleware_1.authMiddleware, userController_1.updateUser);
router.delete('/users/:id', authMiddleware_1.authMiddleware, userController_1.deleteUser);
exports.default = router;
