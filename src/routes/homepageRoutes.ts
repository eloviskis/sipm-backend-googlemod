import { Router } from 'express';
import { getHomepageContent } from '../controllers/homepageController';

const router = Router();

router.get('/homepage-content', getHomepageContent);

export default router;
