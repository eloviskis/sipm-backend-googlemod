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
exports.sendReportNotification = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const logger_1 = __importDefault(require("../middlewares/logger")); // Adicionando middleware de logger
// Verificação das variáveis de ambiente necessárias
const gmailUser = process.env.GMAIL_USER;
const gmailPass = process.env.GMAIL_PASS;
const appUrl = process.env.APP_URL;
if (!gmailUser || !gmailPass || !appUrl) {
    throw new Error("Variáveis de ambiente GMAIL_USER, GMAIL_PASS e APP_URL são obrigatórias.");
}
// Configuração do Nodemailer
const transporter = nodemailer_1.default.createTransport({
    service: 'Gmail',
    auth: {
        user: gmailUser,
        pass: gmailPass,
    },
});
// Função para enviar notificação de novo relatório
const sendReportNotification = (email, reportId) => __awaiter(void 0, void 0, void 0, function* () {
    const mailOptions = {
        from: gmailUser,
        to: email,
        subject: 'Novo Relatório Gerado',
        text: `Um novo relatório foi gerado. Você pode visualizá-lo no seguinte link: ${appUrl}/reports/${reportId}`,
    };
    try {
        const info = yield transporter.sendMail(mailOptions);
        (0, logger_1.default)('info', `Notificação de relatório enviada: ${info.response}`, {}); // Adicionando argumento vazio para metadados
    }
    catch (error) {
        if (error instanceof Error) {
            (0, logger_1.default)('error', `Erro ao enviar notificação de relatório: ${error.message}`, {}); // Adicionando argumento vazio para metadados
        }
        else {
            (0, logger_1.default)('error', 'Erro desconhecido ao enviar notificação de relatório', {}); // Adicionando argumento vazio para metadados
        }
    }
});
exports.sendReportNotification = sendReportNotification;
