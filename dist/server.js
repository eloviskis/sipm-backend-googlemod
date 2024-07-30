"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const https_1 = __importDefault(require("https"));
const path_1 = __importDefault(require("path"));
const body_parser_1 = __importDefault(require("body-parser"));
const appointmentRoutes_1 = __importDefault(require("./routes/appointmentRoutes"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const clinicRoutes_1 = __importDefault(require("./routes/clinicRoutes"));
const fileRoutes_1 = __importDefault(require("./routes/fileRoutes"));
const homePageContentRoutes_1 = __importDefault(require("./routes/homePageContentRoutes"));
const invoiceRoutes_1 = __importDefault(require("./routes/invoiceRoutes"));
const legalRoutes_1 = __importDefault(require("./routes/legalRoutes"));
const messageRoutes_1 = __importDefault(require("./routes/messageRoutes"));
const pageRoutes_1 = __importDefault(require("./routes/pageRoutes"));
const patientRecordRoutes_1 = __importDefault(require("./routes/patientRecordRoutes"));
const paymentRoutes_1 = __importDefault(require("./routes/paymentRoutes"));
const reportRoutes_1 = __importDefault(require("./routes/reportRoutes"));
const themePreferencesRoutes_1 = __importDefault(require("./routes/themePreferencesRoutes"));
const themeRoutes_1 = __importDefault(require("./routes/themeRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const whatsappRoutes_1 = __importDefault(require("./routes/whatsappRoutes"));
const app = (0, express_1.default)();
// Middlewares
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
// Configurar HTTPS com os certificados
const sslOptions = {
    key: fs_1.default.readFileSync(path_1.default.resolve(__dirname, '../certs/server.key')),
    cert: fs_1.default.readFileSync(path_1.default.resolve(__dirname, '../certs/server.cert'))
};
// Rotas
app.use('/api/appointments', appointmentRoutes_1.default);
app.use('/api/auth', authRoutes_1.default);
app.use('/api/clinics', clinicRoutes_1.default);
app.use('/api/files', fileRoutes_1.default);
app.use('/api/home-page-content', homePageContentRoutes_1.default);
app.use('/api/invoices', invoiceRoutes_1.default);
app.use('/api/legal', legalRoutes_1.default);
app.use('/api/messages', messageRoutes_1.default);
app.use('/api/pages', pageRoutes_1.default);
app.use('/api/patient-records', patientRecordRoutes_1.default);
app.use('/api/payments', paymentRoutes_1.default);
app.use('/api/reports', reportRoutes_1.default);
app.use('/api/theme-preferences', themePreferencesRoutes_1.default);
app.use('/api/themes', themeRoutes_1.default);
app.use('/api/users', userRoutes_1.default);
app.use('/api/whatsapp', whatsappRoutes_1.default);
// Rota básica
app.get('/', (req, res) => {
    res.send('Olá mundo HTTPS!');
});
https_1.default.createServer(sslOptions, app).listen(3001, () => {
    console.log('Servidor HTTPS rodando na porta 3001');
});
