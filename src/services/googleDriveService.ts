import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';

const oAuth2Client = new OAuth2Client(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
);

// Função para autenticar o cliente OAuth2
const authenticate = () => {
    oAuth2Client.setCredentials({
        refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
    });
    return google.drive({ version: 'v3', auth: oAuth2Client });
};

// Função para fazer upload de um arquivo
export const uploadFile = async (file: any) => {
    const drive = authenticate();
    const response = await drive.files.create({
        requestBody: {
            name: file.originalname,
            mimeType: file.mimetype,
        },
        media: {
            mimeType: file.mimetype,
            body: file.buffer,
        },
    });
    return response.data;
};
