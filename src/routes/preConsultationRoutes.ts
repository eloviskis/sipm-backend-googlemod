import { Router } from 'express';
import { createPreConsultation, getPreConsultations, getPreConsultation, updatePreConsultation, deletePreConsultation } from '../controllers/preConsultationController';
import { authMiddleware, permissionMiddleware } from '../middlewares/authMiddleware';

const router = Router();

router.post('/pre-consultations', authMiddleware, permissionMiddleware('CreatePreConsultation'), createPreConsultation);
router.get('/pre-consultations', authMiddleware, permissionMiddleware('ViewPreConsultations'), getPreConsultations);
router.get('/pre-consultations/:id', authMiddleware, permissionMiddleware('ViewPreConsultation'), getPreConsultation);
router.patch('/pre-consultations/:id', authMiddleware, permissionMiddleware('UpdatePreConsultation'), updatePreConsultation);
router.delete('/pre-consultations/:id', authMiddleware, permissionMiddleware('DeletePreConsultation'), deletePreConsultation);

export default router;
