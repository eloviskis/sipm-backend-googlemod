import { Router } from 'express';
import { getDashboardData } from '../controllers/dashboardController';
import { authMiddleware, permissionMiddleware } from '../middlewares/authMiddleware';

const router = Router();

router.get('/dashboard', authMiddleware, permissionMiddleware('ViewDashboard'), getDashboardData);

export default router;
