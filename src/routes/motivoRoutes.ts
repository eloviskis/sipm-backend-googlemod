import { Router } from 'express';
import { createMotivo, getMotivos, getMotivo, updateMotivo, deleteMotivo } from '../controllers/motivoController';

const router = Router();

router.post('/motivos', createMotivo);
router.get('/motivos', getMotivos);
router.get('/motivos/:id', getMotivo);
router.patch('/motivos/:id', updateMotivo);
router.delete('/motivos/:id', deleteMotivo);

export default router;
