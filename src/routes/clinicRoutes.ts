import { Router } from 'express';
import { createClinic, updateClinic, getClinics, getClinic, deleteClinic } from '../controllers/clinicController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

router.post('/clinics', authMiddleware, createClinic);
router.get('/clinics', authMiddleware, getClinics);
router.get('/clinics/:id', authMiddleware, getClinic);
router.patch('/clinics/:id', authMiddleware, updateClinic);
router.delete('/clinics/:id', authMiddleware, deleteClinic);

export default router;
