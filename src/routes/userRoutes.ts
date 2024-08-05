import { Router } from 'express';
import { createUser, updateUser, deleteUser } from '../controllers/userController';
import { authMiddleware, permissionMiddleware } from '../middlewares/authMiddleware'; // Adicionando middleware de autenticação e permissões

const router = Router();

// Aplicar o middleware de autenticação a todas as rotas de usuários
router.post('/users', authMiddleware, permissionMiddleware('CreateUser'), createUser);
router.patch('/users/:id', authMiddleware, permissionMiddleware('UpdateUser'), updateUser);
router.delete('/users/:id', authMiddleware, permissionMiddleware('DeleteUser'), deleteUser);

export default router;
