import { Router } from 'express';
import passport from 'passport';
import { configureMFA, verifyMFA } from '../controllers/mfaController';
import mfaMiddleware from '../middlewares/mfaMiddleware';
import { forgotPassword } from '../controllers/authController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

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
router.post('/auth/mfa/setup', authMiddleware, configureMFA);
router.post('/auth/mfa/verify', authMiddleware, verifyMFA);

router.post('/forgot-password', forgotPassword);

export default router;
