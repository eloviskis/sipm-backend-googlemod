import { Request, Response } from 'express';
import Appointment from '../models/appointment';
import { sendAppointmentConfirmation, sendAppointmentReminder } from '../services/notificationService';
import { integrateWithGoogleCalendar, integrateWithOutlookCalendar } from '../services/calendarIntegrationService';

export const createAppointment = async (req: Request, res: Response) => {
    try {
        const appointment = new Appointment(req.body);
        await appointment.save();
        // Adicionando notificação de confirmação
        sendAppointmentConfirmation(req.body.email, req.body.date);
        // Integração com calendários
        integrateWithGoogleCalendar(appointment);
        integrateWithOutlookCalendar(appointment);
        res.status(201).send(appointment);
    } catch (error) {
        res.status(400).send(error);
    }
};

export const getAppointments = async (req: Request, res: Response) => {
    try {
        const appointments = await Appointment.find({});
        res.send(appointments);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const getAppointment = async (req: Request, res: Response) => {
    try {
        const appointment = await Appointment.findById(req.params.id);
        if (!appointment) {
            return res.status(404).send();
        }
        res.send(appointment);
    } catch (error) {
        res.status(500).send(error);
    }
};

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
        res.send(appointment);
    } catch (error) {
        res.status(400).send(error);
    }
};

export const deleteAppointment = async (req: Request, res: Response) => {
    try {
        const appointment = await Appointment.findByIdAndDelete(req.params.id);
        if (!appointment) {
            return res.status(404).send();
        }
        res.send(appointment);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Adicionando a função para enviar lembretes de agendamento
export const sendReminder = async (req: Request, res: Response) => {
    try {
        const appointment = await Appointment.findById(req.params.id);
        if (!appointment) {
            return res.status(404).send();
        }
        sendAppointmentReminder(appointment.email, appointment.date);
        res.send({ message: 'Lembrete enviado com sucesso' });
    } catch (error) {
        res.status(500).send(error);
    }
};
