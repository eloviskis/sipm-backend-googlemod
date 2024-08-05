import { Router } from 'express';
import { getHomePageContent, updateHomePageContent } from '../controllers/homePageContentController';
import { authMiddleware, permissionMiddleware } from '../middlewares/authMiddleware';

const router = Router();

router.get('/', getHomePageContent);
router.post('/', authMiddleware, permissionMiddleware('ManageHomePageContent'), updateHomePageContent);

export default router;
