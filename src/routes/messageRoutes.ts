import { Router, Request, Response } from 'express';
import { sendMessage, getMessages } from '../controllers/messageController';
import { AuthRequest } from '../types'; // Certifique-se de que o caminho para o arquivo está correto
import { authMiddleware, permissionMiddleware } from '../middlewares/authMiddleware';

const router = Router();

router.post('/messages', authMiddleware, permissionMiddleware('SendMessage'), (req: AuthRequest, res: Response) => sendMessage(req, res));
router.get('/messages/:userId', authMiddleware, permissionMiddleware('ViewMessages'), (req: AuthRequest, res: Response) => getMessages(req, res));

export default router;
