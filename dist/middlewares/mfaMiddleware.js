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
const speakeasy_1 = __importDefault(require("speakeasy"));
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const logger_1 = __importDefault(require("../middlewares/logger"));
const db = firebase_admin_1.default.firestore();
const usersCollection = db.collection('users');
const mfaMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.user) {
        try {
            const userDoc = yield usersCollection.doc(req.user._id).get();
            if (!userDoc.exists) {
                return res.status(404).send({ error: 'Usuário não encontrado' });
            }
            const user = userDoc.data();
            if (user && user.mfaEnabled) {
                const token = req.header('x-mfa-token');
                if (!token) {
                    return res.status(401).send({ error: 'Token MFA não fornecido' });
                }
                if (!user.mfaSecret) {
                    return res.status(500).send({ error: 'Secret MFA não configurado' });
                }
                const verified = speakeasy_1.default.totp.verify({
                    secret: user.mfaSecret,
                    encoding: 'base32',
                    token,
                });
                if (!verified) {
                    return res.status(401).send({ error: 'Token MFA inválido' });
                }
            }
        }
        catch (error) {
            (0, logger_1.default)('error', `Erro ao verificar MFA: ${error.message}`);
            return res.status(500).send({ error: 'Erro interno do servidor' });
        }
    }
    next();
});
exports.default = mfaMiddleware;
