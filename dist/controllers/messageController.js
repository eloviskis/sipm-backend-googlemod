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
exports.getMessages = exports.sendMessage = void 0;
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const logger_1 = __importDefault(require("../middlewares/logger"));
const db = firebase_admin_1.default.firestore();
const messagesCollection = db.collection('messages');
// Função para validar dados da mensagem
const validateMessageData = (message) => {
    if (!message.to || typeof message.to !== 'string') {
        throw new Error('O destinatário da mensagem é obrigatório e deve ser uma string.');
    }
    if (!message.content || typeof message.content !== 'string') {
        throw new Error('O conteúdo da mensagem é obrigatório e deve ser uma string.');
    }
    // Adicione outras validações necessárias
};
// Função para enviar uma mensagem
const sendMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const message = req.body;
        // Validação dos dados da mensagem
        validateMessageData(message);
        const docRef = yield messagesCollection.add(message);
        const savedMessage = yield docRef.get();
        (0, logger_1.default)('info', `Mensagem enviada: ${docRef.id}`);
        res.status(201).send(Object.assign({ id: docRef.id }, savedMessage.data()));
    }
    catch (error) {
        (0, logger_1.default)('error', `Erro ao enviar mensagem: ${error.message}`);
        res.status(400).send({ error: error.message });
    }
});
exports.sendMessage = sendMessage;
// Função para obter mensagens de um usuário específico
const getMessages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.user) {
            return res.status(401).send({ error: 'Usuário não autenticado' });
        }
        const userId = req.params.userId;
        // Verificar se o usuário autenticado está tentando acessar suas próprias mensagens
        if (req.user._id !== userId) {
            return res.status(403).send({ error: 'Acesso negado' });
        }
        const snapshot = yield messagesCollection.where('to', '==', userId).get();
        const messages = snapshot.docs.map(doc => (Object.assign({ id: doc.id }, doc.data())));
        (0, logger_1.default)('info', `Mensagens obtidas para o usuário: ${userId}`);
        res.send(messages);
    }
    catch (error) {
        (0, logger_1.default)('error', `Erro ao obter mensagens: ${error.message}`);
        res.status(500).send({ error: error.message });
    }
});
exports.getMessages = getMessages;
