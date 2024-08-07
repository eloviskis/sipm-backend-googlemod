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
exports.sendMessage = void 0;
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const whatsappService_1 = require("../services/whatsappService");
const logger_1 = __importDefault(require("../middlewares/logger")); // Adicionando middleware de logger
const db = firebase_admin_1.default.firestore();
const messagesCollection = db.collection('whatsappMessages');
// Função para enviar uma mensagem WhatsApp
const sendMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { to, message } = req.body;
        // Enviar mensagem WhatsApp usando a API do WhatsApp
        const response = yield (0, whatsappService_1.sendWhatsAppMessage)(to, message);
        // Salvar metadados da mensagem no Firestore
        const messageData = {
            to,
            message,
            status: response.status,
            dateSent: firebase_admin_1.default.firestore.FieldValue.serverTimestamp(),
        };
        const docRef = yield messagesCollection.add(messageData);
        const savedMessage = yield docRef.get();
        (0, logger_1.default)('info', `Mensagem WhatsApp enviada para: ${to}`); // Adicionando log de envio de mensagem
        res.send(Object.assign({ id: docRef.id }, savedMessage.data()));
    }
    catch (error) {
        (0, logger_1.default)('error', 'Erro ao enviar mensagem WhatsApp:', error); // Adicionando log de erro
        res.status(500).send(error.message);
    }
});
exports.sendMessage = sendMessage;
