"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getReport = exports.getReports = exports.createReport = void 0;
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const logger_1 = __importDefault(require("../middlewares/logger"));
const reportNotificationService_1 = require("../services/reportNotificationService");
const db = firebase_admin_1.default.firestore();
const reportsCollection = db.collection('reports');
// Função para validar dados do relatório
const validateReportData = (report) => {
    if (!report.title || typeof report.title !== 'string') {
        throw new Error('O título do relatório é obrigatório e deve ser uma string.');
    }
    if (!report.content || typeof report.content !== 'string') {
        throw new Error('O conteúdo do relatório é obrigatório e deve ser uma string.');
    }
    // Adicione outras validações necessárias
};
// Função para criar um novo relatório
const createReport = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const report = req.body;
        // Validação dos dados do relatório
        validateReportData(report);
        const docRef = yield reportsCollection.add(report);
        const savedReport = yield docRef.get();
        (0, logger_1.default)('info', `Relatório criado: ${docRef.id}`);
        // Verificar se o email do usuário está disponível
        if (req.user && req.user.email) {
            yield (0, reportNotificationService_1.sendReportNotification)(req.user.email, docRef.id);
        }
        else {
            (0, logger_1.default)('error', 'Email do usuário não encontrado para enviar notificação');
        }
        res.status(201).send(Object.assign({ id: docRef.id }, savedReport.data()));
    }
    catch (error) {
        (0, logger_1.default)('error', `Erro ao criar relatório: ${error.message}`);
        res.status(400).send({ error: error.message });
    }
});
exports.createReport = createReport;
// Função para obter todos os relatórios
const getReports = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const snapshot = yield reportsCollection.get();
        const reports = snapshot.docs.map(doc => (Object.assign({ id: doc.id }, doc.data())));
        res.send(reports);
    }
    catch (error) {
        (0, logger_1.default)('error', `Erro ao obter relatórios: ${error.message}`);
        res.status(500).send({ error: error.message });
    }
});
exports.getReports = getReports;
// Função para obter um relatório específico
const getReport = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const doc = yield reportsCollection.doc(req.params.id).get();
        if (!doc.exists) {
            (0, logger_1.default)('error', `Relatório não encontrado: ${req.params.id}`);
            return res.status(404).send({ error: 'Relatório não encontrado' });
        }
        res.send(Object.assign({ id: doc.id }, doc.data()));
    }
    catch (error) {
        (0, logger_1.default)('error', `Erro ao obter relatório: ${error.message}`);
        res.status(500).send({ error: error.message });
    }
});
exports.getReport = getReport;
