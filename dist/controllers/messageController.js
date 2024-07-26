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
const message_1 = __importDefault(require("../models/message"));
const logger_1 = __importDefault(require("../middlewares/logger")); // Adicionando middleware de logger
// Função para enviar uma mensagem
const sendMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const message = new message_1.default(req.body);
        const savedMessage = yield message.save();
        (0, logger_1.default)('info', `Mensagem enviada: ${savedMessage._id}`); // Adicionando log de envio de mensagem
        res.status(201).send(savedMessage);
    }
    catch (error) {
        (0, logger_1.default)('error', 'Erro ao enviar mensagem:', error); // Adicionando log de erro
        res.status(400).send(error);
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
        const messages = yield message_1.default.find({ to: userId });
        (0, logger_1.default)('info', `Mensagens obtidas para o usuário: ${userId}`); // Adicionando log de obtenção de mensagens
        res.send(messages);
    }
    catch (error) {
        (0, logger_1.default)('error', 'Erro ao obter mensagens:', error); // Adicionando log de erro
        res.status(500).send(error);
    }
});
exports.getMessages = getMessages;
