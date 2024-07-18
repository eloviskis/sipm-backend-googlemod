import { Router } from 'express';
import { createClinic, updateClinic, getClinics, getClinic, deleteClinic } from '../controllers/clinicController';

const router = Router();

router.post('/clinics', createClinic);
router.get('/clinics', getClinics);
router.get('/clinics/:id', getClinic);
router.patch('/clinics/:id', updateClinic);
router.delete('/clinics/:id', deleteClinic);

export default router;
