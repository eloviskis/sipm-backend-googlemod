import { Router } from 'express';
import { getUserStats, getReportStats, getSettingsStats, getNotificationStats } from '../controllers/adminController';

const router = Router();

router.get('/admin/users/stats', getUserStats);
router.get('/admin/reports/stats', getReportStats);
router.get('/admin/settings/stats', getSettingsStats);
router.get('/admin/notifications/stats', getNotificationStats);

export default router;
