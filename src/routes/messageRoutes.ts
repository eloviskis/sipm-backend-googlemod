import { Router } from 'express';
import { sendMessage, getMessages } from '../controllers/messageController';

const router = Router();

router.post('/messages', sendMessage);
router.get('/messages/:userId', getMessages);

export default router;
