import { Request, Response } from 'express';
import admin from 'firebase-admin';
import logger from '../middlewares/logger'; // Adicionando middleware de logger

const db = admin.firestore();
const usersCollection = db.collection('users');

// Função para atualizar as preferências de tema do usuário
export const updateThemePreferences = async (req: Request, res: Response) => {
    const { userId } = req.params;
    const { primaryColor, secondaryColor, backgroundColor } = req.body;

    try {
        const docRef = usersCollection.doc(userId);
        const doc = await docRef.get();
        if (!doc.exists) {
            logger('error', `Usuário não encontrado: ${userId}`); // Adicionando log de erro
            return res.status(404).send({ error: 'Usuário não encontrado.' });
        }

        await docRef.update({
            themePreferences: { primaryColor, secondaryColor, backgroundColor }
        });

        logger('info', `Preferências de tema atualizadas para o usuário: ${userId}`); // Adicionando log de sucesso
        res.send({ primaryColor, secondaryColor, backgroundColor });
    } catch (error) {
        logger('error', 'Erro ao atualizar preferências de tema:', error); // Adicionando log de erro
        res.status(400).send(error);
    }
};
