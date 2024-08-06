import { Router } from 'express';
import passport from 'passport';
import { login, checkAuth, forgotPassword } from '../controllers/authController';
import { configureMFA, verifyMFA } from '../controllers/mfaController';
import mfaMiddleware from '../middlewares/mfaMiddleware';
import { authMiddleware } from '../middlewares/authMiddleware';
import { body, validationResult } from 'express-validator';

const router = Router();

const handleValidationErrors = (req: any, res: any, next: any) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

// Rotas de autenticação com Google, Facebook, LinkedIn
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
        mfaMiddleware(req, res, () => {
            res.redirect('/');
        });
    }
);
router.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email'] }));
router.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/' }),
    (req, res) => {
        mfaMiddleware(req, res, () => {
            res.redirect('/');
        });
    }
);
router.get('/auth/linkedin', passport.authenticate('linkedin', { state: 'SOME STATE' }));
router.get('/auth/linkedin/callback', passport.authenticate('linkedin', { failureRedirect: '/' }),
    (req, res) => {
        mfaMiddleware(req, res, () => {
            res.redirect('/');
        });
    }
);

// Rotas para login e verificação de autenticação
router.post('/api/auth/login', 
    [
        body('email').isEmail().withMessage('Email inválido'),
        body('password').isLength({ min: 6 }).withMessage('Senha deve ter pelo menos 6 caracteres')
    ], 
    handleValidationErrors, 
    login
);

router.get('/api/auth/check-auth', authMiddleware, checkAuth);

// Rotas para configurar e verificar MFA
router.post('/auth/mfa/setup', 
    authMiddleware, 
    [
        body('phoneNumber').isMobilePhone().withMessage('Número de telefone inválido')
    ], 
    handleValidationErrors, 
    configureMFA
);

router.post('/auth/mfa/verify', 
    authMiddleware, 
    [
        body('token').isLength({ min: 6, max: 6 }).withMessage('Token MFA inválido')
    ], 
    handleValidationErrors, 
    verifyMFA
);

// Rota para recuperação de senha
router.post('/forgot-password', 
    [
        body('email').isEmail().withMessage('Email inválido')
    ], 
    handleValidationErrors, 
    forgotPassword
);

export default router;
