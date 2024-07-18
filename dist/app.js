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
const errorHandler_1 = require("./middlewares/errorHandler");
const authMiddleware_1 = require("./middlewares/authMiddleware");
const httpsRedirect_1 = require("./middlewares/httpsRedirect");
const app = (0, express_1.default)();
// Middleware para garantir HTTPS
app.use(httpsRedirect_1.ensureHttps);
// Configuração da sessão
app.use((0, express_session_1.default)({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true,
}));
// Inicialização do Passport
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
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
app.use(errorHandler_1.errorHandler);
exports.default = app;
