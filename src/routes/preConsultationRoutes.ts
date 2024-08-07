import { Router } from 'express';
import { createPreConsultation, getPreConsultations, getPreConsultation, updatePreConsultation, deletePreConsultation } from '../controllers/preConsultationController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

router.post('/pre-consultations', authMiddleware, createPreConsultation);
router.get('/pre-consultations', authMiddleware, getPreConsultations);
router.get('/pre-consultations/:id', authMiddleware, getPreConsultation);
router.patch('/pre-consultations/:id', authMiddleware, updatePreConsultation);
router.delete('/pre-consultations/:id', authMiddleware, deletePreConsultation);

export default router;
