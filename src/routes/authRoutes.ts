import { Router } from 'express';
import passport from 'passport';
import { configureMFA, verifyMFA } from '../controllers/mfaController';
import mfaMiddleware from '../middlewares/mfaMiddleware';
import { forgotPassword } from '../controllers/authController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { body, validationResult } from 'express-validator';

const router = Router();

// Função para lidar com validação de erros
const handleValidationErrors = (req: any, res: any, next: any) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

// Rota de autenticação com Google
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
        // Adicionar verificação de MFA
        mfaMiddleware(req, res, () => {
            res.redirect('/');
        });
    }
);

// Rota de autenticação com Facebook
router.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email'] }));
router.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/' }),
    (req, res) => {
        // Adicionar verificação de MFA
        mfaMiddleware(req, res, () => {
            res.redirect('/');
        });
    }
);

// Rota de autenticação com LinkedIn
router.get('/auth/linkedin', passport.authenticate('linkedin', { state: 'SOME STATE' }));
router.get('/auth/linkedin/callback', passport.authenticate('linkedin', { failureRedirect: '/' }),
    (req, res) => {
        // Adicionar verificação de MFA
        mfaMiddleware(req, res, () => {
            res.redirect('/');
        });
    }
);

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
