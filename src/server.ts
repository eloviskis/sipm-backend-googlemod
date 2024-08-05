import express from 'express';
import fs from 'fs';
import https from 'https';
import path from 'path';
import bodyParser from 'body-parser';
import appointmentRoutes from './routes/appointmentRoutes';
import authRoutes from './routes/authRoutes';
import clinicRoutes from './routes/clinicRoutes';
import fileRoutes from './routes/fileRoutes';
import homePageContentRoutes from './routes/homePageContentRoutes';
import invoiceRoutes from './routes/invoiceRoutes';
import legalRoutes from './routes/legalRoutes';
import messageRoutes from './routes/messageRoutes';
import pageRoutes from './routes/pageRoutes';
import patientRecordRoutes from './routes/patientRecordRoutes';
import paymentRoutes from './routes/paymentRoutes';
import reportRoutes from './routes/reportRoutes';
import themePreferencesRoutes from './routes/themePreferencesRoutes';
import themeRoutes from './routes/themeRoutes';
import userRoutes from './routes/userRoutes';
import whatsappRoutes from './routes/whatsappRoutes';
import logger from './middlewares/logger'; // Adicionando logger
import { ensureHttps } from './middlewares/httpsRedirect'; // Adicionando redirecionamento HTTPS

const app = express();

// Middleware para redirecionar HTTP para HTTPS
if (process.env.NODE_ENV === 'production') {
    app.use(ensureHttps);
}

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Logger middleware para registrar requisições
app.use((req, res, next) => {
    logger('info', 'Request logged', { method: req.method, url: req.url });
    next();
});

// Configurar HTTPS com os certificados
const sslOptions = {
    key: fs.readFileSync(path.resolve(__dirname, '../certs/server.key')),
    cert: fs.readFileSync(path.resolve(__dirname, '../certs/server.cert'))
};

// Rotas
app.use('/api/appointments', appointmentRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/clinics', clinicRoutes);
app.use('/api/files', fileRoutes);
app.use('/api/home-page-content', homePageContentRoutes);
app.use('/api/invoices', invoiceRoutes);
app.use('/api/legal', legalRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/pages', pageRoutes);
app.use('/api/patient-records', patientRecordRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/theme-preferences', themePreferencesRoutes);
app.use('/api/themes', themeRoutes);
app.use('/api/users', userRoutes);
app.use('/api/whatsapp', whatsappRoutes);

// Rota básica
app.get('/', (req, res) => {
    res.send('Olá mundo HTTPS!');
});

// Iniciando o servidor HTTPS
https.createServer(sslOptions, app).listen(3001, () => {
    console.log('Servidor HTTPS rodando na porta 3001');
});
