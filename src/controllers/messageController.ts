import { Request, Response } from 'express';
import Message, { IMessage } from '../models/message';
import logger from '../middlewares/logger'; // Adicionando middleware de logger

// Interface estendida para incluir user no Request
interface AuthRequest extends Request {
    user?: {
        _id: string;
    };
}

// Função para enviar uma mensagem
export const sendMessage = async (req: AuthRequest, res: Response) => {
    try {
        const message: IMessage = new Message(req.body);
        const savedMessage = await message.save();

        logger('info', `Mensagem enviada: ${savedMessage._id}`); // Adicionando log de envio de mensagem
        res.status(201).send(savedMessage);
    } catch (error) {
        logger('error', 'Erro ao enviar mensagem:', error); // Adicionando log de erro
        res.status(400).send(error);
    }
};

// Função para obter mensagens de um usuário específico
export const getMessages = async (req: AuthRequest, res: Response) => {
    try {
        if (!req.user) {
            return res.status(401).send({ error: 'Usuário não autenticado' });
        }

        const userId = req.params.userId;

        // Verificar se o usuário autenticado está tentando acessar suas próprias mensagens
        if (req.user._id !== userId) {
            return res.status(403).send({ error: 'Acesso negado' });
        }

        const messages = await Message.find({ to: userId });

        logger('info', `Mensagens obtidas para o usuário: ${userId}`); // Adicionando log de obtenção de mensagens
        res.send(messages);
    } catch (error) {
        logger('error', 'Erro ao obter mensagens:', error); // Adicionando log de erro
        res.status(500).send(error);
    }
};
