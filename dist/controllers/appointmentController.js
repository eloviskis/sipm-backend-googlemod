"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendReminder = exports.deleteAppointment = exports.updateAppointment = exports.getAppointment = exports.getAppointments = exports.createAppointment = void 0;
const appointment_1 = __importDefault(require("../models/appointment"));
const notificationService_1 = require("../services/notificationService");
const calendarIntegrationService_1 = require("../services/calendarIntegrationService");
const logger_1 = __importDefault(require("../middlewares/logger")); // Adicionando middleware de logger
// Função para criar um novo agendamento
const createAppointment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const appointment = new appointment_1.default(req.body);
        yield appointment.save();
        // Enviar confirmação de agendamento
        yield (0, notificationService_1.sendAppointmentConfirmation)(req.body.email, req.body.date);
        // Integração com Google Calendar e Outlook Calendar
        yield (0, calendarIntegrationService_1.integrateWithGoogleCalendar)(appointment);
        (0, logger_1.default)('info', `Agendamento criado: ${appointment._id}`); // Adicionando log de criação de agendamento
        res.status(201).send(appointment);
    }
    catch (error) {
        (0, logger_1.default)('error', 'Erro ao criar agendamento:', error); // Adicionando log de erro
        res.status(400).send(error);
    }
});
exports.createAppointment = createAppointment;
// Função para obter todos os agendamentos
const getAppointments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const appointments = yield appointment_1.default.find({});
        res.send(appointments);
    }
    catch (error) {
        (0, logger_1.default)('error', 'Erro ao obter agendamentos:', error); // Adicionando log de erro
        res.status(500).send(error);
    }
});
exports.getAppointments = getAppointments;
// Função para obter um agendamento específico
const getAppointment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const appointment = yield appointment_1.default.findById(req.params.id);
        if (!appointment) {
            (0, logger_1.default)('error', `Agendamento não encontrado: ${req.params.id}`); // Adicionando log de erro
            return res.status(404).send();
        }
        res.send(appointment);
    }
    catch (error) {
        (0, logger_1.default)('error', 'Erro ao obter agendamento:', error); // Adicionando log de erro
        res.status(500).send(error);
    }
});
exports.getAppointment = getAppointment;
// Função para atualizar um agendamento
const updateAppointment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['date', 'status'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));
    if (!isValidOperation) {
        return res.status(400).send({ error: 'Atualizações inválidas!' });
    }
    try {
        const appointment = yield appointment_1.default.findById(req.params.id);
        if (!appointment) {
            (0, logger_1.default)('error', `Agendamento não encontrado: ${req.params.id}`); // Adicionando log de erro
            return res.status(404).send();
        }
        updates.forEach((update) => (appointment[update] = req.body[update]));
        yield appointment.save();
        (0, logger_1.default)('info', `Agendamento atualizado: ${appointment._id}`); // Adicionando log de atualização de agendamento
        res.send(appointment);
    }
    catch (error) {
        (0, logger_1.default)('error', 'Erro ao atualizar agendamento:', error); // Adicionando log de erro
        res.status(400).send(error);
    }
});
exports.updateAppointment = updateAppointment;
// Função para deletar um agendamento
const deleteAppointment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const appointment = yield appointment_1.default.findByIdAndDelete(req.params.id);
        if (!appointment) {
            (0, logger_1.default)('error', `Agendamento não encontrado: ${req.params.id}`); // Adicionando log de erro
            return res.status(404).send();
        }
        (0, logger_1.default)('info', `Agendamento deletado: ${appointment._id}`); // Adicionando log de exclusão de agendamento
        res.send(appointment);
    }
    catch (error) {
        (0, logger_1.default)('error', 'Erro ao deletar agendamento:', error); // Adicionando log de erro
        res.status(500).send(error);
    }
});
exports.deleteAppointment = deleteAppointment;
// Função para enviar lembretes de agendamento
const sendReminder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const appointment = yield appointment_1.default.findById(req.params.id);
        if (!appointment) {
            (0, logger_1.default)('error', `Agendamento não encontrado: ${req.params.id}`); // Adicionando log de erro
            return res.status(404).send();
        }
        yield (0, notificationService_1.sendAppointmentReminder)(req.body.email, appointment.date);
        (0, logger_1.default)('info', `Lembrete enviado para o agendamento: ${appointment._id}`); // Adicionando log de envio de lembrete
        res.send({ message: 'Lembrete enviado com sucesso' });
    }
    catch (error) {
        (0, logger_1.default)('error', 'Erro ao enviar lembrete:', error); // Adicionando log de erro
        res.status(500).send(error);
    }
});
exports.sendReminder = sendReminder;
