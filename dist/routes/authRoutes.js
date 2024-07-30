"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const passport_1 = __importDefault(require("passport"));
const mfaController_1 = require("../controllers/mfaController"); // Adicionando controlador de MFA
const mfaMiddleware_1 = __importDefault(require("../middlewares/mfaMiddleware")); // Middleware para MFA
const authController_1 = require("../controllers/authController");
const router = (0, express_1.Router)();
// Rota de autenticação com Google
router.get('/auth/google', passport_1.default.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/auth/google/callback', passport_1.default.authenticate('google', { failureRedirect: '/' }), (req, res) => {
    // Adicionar verificação de MFA
    (0, mfaMiddleware_1.default)(req, res, () => {
        res.redirect('/');
    });
});
// Rota de autenticação com Facebook
router.get('/auth/facebook', passport_1.default.authenticate('facebook', { scope: ['email'] }));
router.get('/auth/facebook/callback', passport_1.default.authenticate('facebook', { failureRedirect: '/' }), (req, res) => {
    // Adicionar verificação de MFA
    (0, mfaMiddleware_1.default)(req, res, () => {
        res.redirect('/');
    });
});
// Rota de autenticação com LinkedIn
router.get('/auth/linkedin', passport_1.default.authenticate('linkedin', { state: 'SOME STATE' }));
router.get('/auth/linkedin/callback', passport_1.default.authenticate('linkedin', { failureRedirect: '/' }), (req, res) => {
    // Adicionar verificação de MFA
    (0, mfaMiddleware_1.default)(req, res, () => {
        res.redirect('/');
    });
});
// Rotas para configurar e verificar MFA
router.post('/auth/mfa/setup', mfaController_1.configureMFA);
router.post('/auth/mfa/verify', mfaController_1.verifyMFA);
router.post('/forgot-password', authController_1.forgotPassword);
exports.default = router;
