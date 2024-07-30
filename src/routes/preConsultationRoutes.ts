import { Router } from 'express';
import { createPreConsultation, getPreConsultations, getPreConsultation, updatePreConsultation, deletePreConsultation } from '../controllers/preConsultationController';

const router = Router();

router.post('/pre-consultations', createPreConsultation);
router.get('/pre-consultations', getPreConsultations);
router.get('/pre-consultations/:id', getPreConsultation);
router.patch('/pre-consultations/:id', updatePreConsultation);
router.delete('/pre-consultations/:id', deletePreConsultation);

export default router;
