"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const paymentController_1 = require("../controllers/paymentController");
const authMiddleware_1 = require("../middlewares/authMiddleware"); // Correção na importação
const router = (0, express_1.Router)();
// Middleware de autenticação
router.use(authMiddleware_1.authMiddleware);
// Rotas de pagamento
router.post('/payments', paymentController_1.createPayment);
router.get('/payments', paymentController_1.getPayments);
router.get('/payments/:id', paymentController_1.getPayment);
router.delete('/payments/:id', paymentController_1.deletePayment);
exports.default = router;
