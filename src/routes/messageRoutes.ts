import { Router, Request, Response } from 'express';
import { sendMessage, getMessages } from '../controllers/messageController';
import { AuthRequest } from '../types'; // Certifique-se de que o caminho para o arquivo está correto

const router = Router();

router.post('/messages', (req: Request, res: Response) => sendMessage(req as AuthRequest, res));

router.get('/messages/:userId', (req: Request, res: Response) => getMessages(req as AuthRequest, res));

export default router;
