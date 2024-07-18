import express from 'express';
import fs from 'fs';
import https from 'https';
import path from 'path';
import profileRoutes from './routes/profileRoutes';
// Importações das rotas restantes...

const app = express();

// Configurar HTTPS com os certificados
const sslOptions = {
    key: fs.readFileSync(path.resolve(__dirname, '../certs/server.key')),
    cert: fs.readFileSync(path.resolve(__dirname, '../certs/server.cert'))
};

https.createServer(sslOptions, app).listen(3000, () => {
    console.log('HTTPS Server running on port 3000');
});

// Middlewares e rotas existentes...
app.use(profileRoutes);
// Adicionar as rotas restantes...

app.get('/', (req, res) => {
    res.send('Olá mundo HTTPS!');
});
