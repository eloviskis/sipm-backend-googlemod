import { Router } from 'express';
import { updateThemePreferences } from '../controllers/themePreferencesController';
import { authMiddleware } from '../middlewares/authMiddleware'; // Adicionando middleware de autenticação

const router = Router();

// Aplicar o middleware de autenticação à rota de atualização de preferências de tema
router.patch('/theme-preferences/:userId', authMiddleware, updateThemePreferences);

export default router;
