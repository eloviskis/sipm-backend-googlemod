import { Request, Response } from 'express';
import admin from 'firebase-admin';

const db = admin.firestore();
const homePageContentDoc = db.collection('homePageContent').doc('mainContent');

// Função para obter o conteúdo da página inicial
export const getHomePageContent = async (req: Request, res: Response) => {
    try {
        const doc = await homePageContentDoc.get();
        if (!doc.exists) {
            return res.status(404).json({ message: 'Conteúdo da página inicial não encontrado' });
        }
        res.json({ id: doc.id, ...doc.data() });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao obter conteúdo da página inicial' });
    }
};

// Função para atualizar o conteúdo da página inicial
export const updateHomePageContent = async (req: Request, res: Response) => {
    try {
        await homePageContentDoc.set(req.body, { merge: true });
        const updatedDoc = await homePageContentDoc.get();
        res.json({ id: updatedDoc.id, ...updatedDoc.data() });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar conteúdo da página inicial' });
    }
};
