import { Request, Response } from 'express';
import Report, { IReport } from '../models/report';
import logger from '../middlewares/logger'; // Adicionando middleware de logger
import { sendReportNotification } from '../services/reportNotificationService'; // Adicionando serviço de notificação

interface AuthRequest extends Request {
    user?: {
        email?: string;
        [key: string]: any;
    };
}

// Função para criar um novo relatório
export const createReport = async (req: AuthRequest, res: Response) => {
    try {
        const report: IReport = new Report(req.body);
        const savedReport = await report.save();

        logger('info', `Relatório criado: ${savedReport._id}`, {}); // Adicionando log de criação de relatório

        // Verificar se o email do usuário está disponível
        if (req.user && req.user.email) {
            await sendReportNotification(req.user.email, savedReport._id.toString());
        } else {
            logger('error', 'Email do usuário não encontrado para enviar notificação', {});
        }

        res.status(201).send(savedReport);
    } catch (error) {
        logger('error', 'Erro ao criar relatório:', error); // Adicionando log de erro
        res.status(400).send(error);
    }
};

// Função para obter todos os relatórios
export const getReports = async (req: Request, res: Response) => {
    try {
        const reports = await Report.find({});
        res.send(reports);
    } catch (error) {
        logger('error', 'Erro ao obter relatórios:', error); // Adicionando log de erro
        res.status(500).send(error);
    }
};

// Função para obter um relatório específico
export const getReport = async (req: Request, res: Response) => {
    try {
        const report = await Report.findById(req.params.id);
        if (!report) {
            logger('error', `Relatório não encontrado: ${req.params.id}`, {}); // Adicionando log de erro
            return res.status(404).send();
        }
        res.send(report);
    } catch (error) {
        logger('error', 'Erro ao obter relatório:', error); // Adicionando log de erro
        res.status(500).send(error);
    }
};
