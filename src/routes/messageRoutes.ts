import { Router, Request, Response } from 'express';
import { sendMessage, getMessages } from '../controllers/messageController';
import { AuthRequest } from '../types'; // Certifique-se de que o caminho para o arquivo está correto

const router = Router();

router.post('/messages', (req: AuthRequest, res: Response) => sendMessage(req, res));

router.get('/messages/:userId', (req: AuthRequest, res: Response) => getMessages(req, res));

export default router;
