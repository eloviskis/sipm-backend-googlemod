import { Request, Response } from 'express';
import Appointment from '../models/appointment';
import { sendAppointmentConfirmation, sendAppointmentReminder } from '../services/notificationService';
import { integrateWithGoogleCalendar, integrateWithOutlookCalendar } from '../services/calendarIntegrationService';
import logger from '../middlewares/logger'; // Adicionando middleware de logger

// Função para criar um novo agendamento
export const createAppointment = async (req: Request, res: Response) => {
    try {
        const appointment = new Appointment(req.body);
        await appointment.save();

        // Enviar confirmação de agendamento
        sendAppointmentConfirmation(req.body.email, req.body.date);

        // Integração com Google Calendar e Outlook Calendar
        integrateWithGoogleCalendar(appointment);
        integrateWithOutlookCalendar(appointment);

        logger.info(`Agendamento criado: ${appointment._id}`); // Adicionando log de criação de agendamento
        res.status(201).send(appointment);
    } catch (error) {
        logger.error('Erro ao criar agendamento:', error); // Adicionando log de erro
        res.status(400).send(error);
    }
};

// Função para obter todos os agendamentos
export const getAppointments = async (req: Request, res: Response) => {
    try {
        const appointments = await Appointment.find({});
        res.send(appointments);
    } catch (error) {
        logger.error('Erro ao obter agendamentos:', error); // Adicionando log de erro
        res.status(500).send(error);
    }
};

// Função para obter um agendamento específico
export const getAppointment = async (req: Request, res: Response) => {
    try {
        const appointment = await Appointment.findById(req.params.id);
        if (!appointment) {
            return res.status(404).send();
        }
        res.send(appointment);
    } catch (error) {
        logger.error('Erro ao obter agendamento:', error); // Adicionando log de erro
        res.status(500).send(error);
    }
};

// Função para atualizar um agendamento
export const updateAppointment = async (req: Request, res: Response) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['date', 'status'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Atualizações inválidas!' });
    }

    try {
        const appointment: any = await Appointment.findById(req.params.id);
        if (!appointment) {
            return res.status(404).send();
        }
        updates.forEach((update) => (appointment[update as keyof typeof appointment] = req.body[update]));
        await appointment.save();

        logger.info(`Agendamento atualizado: ${appointment._id}`); // Adicionando log de atualização de agendamento
        res.send(appointment);
    } catch (error) {
        logger.error('Erro ao atualizar agendamento:', error); // Adicionando log de erro
        res.status(400).send(error);
    }
};

// Função para deletar um agendamento
export const deleteAppointment = async (req: Request, res: Response) => {
    try {
        const appointment = await Appointment.findByIdAndDelete(req.params.id);
        if (!appointment) {
            return res.status(404).send();
        }

        logger.info(`Agendamento deletado: ${appointment._id}`); // Adicionando log de exclusão de agendamento
        res.send(appointment);
    } catch (error) {
        logger.error('Erro ao deletar agendamento:', error); // Adicionando log de erro
        res.status(500).send(error);
    }
};

// Função para enviar lembretes de agendamento
export const sendReminder = async (req: Request, res: Response) => {
    try {
        const appointment = await Appointment.findById(req.params.id);
        if (!appointment) {
            return res.status(404).send();
        }
        sendAppointmentReminder(req.body.email, appointment.date);
        logger.info(`Lembrete enviado para o agendamento: ${appointment._id}`); // Adicionando log de envio de lembrete
        res.send({ message: 'Lembrete enviado com sucesso' });
    } catch (error) {
        logger.error('Erro ao enviar lembrete:', error); // Adicionando log de erro
        res.status(500).send(error);
    }
};
