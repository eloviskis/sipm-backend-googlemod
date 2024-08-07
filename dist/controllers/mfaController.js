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
exports.verifyMFA = exports.configureMFA = void 0;
const speakeasy_1 = __importDefault(require("speakeasy"));
const qrcode_1 = __importDefault(require("qrcode"));
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const logger_1 = __importDefault(require("../middlewares/logger"));
const db = firebase_admin_1.default.firestore();
const usersCollection = db.collection('users');
// Função para configurar MFA
const configureMFA = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const secret = speakeasy_1.default.generateSecret({ length: 20 });
        if (!secret.otpauth_url) {
            (0, logger_1.default)('error', 'Erro ao gerar o URL OTP Auth');
            return res.status(500).send({ error: 'Erro ao gerar o URL OTP Auth' });
        }
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.uid;
        if (!userId) {
            (0, logger_1.default)('error', 'Usuário não autenticado');
            return res.status(401).send({ error: 'Usuário não autenticado' });
        }
        // Salvar a chave MFA no Firestore
        yield usersCollection.doc(userId).update({ mfaSecret: secret.base32 });
        qrcode_1.default.toDataURL(secret.otpauth_url, (err, data_url) => {
            if (err) {
                (0, logger_1.default)('error', `Erro ao gerar QR Code: ${err.message}`);
                return res.status(500).send({ error: 'Erro ao gerar QR Code' });
            }
            (0, logger_1.default)('info', `MFA configurado para o usuário: ${userId}`);
            res.send({ secret: secret.base32, qrCode: data_url });
        });
    }
    catch (error) {
        (0, logger_1.default)('error', `Erro ao configurar MFA: ${error.message}`);
        res.status(500).send({ error: 'Erro ao configurar MFA' });
    }
});
exports.configureMFA = configureMFA;
// Função para verificar MFA
const verifyMFA = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { token, userId } = req.body;
    try {
        if (!token || !userId) {
            (0, logger_1.default)('error', 'Token ou ID do usuário não fornecido');
            return res.status(400).send({ error: 'Token e ID do usuário são obrigatórios' });
        }
        // Recuperar o segredo MFA do Firestore
        const userDoc = yield usersCollection.doc(userId).get();
        if (!userDoc.exists) {
            (0, logger_1.default)('error', `Usuário não encontrado: ${userId}`);
            return res.status(404).send({ error: 'Usuário não encontrado' });
        }
        const user = userDoc.data();
        const secret = user === null || user === void 0 ? void 0 : user.mfaSecret;
        if (!secret) {
            (0, logger_1.default)('error', `MFA não configurado para o usuário: ${userId}`);
            return res.status(400).send({ error: 'MFA não configurado para este usuário' });
        }
        const verified = speakeasy_1.default.totp.verify({
            secret,
            encoding: 'base32',
            token,
        });
        if (verified) {
            (0, logger_1.default)('info', `MFA verificado com sucesso para o usuário: ${userId}`);
            res.send({ message: 'MFA verificado com sucesso' });
        }
        else {
            (0, logger_1.default)('error', `Código MFA inválido para o usuário: ${userId}`);
            res.status(400).send({ error: 'Código MFA inválido' });
        }
    }
    catch (error) {
        (0, logger_1.default)('error', `Erro ao verificar MFA: ${error.message}`);
        res.status(500).send({ error: 'Erro ao verificar MFA' });
    }
});
exports.verifyMFA = verifyMFA;
