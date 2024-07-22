import { Request, Response } from 'express';
import Notification, { INotification } from '../models/notification';
import logger from '../middlewares/logger'; // Adicionando middleware de logger

// Função para criar uma nova notificação
export const createNotification = async (req: Request, res: Response) => {
    try {
        const notification: INotification = new Notification(req.body);
        const savedNotification = await notification.save();

        logger('info', `Notificação criada: ${savedNotification._id}`); // Adicionando log de criação de notificação
        res.status(201).send(savedNotification);
    } catch (error) {
        logger('error', 'Erro ao criar notificação:', error); // Adicionando log de erro
        res.status(400).send(error);
    }
};

// Função para obter todas as notificações
export const getNotifications = async (req: Request, res: Response) => {
    try {
        const notifications = await Notification.find({});
        res.send(notifications);
    } catch (error) {
        logger('error', 'Erro ao obter notificações:', error); // Adicionando log de erro
        res.status(500).send(error);
    }
};

// Função para obter uma notificação específica
export const getNotification = async (req: Request, res: Response) => {
    try {
        const notification = await Notification.findById(req.params.id);
        if (!notification) {
            logger('error', `Notificação não encontrada: ${req.params.id}`); // Adicionando log de erro
            return res.status(404).send();
        }
        res.send(notification);
    } catch (error) {
        logger('error', 'Erro ao obter notificação:', error); // Adicionando log de erro
        res.status(500).send(error);
    }
};

// Função para deletar uma notificação específica
export const deleteNotification = async (req: Request, res: Response) => {
    try {
        const notification = await Notification.findByIdAndDelete(req.params.id);
        if (!notification) {
            logger('error', `Notificação não encontrada: ${req.params.id}`); // Adicionando log de erro
            return res.status(404).send();
        }
        logger('info', `Notificação deletada: ${notification._id}`); // Adicionando log de deleção de notificação
        res.send(notification);
    } catch (error) {
        logger('error', 'Erro ao deletar notificação:', error); // Adicionando log de erro
        res.status(500).send(error);
    }
};
