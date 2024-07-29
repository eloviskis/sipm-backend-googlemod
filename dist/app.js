"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const passport_1 = __importDefault(require("./config/passport"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const appointmentRoutes_1 = __importDefault(require("./routes/appointmentRoutes"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const clinicRoutes_1 = __importDefault(require("./routes/clinicRoutes"));
const fileRoutes_1 = __importDefault(require("./routes/fileRoutes"));
const pageRoutes_1 = __importDefault(require("./routes/pageRoutes"));
const themeRoutes_1 = __importDefault(require("./routes/themeRoutes"));
const patientRecordRoutes_1 = __importDefault(require("./routes/patientRecordRoutes"));
const invoiceRoutes_1 = __importDefault(require("./routes/invoiceRoutes"));
const messageRoutes_1 = __importDefault(require("./routes/messageRoutes"));
const reportRoutes_1 = __importDefault(require("./routes/reportRoutes"));
const whatsappRoutes_1 = __importDefault(require("./routes/whatsappRoutes"));
const themePreferencesRoutes_1 = __importDefault(require("./routes/themePreferencesRoutes"));
const paymentRoutes_1 = __importDefault(require("./routes/paymentRoutes")); // Adicionando rotas de pagamentos
const errorHandler_1 = require("./middlewares/errorHandler");
const authMiddleware_1 = require("./middlewares/authMiddleware");
const httpsRedirect_1 = require("./middlewares/httpsRedirect");
const mfaMiddleware_1 = __importDefault(require("./middlewares/mfaMiddleware")); // Adicionando middleware para MFA
const logger_1 = __importDefault(require("./middlewares/logger")); // Adicionando middleware de logger
const fs_1 = __importDefault(require("fs"));
const https_1 = __importDefault(require("https"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
// Middleware para garantir HTTPS em produção
if (process.env.NODE_ENV === 'production') {
    app.use(httpsRedirect_1.ensureHttps);
}
// Middleware de Logger para monitorar atividades
app.use((req, res, next) => {
    (0, logger_1.default)("info", "Request logged", { method: req.method, url: req.url });
    next();
});
// Configuração da sessão
app.use((0, express_session_1.default)({
    secret: process.env.SESSION_SECRET || 'default_secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 24 * 60 * 60 * 1000, // 24 horas
    }
}));
// Inicialização do Passport
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
// Middleware para autenticação multifator (MFA)
app.use(mfaMiddleware_1.default);
// Middleware para parsear JSON
app.use(express_1.default.json());
app.use('/api/auth', authRoutes_1.default); // Adicionando rotas de autenticação
app.use(authMiddleware_1.authMiddleware); // Adicionando o middleware de autenticação
app.use('/api', userRoutes_1.default);
app.use('/api', appointmentRoutes_1.default);
app.use('/api', clinicRoutes_1.default); // Adicionando rotas de clínicas
app.use('/api', fileRoutes_1.default); // Adicionando rotas de upload de arquivos
app.use('/api', pageRoutes_1.default); // Adicionando rotas de páginas
app.use('/api', themeRoutes_1.default); // Adicionando rotas de temas
app.use('/api', patientRecordRoutes_1.default); // Adicionando rotas de prontuário do paciente
app.use('/api', invoiceRoutes_1.default); // Adicionando rotas de faturas
app.use('/api', messageRoutes_1.default); // Adicionando rotas de mensagens
app.use('/api', reportRoutes_1.default); // Adicionando rotas de relatórios
app.use('/api', whatsappRoutes_1.default); // Adicionando rotas de WhatsApp
app.use('/api', themePreferencesRoutes_1.default); // Adicionando rotas de preferências de tema
app.use('/api', paymentRoutes_1.default); // Adicionando rotas de pagamentos
app.use(errorHandler_1.errorHandler);
// Rota padrão
app.get('/', (req, res) => {
    res.send('Olá mundo HTTPS!');
});
// Configurar HTTPS com os certificados
const sslOptions = {
    key: fs_1.default.readFileSync(path_1.default.resolve(__dirname, '../certs/server.key')),
    cert: fs_1.default.readFileSync(path_1.default.resolve(__dirname, '../certs/server.cert'))
};
https_1.default.createServer(sslOptions, app).listen(3001, () => {
    console.log('Servidor HTTPS rodando na porta 3001');
});
exports.default = app;
