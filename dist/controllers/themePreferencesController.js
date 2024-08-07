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
exports.updateThemePreferences = void 0;
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const logger_1 = __importDefault(require("../middlewares/logger")); // Adicionando middleware de logger
const db = firebase_admin_1.default.firestore();
const usersCollection = db.collection('users');
// Função para atualizar as preferências de tema do usuário
const updateThemePreferences = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const { primaryColor, secondaryColor, backgroundColor } = req.body;
    try {
        const docRef = usersCollection.doc(userId);
        const doc = yield docRef.get();
        if (!doc.exists) {
            (0, logger_1.default)('error', `Usuário não encontrado: ${userId}`); // Adicionando log de erro
            return res.status(404).send({ error: 'Usuário não encontrado.' });
        }
        yield docRef.update({
            themePreferences: { primaryColor, secondaryColor, backgroundColor }
        });
        (0, logger_1.default)('info', `Preferências de tema atualizadas para o usuário: ${userId}`); // Adicionando log de sucesso
        res.send({ primaryColor, secondaryColor, backgroundColor });
    }
    catch (error) {
        (0, logger_1.default)('error', 'Erro ao atualizar preferências de tema:', error); // Adicionando log de erro
        res.status(400).send(error);
    }
});
exports.updateThemePreferences = updateThemePreferences;
