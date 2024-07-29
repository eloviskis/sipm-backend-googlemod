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
Object.defineProperty(exports, "__esModule", { value: true });
exports.integrateWithGoogleCalendar = void 0;
const googleapis_1 = require("googleapis");
const google_auth_library_1 = require("google-auth-library");
// Configuração do Google Calendar
const oAuth2Client = new google_auth_library_1.OAuth2Client(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET, process.env.GOOGLE_REDIRECT_URI);
oAuth2Client.setCredentials({
    refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
});
// Função para integrar com Google Calendar
const integrateWithGoogleCalendar = (appointment) => __awaiter(void 0, void 0, void 0, function* () {
    const calendar = googleapis_1.google.calendar('v3');
    const event = {
        summary: 'Consulta Médica',
        description: 'Descrição da consulta',
        start: {
            dateTime: appointment.date,
            timeZone: 'America/Sao_Paulo',
        },
        end: {
            dateTime: new Date(new Date(appointment.date).getTime() + 30 * 60 * 1000).toISOString(),
            timeZone: 'America/Sao_Paulo',
        },
    };
    try {
        const response = yield calendar.events.insert({
            calendarId: 'primary',
            requestBody: event,
        });
        if (response && response.data) {
            console.info(`Evento criado no Google Calendar: ${response.data.htmlLink}`);
        }
        else {
            console.error('Resposta inesperada ao criar evento no Google Calendar.');
        }
    }
    catch (error) {
        if (error instanceof Error) {
            console.error(`Erro ao criar evento no Google Calendar: ${error.message}`);
        }
        else {
            console.error('Erro desconhecido ao criar evento no Google Calendar');
        }
    }
});
exports.integrateWithGoogleCalendar = integrateWithGoogleCalendar;
