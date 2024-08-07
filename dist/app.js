"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport = __importStar(require("passport"));
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
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
const paymentRoutes_1 = __importDefault(require("./routes/paymentRoutes"));
const documentTemplateRoutes_1 = __importDefault(require("./routes/documentTemplateRoutes")); // Adicionar nova rota
const preConsultationRoutes_1 = __importDefault(require("./routes/preConsultationRoutes")); // Adicionar nova rota
const motivoRoutes_1 = __importDefault(require("./routes/motivoRoutes")); // Adicionar nova rota
const errorHandler_1 = require("./middlewares/errorHandler");
const authMiddleware_1 = require("./middlewares/authMiddleware");
const httpsRedirect_1 = require("./middlewares/httpsRedirect");
const mfaMiddleware_1 = __importDefault(require("./middlewares/mfaMiddleware"));
const logger_1 = __importDefault(require("./middlewares/logger"));
const accountsReceivableRoutes_1 = __importDefault(require("./routes/accountsReceivableRoutes"));
const accountsPayableRoutes_1 = __importDefault(require("./routes/accountsPayableRoutes"));
const fs_1 = __importDefault(require("fs"));
const https_1 = __importDefault(require("https"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const sslOptions = {
    key: fs_1.default.readFileSync(path_1.default.resolve(__dirname, '../certs/server.key')),
    cert: fs_1.default.readFileSync(path_1.default.resolve(__dirname, '../certs/server.cert'))
};
if (process.env.NODE_ENV === 'production') {
    app.use(httpsRedirect_1.ensureHttps);
}
app.use((req, res, next) => {
    (0, logger_1.default)("info", "Request logged", { method: req.method, url: req.url });
    next();
});
app.use(express_1.default.json());
app.use((0, express_session_1.default)({
    secret: process.env.SESSION_SECRET || 'default_secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 24 * 60 * 60 * 1000,
    }
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(mfaMiddleware_1.default);
app.use('/api/auth', authRoutes_1.default);
app.use(authMiddleware_1.authMiddleware);
app.use('/api/users', userRoutes_1.default);
app.use('/api/appointments', appointmentRoutes_1.default);
app.use('/api/clinics', clinicRoutes_1.default);
app.use('/api/files', fileRoutes_1.default);
app.use('/api/pages', pageRoutes_1.default);
app.use('/api/themes', themeRoutes_1.default);
app.use('/api/patient-records', patientRecordRoutes_1.default);
app.use('/api/invoices', invoiceRoutes_1.default);
app.use('/api/messages', messageRoutes_1.default);
app.use('/api/reports', reportRoutes_1.default);
app.use('/api/whatsapp', whatsappRoutes_1.default);
app.use('/api/theme-preferences', themePreferencesRoutes_1.default);
app.use('/api/payments', paymentRoutes_1.default);
app.use('/api/document-templates', documentTemplateRoutes_1.default); // Adicionar nova rota
app.use('/api/pre-consultations', preConsultationRoutes_1.default); // Adicionar nova rota
app.use('/api/motivos', motivoRoutes_1.default); // Adicionar nova rota
app.use('/api/accounts-receivable', accountsReceivableRoutes_1.default);
app.use('/api/accounts-payable', accountsPayableRoutes_1.default);
app.use(errorHandler_1.errorHandler);
app.get('/', (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.send('Olá mundo HTTPS!');
});
https_1.default.createServer(sslOptions, app).listen(3001, () => {
    console.log('Servidor HTTPS rodando na porta 3001');
});
exports.default = app;
