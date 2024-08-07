import { Router, RequestHandler } from 'express';
import { sendMessage } from '../controllers/whatsappController';
import { authMiddleware } from '../middlewares/authMiddleware'; // Adicionando middleware de autenticação

const router = Router();

// Aplicar o middleware de autenticação à rota de envio de mensagem no WhatsApp
router.post('/whatsapp/send', authMiddleware as RequestHandler, sendMessage);

export default router;
