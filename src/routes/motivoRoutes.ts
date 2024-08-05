import { Router } from 'express';
import { createMotivo, getMotivos, getMotivo, updateMotivo, deleteMotivo } from '../controllers/motivoController';
import { authMiddleware, permissionMiddleware } from '../middlewares/authMiddleware';

const router = Router();

router.post('/motivos', authMiddleware, permissionMiddleware('CreateMotivo'), createMotivo);
router.get('/motivos', authMiddleware, permissionMiddleware('ViewMotivos'), getMotivos);
router.get('/motivos/:id', authMiddleware, permissionMiddleware('ViewMotivo'), getMotivo);
router.patch('/motivos/:id', authMiddleware, permissionMiddleware('UpdateMotivo'), updateMotivo);
router.delete('/motivos/:id', authMiddleware, permissionMiddleware('DeleteMotivo'), deleteMotivo);

export default router;
