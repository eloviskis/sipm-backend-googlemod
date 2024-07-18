import { Router } from 'express';
import { createUser, updateUser, deleteUser } from '../controllers/userController';

const router = Router();

router.post('/users', createUser);
router.patch('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

export default router;
