"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const https_1 = __importDefault(require("https"));
const path_1 = __importDefault(require("path"));
// Importações das rotas restantes...
const app = (0, express_1.default)();
// Configurar HTTPS com os certificados
const sslOptions = {
    key: fs_1.default.readFileSync(path_1.default.resolve(__dirname, '../certs/server.key')),
    cert: fs_1.default.readFileSync(path_1.default.resolve(__dirname, '../certs/server.cert'))
};
https_1.default.createServer(sslOptions, app).listen(3000, () => {
    console.log('Servidor HTTPS rodando na porta 3000');
});
// Middlewares e rotas existentes...
// Adicionar as rotas restantes...
app.get('/', (req, res) => {
    res.send('Olá mundo HTTPS!');
});
