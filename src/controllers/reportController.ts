import { Request, Response } from 'express';
import admin from 'firebase-admin';
import logger from '../middlewares/logger'; // Adicionando middleware de logger
import { sendReportNotification } from '../services/reportNotificationService'; // Adicionando serviço de notificação
import { IUser } from '../models/user';

interface AuthRequest extends Request {
    user?: IUser;
}

const db = admin.firestore();
const reportsCollection = db.collection('reports');

// Função para criar um novo relatório
export const createReport = async (req: AuthRequest, res: Response) => {
    try {
        const report = req.body;
        const docRef = await reportsCollection.add(report);
        const savedReport = await docRef.get();

        logger('info', `Relatório criado: ${docRef.id}`);

        // Verificar se o email do usuário está disponível
        if (req.user && req.user.email) {
            await sendReportNotification(req.user.email, docRef.id);
        } else {
            logger('error', 'Email do usuário não encontrado para enviar notificação');
        }

        res.status(201).send({ id: docRef.id, ...savedReport.data() });
    } catch (error) {
        logger('error', 'Erro ao criar relatório:', error);
        res.status(400).send(error);
    }
};

// Função para obter todos os relatórios
export const getReports = async (req: Request, res: Response) => {
    try {
        const snapshot = await reportsCollection.get();
        const reports = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.send(reports);
    } catch (error) {
        logger('error', 'Erro ao obter relatórios:', error);
        res.status(500).send(error);
    }
};

// Função para obter um relatório específico
export const getReport = async (req: Request, res: Response) => {
    try {
        const doc = await reportsCollection.doc(req.params.id).get();
        if (!doc.exists) {
            logger('error', `Relatório não encontrado: ${req.params.id}`);
            return res.status(404).send();
        }
        res.send({ id: doc.id, ...doc.data() });
    } catch (error) {
        logger('error', 'Erro ao obter relatório:', error);
        res.status(500).send(error);
    }
};
