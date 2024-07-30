import { Request, Response } from 'express';
import logger from '../middlewares/logger';

export const getUserStats = async (req: Request, res: Response) => {
    try {
        const stats = { count: 100 }; // Simular um retorno de 100 usuários cadastrados
        logger('info', 'Estatísticas de usuários recuperadas com sucesso.');
        res.status(200).send(stats);
    } catch (error) {
        logger('error', 'Erro ao recuperar estatísticas de usuários:', error);
        res.status(500).send({ error: 'Erro ao recuperar estatísticas de usuários.' });
    }
};

export const getReportStats = async (req: Request, res: Response) => {
    try {
        const stats = { count: 50 }; // Simular um retorno de 50 relatórios gerados
        logger('info', 'Estatísticas de relatórios recuperadas com sucesso.');
        res.status(200).send(stats);
    } catch (error) {
        logger('error', 'Erro ao recuperar estatísticas de relatórios:', error);
        res.status(500).send({ error: 'Erro ao recuperar estatísticas de relatórios.' });
    }
};

export const getSettingsStats = async (req: Request, res: Response) => {
    try {
        const stats = { count: 20 }; // Simular um retorno de 20 configurações
        logger('info', 'Estatísticas de configurações recuperadas com sucesso.');
        res.status(200).send(stats);
    } catch (error) {
        logger('error', 'Erro ao recuperar estatísticas de configurações:', error);
        res.status(500).send({ error: 'Erro ao recuperar estatísticas de configurações.' });
    }
};

export const getNotificationStats = async (req: Request, res: Response) => {
    try {
        const stats = { count: 200 }; // Simular um retorno de 200 notificações enviadas
        logger('info', 'Estatísticas de notificações recuperadas com sucesso.');
        res.status(200).send(stats);
    } catch (error) {
        logger('error', 'Erro ao recuperar estatísticas de notificações:', error);
        res.status(500).send({ error: 'Erro ao recuperar estatísticas de notificações.' });
    }
};
