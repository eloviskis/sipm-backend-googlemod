import express from 'express';
import fs from 'fs';
import https from 'https';
import path from 'path';

// Importações das rotas restantes...

const app = express();

// Configurar HTTPS com os certificados
const sslOptions = {
    key: fs.readFileSync(path.resolve(__dirname, '../certs/server.key')),
    cert: fs.readFileSync(path.resolve(__dirname, '../certs/server.cert'))
};

https.createServer(sslOptions, app).listen(3001, () => { // Altere a porta para 3001
    console.log('Servidor HTTPS rodando na porta 3001');
});

// Middlewares e rotas existentes...

// Adicionar as rotas restantes...

app.get('/', (req, res) => {
    res.send('Olá mundo HTTPS!');
});
