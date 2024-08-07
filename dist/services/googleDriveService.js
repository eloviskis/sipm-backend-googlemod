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
exports.uploadFile = void 0;
const googleapis_1 = require("googleapis");
const google_auth_library_1 = require("google-auth-library");
const stream_1 = require("stream");
// Configuração do OAuth2Client
const oAuth2Client = new google_auth_library_1.OAuth2Client(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET, process.env.GOOGLE_REDIRECT_URI);
// Função para autenticar o cliente OAuth2
const authenticate = () => {
    oAuth2Client.setCredentials({
        refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
    });
    return googleapis_1.google.drive({ version: 'v3', auth: oAuth2Client });
};
// Função para fazer upload de um arquivo
const uploadFile = (file) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const drive = authenticate();
        const response = yield drive.files.create({
            requestBody: {
                name: file.originalname,
                mimeType: file.mimetype,
            },
            media: {
                mimeType: file.mimetype,
                body: stream_1.Readable.from(file.buffer),
            },
        });
        return response.data;
    }
    catch (error) {
        if (error instanceof Error) {
            console.error(`Erro ao fazer upload do arquivo: ${error.message}`);
        }
        else {
            console.error('Erro desconhecido ao fazer upload do arquivo');
        }
        return null;
    }
});
exports.uploadFile = uploadFile;
