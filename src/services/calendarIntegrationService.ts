import { Client } from '@microsoft/microsoft-graph-client';
import { TokenCredentialAuthenticationProvider } from '@microsoft/microsoft-graph-client/authProviders/azureTokenCredentials';
import { ConfidentialClientApplication } from '@azure/msal-node';
import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';
import { AccessToken } from '@azure/core-auth';

// Configuração do Google Calendar
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

    try {
        const response = await calendar.events.insert({
            calendarId: 'primary',
            requestBody: event,
        });
        console.info(`Evento criado no Google Calendar: ${response.data.htmlLink}`);
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error(`Erro ao criar evento no Google Calendar: ${error.message}`);
        } else {
            console.error('Erro desconhecido ao criar evento no Google Calendar');
        }
    }
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

class CustomTokenCredential {
    cca: ConfidentialClientApplication;

    constructor(cca: ConfidentialClientApplication) {
        this.cca = cca;
    }

    async getToken(scopes: string[]): Promise<AccessToken | null> {
        const result = await this.cca.acquireTokenByClientCredential({
            scopes: scopes,
        });
        return result?.accessToken ? { token: result.accessToken, expiresOnTimestamp: 0 } : null;
    }
}

const customTokenCredential = new CustomTokenCredential(cca);

const authProvider = new TokenCredentialAuthenticationProvider(customTokenCredential, {
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

    try {
        const response = await client.api('/me/events').post(event);
        console.info(`Evento criado no Outlook Calendar: ${response.id}`);
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error(`Erro ao criar evento no Outlook Calendar: ${error.message}`);
        } else {
            console.error('Erro desconhecido ao criar evento no Outlook Calendar');
        }
    }
};
