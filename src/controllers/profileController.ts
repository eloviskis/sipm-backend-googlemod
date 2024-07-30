import { Request, Response } from 'express';
import User from '../models/user';
import logger from '../middlewares/logger';

interface AuthenticatedRequest extends Request {
    user?: {
        _id: string;
        name: string;
        email: string;
    };
}

// Função para obter o perfil do usuário
export const getProfile = async (req: AuthenticatedRequest, res: Response) => {
    try {
        if (!req.user) {
            logger('error', 'Usuário não autenticado');
            return res.status(401).send({ error: 'Usuário não autenticado' });
        }

        const userId = req.user._id;
        const user = await User.findById(userId);

        if (!user) {
            logger('error', `Usuário não encontrado: ${userId}`);
            return res.status(404).send({ error: 'Usuário não encontrado' });
        }

        logger('info', `Perfil obtido para o usuário: ${userId}`);
        res.send({ name: user.name, email: user.email });
    } catch (error) {
        logger('error', 'Erro ao obter perfil do usuário:', error);
        res.status(500).send({ error: 'Erro ao obter perfil do usuário' });
    }
};

// Função para atualizar o perfil do usuário
export const updateProfile = async (req: AuthenticatedRequest, res: Response) => {
    try {
        if (!req.user) {
            logger('error', 'Usuário não autenticado');
            return res.status(401).send({ error: 'Usuário não autenticado' });
        }

        const userId = req.user._id;
        const updates = Object.keys(req.body);
        const allowedUpdates = ['name', 'email'];
        const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

        if (!isValidOperation) {
            return res.status(400).send({ error: 'Atualizações inválidas!' });
        }

        const user = await User.findById(userId);
        if (!user) {
            logger('error', `Usuário não encontrado: ${userId}`);
            return res.status(404).send({ error: 'Usuário não encontrado' });
        }

        updates.forEach((update) => {
            if (update in user) {
                (user as any)[update] = req.body[update];
            }
        });

        await user.save();

        logger('info', `Perfil atualizado para o usuário: ${userId}`);
        res.send({ name: user.name, email: user.email });
    } catch (error) {
        logger('error', 'Erro ao atualizar perfil do usuário:', error);
        res.status(500).send({ error: 'Erro ao atualizar perfil do usuário' });
    }
};
