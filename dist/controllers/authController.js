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
exports.forgotPassword = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const crypto_1 = __importDefault(require("crypto"));
const transporter = nodemailer_1.default.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});
const forgotPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    try {
        const user = yield userModel_1.default.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }
        const token = crypto_1.default.randomBytes(20).toString('hex');
        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hora
        yield user.save();
        const mailOptions = {
            to: user.email,
            from: process.env.EMAIL_USER,
            subject: 'Redefinição de senha',
            text: `Você está recebendo este e-mail porque você (ou alguém) solicitou a redefinição da senha da sua conta.\n\n` +
                `Por favor, clique no link a seguir, ou cole-o em seu navegador para concluir o processo:\n\n` +
                `http://${req.headers.host}/reset/${token}\n\n` +
                `Se você não solicitou isso, por favor, ignore este e-mail e sua senha permanecerá inalterada.\n`,
        };
        transporter.sendMail(mailOptions, (err, response) => {
            if (err) {
                console.error('Erro ao enviar e-mail:', err);
                return res.status(500).json({ message: 'Erro ao enviar e-mail' });
            }
            res.status(200).json({ message: 'E-mail de redefinição de senha enviado com sucesso' });
        });
    }
    catch (error) {
        console.error('Erro ao processar solicitação de redefinição de senha:', error);
        res.status(500).json({ message: 'Erro ao processar solicitação de redefinição de senha' });
    }
});
exports.forgotPassword = forgotPassword;
