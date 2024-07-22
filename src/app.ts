import express from 'express';
import session from 'express-session';
import passport from './config/passport';
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
import paymentRoutes from './routes/paymentRoutes'; // Adicionando rotas de pagamentos
import { errorHandler } from './middlewares/errorHandler';
import { authMiddleware } from './middlewares/authMiddleware';
import { ensureHttps } from './middlewares/httpsRedirect';
import mfaMiddleware from './middlewares/mfaMiddleware'; // Adicionando middleware para MFA
import logger from './middlewares/logger'; // Adicionando middleware de logger

const app = express();

// Middleware para garantir HTTPS em produção
if (process.env.NODE_ENV === 'production') {
    app.use(ensureHttps);
}

// Middleware de Logger para monitorar atividades
app.use(logger);

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

app.use(express.json());
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

export default app;
