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
exports.sendWhatsAppMessage = void 0;
const twilio_1 = __importDefault(require("twilio"));
const logger_1 = __importDefault(require("../middlewares/logger")); // Adicionando middleware de logger
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const fromWhatsAppNumber = process.env.TWILIO_WHATSAPP_FROM;
const client = new twilio_1.default(accountSid, authToken);
const sendWhatsAppMessage = (to, message) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield client.messages.create({
            body: message,
            from: `whatsapp:${fromWhatsAppNumber}`,
            to: `whatsapp:${to}`,
        });
        (0, logger_1.default)('info', `Mensagem enviada para ${to}: ${response.sid}`); // Adicionando log de sucesso
        return response;
    }
    catch (error) {
        (0, logger_1.default)('error', `Erro ao enviar mensagem para ${to}: ${error.message}`); // Adicionando log de erro
        throw new Error(error.message);
    }
});
exports.sendWhatsAppMessage = sendWhatsAppMessage;
