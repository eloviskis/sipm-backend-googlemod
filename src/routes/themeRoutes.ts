import { Router } from 'express';
import {
    createTheme,
    getThemes,
    getTheme,
    updateTheme,
    deleteTheme
} from '../controllers/themeController';
import { authMiddleware } from '../middlewares/authMiddleware'; // Adicionando middleware de autenticação

const router = Router();

// Aplicar o middleware de autenticação a todas as rotas de temas
router.post('/themes', authMiddleware, createTheme);
router.get('/themes', authMiddleware, getThemes);
router.get('/themes/:id', authMiddleware, getTheme);
router.patch('/themes/:id', authMiddleware, updateTheme);
router.delete('/themes/:id', authMiddleware, deleteTheme);

export default router;
