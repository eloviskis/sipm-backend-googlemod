import { Router } from 'express';
import { getFeedItems, createFeedItem } from '../controllers/feedController';

const router = Router();

router.get('/feed', getFeedItems);
router.post('/feed', createFeedItem);

export default router;
