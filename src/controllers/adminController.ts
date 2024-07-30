import { Request, Response } from 'express';
import logger from '../middlewares/logger';
import User from '../models/userModel'; // Importar o modelo de Usuário

// Função para obter estatísticas de usuários
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

// Função para obter estatísticas de relatórios
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

// Função para obter estatísticas de configurações
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

// Função para obter estatísticas de notificações
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

// Função para adicionar permissão a um usuário
export const addPermission = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { permission } = req.body;

    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).send({ error: 'User not found.' });
        }

        user.permissions.push(permission);
        await user.save();
        logger('info', `Permissão ${permission} adicionada ao usuário ${user.email}`);
        res.status(200).send({ message: 'Permission added successfully.', user });
    } catch (error) {
        logger('error', 'Erro ao adicionar permissão:', error);
        res.status(500).send({ error: 'Erro ao adicionar permissão.' });
    }
};

// Função para remover permissão de um usuário
export const removePermission = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { permission } = req.body;

    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).send({ error: 'User not found.' });
        }

        user.permissions = user.permissions.filter((perm) => perm !== permission);
        await user.save();
        logger('info', `Permissão ${permission} removida do usuário ${user.email}`);
        res.status(200).send({ message: 'Permission removed successfully.', user });
    } catch (error) {
        logger('error', 'Erro ao remover permissão:', error);
        res.status(500).send({ error: 'Erro ao remover permissão.' });
    }
};
