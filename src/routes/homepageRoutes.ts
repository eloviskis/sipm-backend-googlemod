import { Router } from 'express';
import { getHomepageContent } from '../controllers/homepageController';
import { authMiddleware, permissionMiddleware } from '../middlewares/authMiddleware';

const router = Router();

router.get('/homepage-content', authMiddleware, permissionMiddleware('ViewHomePageContent'), getHomepageContent);

export default router;
