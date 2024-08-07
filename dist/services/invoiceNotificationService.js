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
exports.sendInvoiceEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const logger_1 = __importDefault(require("../middlewares/logger")); // Adicionando middleware de logger
const path_1 = __importDefault(require("path"));
// Configuração do Nodemailer
const transporter = nodemailer_1.default.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
    },
});
/**
 * Função para enviar fatura por e-mail
 * @param {string} email - O endereço de e-mail do destinatário
 * @param {string} invoicePath - O caminho para o arquivo da fatura em PDF
 */
const sendInvoiceEmail = (email, invoicePath) => __awaiter(void 0, void 0, void 0, function* () {
    if (!process.env.GMAIL_USER || !process.env.GMAIL_PASS) {
        (0, logger_1.default)('error', 'As variáveis de ambiente GMAIL_USER e GMAIL_PASS não estão definidas.');
        throw new Error('Configuração de e-mail incompleta.');
    }
    const mailOptions = {
        from: process.env.GMAIL_USER,
        to: email,
        subject: 'Sua Fatura',
        text: 'Anexamos sua fatura em PDF.',
        attachments: [
            {
                filename: path_1.default.basename(invoicePath),
                path: invoicePath,
            },
        ],
    };
    try {
        const info = yield transporter.sendMail(mailOptions);
        (0, logger_1.default)('info', `Fatura enviada: ${info.response}`);
    }
    catch (error) {
        if (error instanceof Error) {
            (0, logger_1.default)('error', `Erro ao enviar fatura: ${error.message}`);
        }
        else {
            (0, logger_1.default)('error', 'Erro desconhecido ao enviar fatura');
        }
    }
});
exports.sendInvoiceEmail = sendInvoiceEmail;
