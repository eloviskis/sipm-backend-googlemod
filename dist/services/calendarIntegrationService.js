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
exports.integrateWithOutlookCalendar = exports.integrateWithGoogleCalendar = void 0;
const microsoft_graph_client_1 = require("@microsoft/microsoft-graph-client");
const azureTokenCredentials_1 = require("@microsoft/microsoft-graph-client/authProviders/azureTokenCredentials");
const msal_node_1 = require("@azure/msal-node");
// Configuração do Google Calendar
const googleapis_1 = require("googleapis");
const google_auth_library_1 = require("google-auth-library");
const oAuth2Client = new google_auth_library_1.OAuth2Client(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET, process.env.GOOGLE_REDIRECT_URI);
oAuth2Client.setCredentials({
    refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
});
// Função para integrar com Google Calendar
const integrateWithGoogleCalendar = (appointment) => __awaiter(void 0, void 0, void 0, function* () {
    const calendar = googleapis_1.google.calendar({ version: 'v3', auth: oAuth2Client });
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
    yield calendar.events.insert({
        calendarId: 'primary',
        requestBody: event,
    });
});
exports.integrateWithGoogleCalendar = integrateWithGoogleCalendar;
// Configuração do Outlook Calendar
const msalConfig = {
    auth: {
        clientId: process.env.OUTLOOK_CLIENT_ID,
        authority: process.env.OUTLOOK_AUTHORITY,
        clientSecret: process.env.OUTLOOK_CLIENT_SECRET,
    },
};
const cca = new msal_node_1.ConfidentialClientApplication(msalConfig);
const authProvider = new azureTokenCredentials_1.TokenCredentialAuthenticationProvider(cca, {
    scopes: ['https://graph.microsoft.com/.default'],
});
// Função para integrar com Outlook Calendar
const integrateWithOutlookCalendar = (appointment) => __awaiter(void 0, void 0, void 0, function* () {
    const client = microsoft_graph_client_1.Client.initWithMiddleware({ authProvider });
    const event = {
        subject: 'Consulta Médica',
        body: {
            contentType: 'HTML',
            content: 'Descrição da consulta',
        },
        start: {
            dateTime: appointment.date,
            timeZone: 'America/Sao_Paulo',
        },
        end: {
            dateTime: new Date(new Date(appointment.date).getTime() + 30 * 60 * 1000).toISOString(),
            timeZone: 'America/Sao_Paulo',
        },
    };
    yield client.api('/me/events').post(event);
});
exports.integrateWithOutlookCalendar = integrateWithOutlookCalendar;
