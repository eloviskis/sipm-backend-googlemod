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
// Função para validar email
const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        throw new Error('Email inválido.');
    }
};
// Função para enviar confirmação de agendamento
const sendAppointmentConfirmation = (email, date) => __awaiter(void 0, void 0, void 0, function* () {
    validateEmail(email);
    const mailOptions = {
        from: process.env.GMAIL_USER,
        to: email,
        subject: 'Confirmação de Agendamento',
        text: `Sua consulta foi agendada para ${date}.`,
    };
    try {
        const info = yield transporter.sendMail(mailOptions);
        console.log(`Email de confirmação enviado: ${info.response}`);
    }
    catch (error) {
        if (error instanceof Error) {
            console.error(`Erro ao enviar email de confirmação: ${error.message}`);
        }
        else {
            console.error('Erro desconhecido ao enviar email de confirmação');
        }
        throw error; // Re-throw the error after logging it
    }
});
exports.sendAppointmentConfirmation = sendAppointmentConfirmation;
// Função para enviar lembrete de agendamento
const sendAppointmentReminder = (email, date) => __awaiter(void 0, void 0, void 0, function* () {
    validateEmail(email);
    const mailOptions = {
        from: process.env.GMAIL_USER,
        to: email,
        subject: 'Lembrete de Agendamento',
        text: `Lembrete: Sua consulta está agendada para ${date}.`,
    };
    try {
        const info = yield transporter.sendMail(mailOptions);
        console.log(`Email de lembrete enviado: ${info.response}`);
    }
    catch (error) {
        if (error instanceof Error) {
            console.error(`Erro ao enviar email de lembrete: ${error.message}`);
        }
        else {
            console.error('Erro desconhecido ao enviar email de lembrete');
        }
        throw error; // Re-throw the error after logging it
    }
});
exports.sendAppointmentReminder = sendAppointmentReminder;
