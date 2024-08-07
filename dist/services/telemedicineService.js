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
exports.generateVideoToken = exports.createVideoRoom = void 0;
const googleapis_1 = require("googleapis");
const google_auth_library_1 = require("google-auth-library");
const logger_1 = __importDefault(require("../middlewares/logger")); // Adicionando middleware de logger
// Configuração do OAuth2Client
const oAuth2Client = new google_auth_library_1.OAuth2Client(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET, process.env.GOOGLE_REDIRECT_URI);
oAuth2Client.setCredentials({
    refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
});
// Função para criar uma sala de vídeo no Google Meet através do Google Calendar
const createVideoRoom = (roomName) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const calendar = googleapis_1.google.calendar({ version: 'v3', auth: oAuth2Client });
        const event = {
            summary: roomName,
            description: 'Sala de vídeo criada pelo sistema',
            start: {
                dateTime: new Date().toISOString(),
                timeZone: 'America/Sao_Paulo',
            },
            end: {
                dateTime: new Date(new Date().getTime() + 30 * 60 * 1000).toISOString(),
                timeZone: 'America/Sao_Paulo',
            },
            conferenceData: {
                createRequest: {
                    requestId: Math.random().toString(36).substring(7),
                    conferenceSolutionKey: {
                        type: 'hangoutsMeet',
                    },
                    status: {
                        statusCode: 'pending',
                    },
                },
            },
        };
        const response = yield calendar.events.insert({
            calendarId: 'primary',
            requestBody: event,
            conferenceDataVersion: 1,
        });
        const createdEvent = response.data;
        if (createdEvent.hangoutLink) {
            (0, logger_1.default)('info', `Sala de vídeo criada: ${createdEvent.hangoutLink}`); // Adicionando log de criação de sala
            return createdEvent;
        }
        else {
            (0, logger_1.default)('error', 'Erro ao criar sala de vídeo: link não gerado');
            throw new Error('Erro ao criar sala de vídeo: link não gerado');
        }
    }
    catch (error) {
        if (error instanceof Error) {
            (0, logger_1.default)('error', `Erro ao criar sala de vídeo: ${error.message}`);
            throw new Error(`Erro ao criar sala de vídeo: ${error.message}`);
        }
        else {
            (0, logger_1.default)('error', 'Erro desconhecido ao criar sala de vídeo');
            throw new Error('Erro desconhecido ao criar sala de vídeo');
        }
    }
});
exports.createVideoRoom = createVideoRoom;
// Função para gerar um token de vídeo (não aplicável para Google Meet, mas mantendo a assinatura)
const generateVideoToken = (identity) => {
    // Google Meet não usa tokens de vídeo como Twilio, esta função pode ser ajustada conforme necessário
    (0, logger_1.default)('info', `Token de vídeo (não aplicável) gerado para: ${identity}`); // Adicionando log de geração de token
    return null;
};
exports.generateVideoToken = generateVideoToken;
