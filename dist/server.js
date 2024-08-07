"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
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
const customization_1 = __importDefault(require("./routes/customization")); // Adicionando a rota de customização
const logger_1 = __importDefault(require("./middlewares/logger")); // Adicionando logger
const httpsRedirect_1 = require("./middlewares/httpsRedirect"); // Adicionando redirecionamento HTTPS
const app = (0, express_1.default)();
const port = process.env.PORT || 8080;
// Middleware para redirecionar HTTP para HTTPS
if (process.env.NODE_ENV === 'production') {
    app.use(httpsRedirect_1.ensureHttps);
}
// Middlewares
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
// Logger middleware para registrar requisições
app.use((req, res, next) => {
    (0, logger_1.default)('info', 'Request logged', { method: req.method, url: req.url });
    next();
});
// Configurar HTTPS com os certificados (comentado para o deploy no GCP)
// const sslOptions = {
//     key: fs.readFileSync(path.resolve(__dirname, '../certs/server.key')),
//     cert: fs.readFileSync(path.resolve(__dirname, '../certs/server.cert'))
// };
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
app.use('/api/customization', customization_1.default); // Adicionando a rota de customização
// Middleware para servir arquivos estáticos (ex.: favicon)
app.use('/uploads', express_1.default.static(path_1.default.join(__dirname, '../public/uploads')));
// Rota básica
app.get('/', (req, res) => {
    res.send('Olá mundo HTTPS!');
});
// Iniciando o servidor HTTP (modificado para deploy no GCP)
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
