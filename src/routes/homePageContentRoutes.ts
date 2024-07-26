import { Router } from 'express';
import { getHomePageContent, updateHomePageContent } from '../controllers/homePageContentController';

const router = Router();

router.get('/', getHomePageContent);
router.post('/', updateHomePageContent);

export default router;
