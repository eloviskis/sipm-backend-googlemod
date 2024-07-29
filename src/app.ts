import express from 'express';
import session from 'express-session';
import passport from './config/passport';
import userRoutes from './routes/userRoutes';
import appointmentRoutes from './routes/appointmentRoutes';
import authRoutes from './routes/authRoutes';
import clinicRoutes from './routes/clinicRoutes';
import fileRoutes from './routes/fileRoutes';
import pageRoutes from './routes/pageRoutes'; // Certifique-se de que pageRoutes está importado corretamente
import themeRoutes from './routes/themeRoutes';
import patientRecordRoutes from './routes/patientRecordRoutes';
import invoiceRoutes from './routes/invoiceRoutes';
import messageRoutes from './routes/messageRoutes';
import reportRoutes from './routes/reportRoutes';
import whatsappRoutes from './routes/whatsappRoutes';
import themePreferencesRoutes from './routes/themePreferencesRoutes';
import paymentRoutes from './routes/paymentRoutes'; // Adicionando rotas de pagamentos
import { errorHandler } from './middlewares/errorHandler';
import { authMiddleware } from './middlewares/authMiddleware';
import { ensureHttps } from './middlewares/httpsRedirect';
import mfaMiddleware from './middlewares/mfaMiddleware'; // Adicionando middleware para MFA
import logger from './middlewares/logger'; // Adicionando middleware de logger

import fs from 'fs';
import https from 'https';
import path from 'path';

const app = express();

// Configurar HTTPS com os certificados
const sslOptions = {
    key: fs.readFileSync(path.resolve(__dirname, '../certs/server.key')),
    cert: fs.readFileSync(path.resolve(__dirname, '../certs/server.cert'))
};  

https.createServer(sslOptions, app).listen(3001, () => { // Altere a porta para 3001
    console.log('Servidor HTTPS rodando na porta 3001');
});

// Middleware para garantir HTTPS em produção
if (process.env.NODE_ENV === 'production') {
    app.use(ensureHttps);
}

// Middleware de Logger para monitorar atividades
app.use((req, res, next) => {
    logger("info", "Request logged", { method: req.method, url: req.url });
    next();
});

// Middleware para parsear JSON
app.use(express.json());

// Configuração da sessão
app.use(session({
    secret: process.env.SESSION_SECRET || 'default_secret', // Use uma variável de ambiente para a chave secreta
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Apenas HTTPS em produção
        maxAge: 24 * 60 * 60 * 1000, // 24 horas
    }
}));

// Inicialização do Passport
app.use(passport.initialize());
app.use(passport.session());

// Middleware para autenticação multifator (MFA)
app.use(mfaMiddleware);

// Adicionando rotas
app.use('/api/auth', authRoutes); // Adicionando rotas de autenticação
app.use(authMiddleware); // Adicionando o middleware de autenticação
app.use('/api', userRoutes);
app.use('/api', appointmentRoutes);
app.use('/api', clinicRoutes); // Adicionando rotas de clínicas
app.use('/api', fileRoutes); // Adicionando rotas de upload de arquivos
app.use('/api', pageRoutes); // Adicionando rotas de páginas
app.use('/api', themeRoutes); // Adicionando rotas de temas
app.use('/api', patientRecordRoutes); // Adicionando rotas de prontuário do paciente
app.use('/api', invoiceRoutes); // Adicionando rotas de faturas
app.use('/api', messageRoutes); // Adicionando rotas de mensagens
app.use('/api', reportRoutes); // Adicionando rotas de relatórios
app.use('/api', whatsappRoutes); // Adicionando rotas de WhatsApp
app.use('/api', themePreferencesRoutes); // Adicionando rotas de preferências de tema
app.use('/api', paymentRoutes); // Adicionando rotas de pagamentos
app.use(errorHandler);

// Rota padrão
app.get('/', (req, res) => {
    res.setHeader('Content-Type', 'text/html'); // Ajuste aqui
    res.send('Olá mundo HTTPS!');
});

export default app;
