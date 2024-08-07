"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const passport_1 = __importDefault(require("passport"));
const authController_1 = require("../controllers/authController");
const mfaController_1 = require("../controllers/mfaController");
const mfaMiddleware_1 = __importDefault(require("../middlewares/mfaMiddleware"));
const authMiddleware_1 = require("../middlewares/authMiddleware");
const express_validator_1 = require("express-validator");
const router = (0, express_1.Router)();
const handleValidationErrors = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};
// Rotas de autenticação com Google, Facebook, LinkedIn
router.get('/auth/google', passport_1.default.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/auth/google/callback', passport_1.default.authenticate('google', { failureRedirect: '/' }), (req, res) => {
    (0, mfaMiddleware_1.default)(req, res, () => {
        res.redirect('/');
    });
});
router.get('/auth/facebook', passport_1.default.authenticate('facebook', { scope: ['email'] }));
router.get('/auth/facebook/callback', passport_1.default.authenticate('facebook', { failureRedirect: '/' }), (req, res) => {
    (0, mfaMiddleware_1.default)(req, res, () => {
        res.redirect('/');
    });
});
router.get('/auth/linkedin', passport_1.default.authenticate('linkedin', { state: 'SOME STATE' }));
router.get('/auth/linkedin/callback', passport_1.default.authenticate('linkedin', { failureRedirect: '/' }), (req, res) => {
    (0, mfaMiddleware_1.default)(req, res, () => {
        res.redirect('/');
    });
});
// Rotas para login e verificação de autenticação
router.post('/api/auth/login', [
    (0, express_validator_1.body)('email').isEmail().withMessage('Email inválido'),
    (0, express_validator_1.body)('password').isLength({ min: 6 }).withMessage('Senha deve ter pelo menos 6 caracteres')
], handleValidationErrors, authController_1.login);
router.get('/api/auth/check-auth', authMiddleware_1.authMiddleware, authController_1.checkAuth);
// Rotas para configurar e verificar MFA
router.post('/auth/mfa/setup', authMiddleware_1.authMiddleware, [
    (0, express_validator_1.body)('phoneNumber').isMobilePhone().withMessage('Número de telefone inválido')
], handleValidationErrors, mfaController_1.configureMFA);
router.post('/auth/mfa/verify', authMiddleware_1.authMiddleware, [
    (0, express_validator_1.body)('token').isLength({ min: 6, max: 6 }).withMessage('Token MFA inválido')
], handleValidationErrors, mfaController_1.verifyMFA);
// Rota para recuperação de senha
router.post('/forgot-password', [
    (0, express_validator_1.body)('email').isEmail().withMessage('Email inválido')
], handleValidationErrors, authController_1.forgotPassword);
exports.default = router;
