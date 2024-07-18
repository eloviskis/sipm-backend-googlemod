import { Router } from 'express';
import { createReport, getReports, getReport } from '../controllers/reportController';

const router = Router();

router.post('/reports', createReport);
router.get('/reports', getReports);
router.get('/reports/:id', getReport);

export default router;
