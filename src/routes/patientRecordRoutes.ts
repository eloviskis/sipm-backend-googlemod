import { Router } from 'express';
import { createPatientRecord, getPatientRecords, getPatientRecord, updatePatientRecord, deletePatientRecord } from '../controllers/patientRecordController';

const router = Router();

router.post('/patient-records', createPatientRecord);
router.get('/patient-records', getPatientRecords);
router.get('/patient-records/:id', getPatientRecord);
router.patch('/patient-records/:id', updatePatientRecord);
router.delete('/patient-records/:id', deletePatientRecord);

export default router;
