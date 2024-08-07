import { Router } from 'express';
import { createUser, updateUser, deleteUser } from '../controllers/userController';
import { authMiddleware } from '../middlewares/authMiddleware'; // Adicionando middleware de autenticação

const router = Router();

// Aplicar o middleware de autenticação a todas as rotas de usuários
router.post('/users', authMiddleware, createUser);
router.patch('/users/:id', authMiddleware, updateUser);
router.delete('/users/:id', authMiddleware, deleteUser);

export default router;
