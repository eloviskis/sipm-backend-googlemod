"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyMFA = exports.configureMFA = void 0;
const speakeasy_1 = __importDefault(require("speakeasy"));
const qrcode_1 = __importDefault(require("qrcode"));
const configureMFA = (req, res) => {
    const secret = speakeasy_1.default.generateSecret({ length: 20 });
    if (!secret.otpauth_url) {
        return res.status(500).send('Erro ao gerar o URL OTP Auth');
    }
    qrcode_1.default.toDataURL(secret.otpauth_url, (err, data_url) => {
        if (err) {
            return res.status(500).send('Erro ao gerar QR Code');
        }
        // Salvar a chave MFA no usuário (deveria ser implementado)
        // req.user.mfaSecret = secret.base32;
        // req.user.save();
        res.send({ secret: secret.base32, qrCode: data_url });
    });
};
exports.configureMFA = configureMFA;
const verifyMFA = (req, res) => {
    const { token, secret } = req.body;
    const verified = speakeasy_1.default.totp.verify({
        secret,
        encoding: 'base32',
        token,
    });
    if (verified) {
        res.send('MFA verificado com sucesso');
    }
    else {
        res.status(400).send('Código MFA inválido');
    }
};
exports.verifyMFA = verifyMFA;
