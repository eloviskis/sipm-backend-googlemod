import { Router } from 'express';
import { createPatientRecord, getPatientRecords, getPatientRecord, updatePatientRecord, deletePatientRecord } from '../controllers/patientRecordController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

router.post('/patient-records', authMiddleware, createPatientRecord);
router.get('/patient-records', authMiddleware, getPatientRecords);
router.get('/patient-records/:id', authMiddleware, getPatientRecord);
router.patch('/patient-records/:id', authMiddleware, updatePatientRecord);
router.delete('/patient-records/:id', authMiddleware, deletePatientRecord);

export default router;
