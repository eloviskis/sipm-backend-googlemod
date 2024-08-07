import { Router } from 'express';
import { createMotivo, getMotivos, getMotivo, updateMotivo, deleteMotivo } from '../controllers/motivoController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

router.post('/motivos', authMiddleware, createMotivo);
router.get('/motivos', authMiddleware, getMotivos);
router.get('/motivos/:id', authMiddleware, getMotivo);
router.patch('/motivos/:id', authMiddleware, updateMotivo);
router.delete('/motivos/:id', authMiddleware, deleteMotivo);

export default router;
