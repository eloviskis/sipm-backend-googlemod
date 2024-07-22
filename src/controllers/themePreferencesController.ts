import { Request, Response } from 'express';
import User from '../models/user';
import logger from '../middlewares/logger'; // Adicionando middleware de logger

// Função para atualizar as preferências de tema do usuário
export const updateThemePreferences = async (req: Request, res: Response) => {
    const { userId } = req.params;
    const { primaryColor, secondaryColor, backgroundColor } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) {
            logger('error', `Usuário não encontrado: ${userId}`); // Adicionando log de erro
            return res.status(404).send({ error: 'Usuário não encontrado.' });
        }

        user.themePreferences = { primaryColor, secondaryColor, backgroundColor };
        await user.save();

        logger('info', `Preferências de tema atualizadas para o usuário: ${userId}`); // Adicionando log de sucesso
        res.send(user.themePreferences);
    } catch (error) {
        logger('error', 'Erro ao atualizar preferências de tema:', error); // Adicionando log de erro
        res.status(400).send(error);
    }
};
