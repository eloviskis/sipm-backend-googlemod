import { Client } from '@microsoft/microsoft-graph-client';
import { TokenCredentialAuthenticationProvider } from '@microsoft/microsoft-graph-client/authProviders/azureTokenCredentials';
import { ConfidentialClientApplication } from '@azure/msal-node';

// Configuração do Google Calendar
import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';

const oAuth2Client = new OAuth2Client(
    process.env.GOOGLE_CLIENT_ID!,
    process.env.GOOGLE_CLIENT_SECRET!,
    process.env.GOOGLE_REDIRECT_URI!
);

oAuth2Client.setCredentials({
    refresh_token: process.env.GOOGLE_REFRESH_TOKEN!,
});

// Função para integrar com Google Calendar
export const integrateWithGoogleCalendar = async (appointment: any) => {
    const calendar = google.calendar({ version: 'v3', auth: oAuth2Client });

    const event = {
        summary: 'Consulta Médica',
        description: 'Descrição da consulta',
        start: {
            dateTime: appointment.date,
            timeZone: 'America/Sao_Paulo',
        },
        end: {
            dateTime: new Date(new Date(appointment.date).getTime() + 30 * 60 * 1000).toISOString(), // 30 minutos de duração
            timeZone: 'America/Sao_Paulo',
        },
    };

    await calendar.events.insert({
        calendarId: 'primary',
        requestBody: event,
    });
};

// Configuração do Outlook Calendar
const msalConfig = {
    auth: {
        clientId: process.env.OUTLOOK_CLIENT_ID!,
        authority: process.env.OUTLOOK_AUTHORITY!,
        clientSecret: process.env.OUTLOOK_CLIENT_SECRET!,
    },
};

const cca = new ConfidentialClientApplication(msalConfig);

const authProvider = new TokenCredentialAuthenticationProvider(cca, {
    scopes: ['https://graph.microsoft.com/.default'],
});

// Função para integrar com Outlook Calendar
export const integrateWithOutlookCalendar = async (appointment: any) => {
    const client = Client.initWithMiddleware({ authProvider });

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
            dateTime: new Date(new Date(appointment.date).getTime() + 30 * 60 * 1000).toISOString(), // 30 minutos de duração
            timeZone: 'America/Sao_Paulo',
        },
    };

    await client.api('/me/events').post(event);
};
