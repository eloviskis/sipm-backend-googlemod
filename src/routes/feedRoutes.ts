import { Router } from 'express';
import { getFeedItems, createFeedItem } from '../controllers/feedController';
import { authMiddleware, permissionMiddleware } from '../middlewares/authMiddleware';

const router = Router();

router.get('/feed', authMiddleware, permissionMiddleware('ViewFeed'), getFeedItems);
router.post('/feed', authMiddleware, permissionMiddleware('ManageFeed'), createFeedItem);

export default router;
