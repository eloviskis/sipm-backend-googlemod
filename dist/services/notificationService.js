"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendAppointmentReminder = exports.sendAppointmentConfirmation = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
// Configuração do Nodemailer
const transporter = nodemailer_1.default.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
    },
});
// Função para enviar confirmação de agendamento
const sendAppointmentConfirmation = (email, date) => {
    const mailOptions = {
        from: process.env.GMAIL_USER,
        to: email,
        subject: 'Confirmação de Agendamento',
        text: `Sua consulta foi agendada para ${date}.`,
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(`Erro ao enviar email: ${error.message}`);
        }
        else {
            console.log(`Email enviado: ${info.response}`);
        }
    });
};
exports.sendAppointmentConfirmation = sendAppointmentConfirmation;
// Função para enviar lembrete de agendamento
const sendAppointmentReminder = (email, date) => {
    const mailOptions = {
        from: process.env.GMAIL_USER,
        to: email,
        subject: 'Lembrete de Agendamento',
        text: `Lembrete: Sua consulta está agendada para ${date}.`,
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(`Erro ao enviar email: ${error.message}`);
        }
        else {
            console.log(`Email enviado: ${info.response}`);
        }
    });
};
exports.sendAppointmentReminder = sendAppointmentReminder;
