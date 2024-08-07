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
const axios_1 = __importDefault(require("axios"));
const whatsappApiUrl = process.env.WHATSAPP_API_URL || 'https://your-whatsapp-api-url.com/send-message';
const apiToken = process.env.WHATSAPP_API_TOKEN || 'your_api_token';
const sendWhatsAppMessage = (to, message) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.post(whatsappApiUrl, {
            to,
            message,
        }, {
            headers: {
                'Authorization': `Bearer ${apiToken}`,
                'Content-Type': 'application/json',
            },
        });
        if (response.status === 200) {
            return response.data;
        }
        else {
            throw new Error(`Erro ao enviar mensagem: ${response.statusText}`);
        }
    }
    catch (error) {
        throw new Error(`Erro ao enviar mensagem: ${error.message}`);
    }
});
exports.sendWhatsAppMessage = sendWhatsAppMessage;
