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
import { errorHandler } from './middlewares/errorHandler';
import { authMiddleware } from './middlewares/authMiddleware';
import { ensureHttps } from './middlewares/httpsRedirect';

const app = express();

// Middleware para garantir HTTPS
app.use(ensureHttps);

// Configuração da sessão
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true,
}));

// Inicialização do Passport
app.use(passport.initialize());
app.use(passport.session());

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
app.use(errorHandler);

export default app;
