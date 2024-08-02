import { Request, Response } from 'express';
import admin from 'firebase-admin';
import logger from '../middlewares/logger'; // Adicionando middleware de logger
import { IUser } from '../models/user'; // Assegurando que IUser seja importado

// Interface estendida para incluir user no Request
interface AuthRequest extends Request {
    user?: IUser;
}

const db = admin.firestore();
const messagesCollection = db.collection('messages');

// Função para enviar uma mensagem
export const sendMessage = async (req: AuthRequest, res: Response) => {
    try {
        const message = req.body;
        const docRef = await messagesCollection.add(message);
        const savedMessage = await docRef.get();

        logger('info', `Mensagem enviada: ${docRef.id}`); // Adicionando log de envio de mensagem
        res.status(201).send({ id: docRef.id, ...savedMessage.data() });
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

        const snapshot = await messagesCollection.where('to', '==', userId).get();
        const messages = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        logger('info', `Mensagens obtidas para o usuário: ${userId}`); // Adicionando log de obtenção de mensagens
        res.send(messages);
    } catch (error) {
        logger('error', 'Erro ao obter mensagens:', error); // Adicionando log de erro
        res.status(500).send(error);
    }
};
