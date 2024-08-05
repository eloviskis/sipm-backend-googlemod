import * as passport from 'passport';
import express from 'express';
import session from 'express-session';
import { initialize } from 'passport';
import userRoutes from './routes/userRoutes';
import appointmentRoutes from './routes/appointmentRoutes';
import authRoutes from './routes/authRoutes';
import clinicRoutes from './routes/clinicRoutes';
import fileRoutes from './routes/fileRoutes';
import pageRoutes from './routes/pageRoutes';
import themeRoutes from './routes/themeRoutes';
import patientRecordRoutes from './routes/patientRecordRoutes';
import invoiceRoutes from './routes/invoiceRoutes';
import messageRoutes from './routes/messageRoutes';
import reportRoutes from './routes/reportRoutes';
import whatsappRoutes from './routes/whatsappRoutes';
import themePreferencesRoutes from './routes/themePreferencesRoutes';
import paymentRoutes from './routes/paymentRoutes';
import documentTemplateRoutes from './routes/documentTemplateRoutes'; // Adicionar nova rota
import preConsultationRoutes from './routes/preConsultationRoutes'; // Adicionar nova rota
import motivoRoutes from './routes/motivoRoutes'; // Adicionar nova rota
import { errorHandler } from './middlewares/errorHandler';
import { authMiddleware } from './middlewares/authMiddleware';
import { ensureHttps } from './middlewares/httpsRedirect';
import mfaMiddleware from './middlewares/mfaMiddleware';
import logger from './middlewares/logger';
import accountsReceivableRoutes from './routes/accountsReceivableRoutes';
import accountsPayableRoutes from './routes/accountsPayableRoutes';

import fs from 'fs';
import https from 'https';
import path from 'path';

const app = express();

const sslOptions = {
    key: fs.readFileSync(path.resolve(__dirname, '../certs/server.key')),
    cert: fs.readFileSync(path.resolve(__dirname, '../certs/server.cert'))
};  

https.createServer(sslOptions, app).listen(3001, () => {
    console.log('Servidor HTTPS rodando na porta 3001');
});

if (process.env.NODE_ENV === 'production') {
    app.use(ensureHttps);
}

app.use((req, res, next) => {
    logger("info", "Request logged", { method: req.method, url: req.url });
    next();
});

app.use(express.json());

app.use(session({
    secret: process.env.SESSION_SECRET || 'default_secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 24 * 60 * 60 * 1000,
    }
}));

app.use(initialize());
app.use(passport.session());

app.use(mfaMiddleware);

app.use('/api/auth', authRoutes);
app.use(authMiddleware);
app.use('/api/users', userRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/clinics', clinicRoutes);
app.use('/api/files', fileRoutes);
app.use('/api/pages', pageRoutes);
app.use('/api/themes', themeRoutes);
app.use('/api/patient-records', patientRecordRoutes);
app.use('/api/invoices', invoiceRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/whatsapp', whatsappRoutes);
app.use('/api/theme-preferences', themePreferencesRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/document-templates', documentTemplateRoutes); // Adicionar nova rota
app.use('/api/pre-consultations', preConsultationRoutes); // Adicionar nova rota
app.use('/api/motivos', motivoRoutes); // Adicionar nova rota
app.use('/api/accounts-receivable', accountsReceivableRoutes);
app.use('/api/accounts-payable', accountsPayableRoutes);
app.use(errorHandler);

app.get('/', (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.send('Olá mundo HTTPS!');
});

export default app;
