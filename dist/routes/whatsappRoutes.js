"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const whatsappController_1 = require("../controllers/whatsappController");
const authMiddleware_1 = require("../middlewares/authMiddleware"); // Adicionando middleware de autenticação
const router = (0, express_1.Router)();
// Aplicar o middleware de autenticação à rota de envio de mensagem no WhatsApp
router.post('/whatsapp/send', authMiddleware_1.authMiddleware, whatsappController_1.sendMessage);
exports.default = router;
