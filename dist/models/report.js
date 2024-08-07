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
exports.deleteReport = exports.updateReport = exports.getReportById = exports.getReports = exports.createReport = void 0;
const firebase_admin_1 = __importDefault(require("firebase-admin"));
// Inicializa o Firebase Admin SDK (certifique-se de que está configurado corretamente)
firebase_admin_1.default.initializeApp({
    credential: firebase_admin_1.default.credential.applicationDefault()
});
const db = firebase_admin_1.default.firestore();
const reportsCollection = db.collection('reports');
// Função para criar um novo relatório
const createReport = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const docRef = yield reportsCollection.add(Object.assign(Object.assign({}, data), { createdAt: firebase_admin_1.default.firestore.FieldValue.serverTimestamp(), updatedAt: firebase_admin_1.default.firestore.FieldValue.serverTimestamp() }));
    const doc = yield docRef.get();
    return Object.assign({ id: doc.id }, doc.data());
});
exports.createReport = createReport;
// Função para obter todos os relatórios
const getReports = () => __awaiter(void 0, void 0, void 0, function* () {
    const snapshot = yield reportsCollection.get();
    return snapshot.docs.map(doc => (Object.assign({ id: doc.id }, doc.data())));
});
exports.getReports = getReports;
// Função para obter um relatório específico
const getReportById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const doc = yield reportsCollection.doc(id).get();
    if (!doc.exists) {
        throw new Error('Relatório não encontrado');
    }
    return Object.assign({ id: doc.id }, doc.data());
});
exports.getReportById = getReportById;
// Função para atualizar um relatório
const updateReport = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const docRef = reportsCollection.doc(id);
    yield docRef.update(Object.assign(Object.assign({}, data), { updatedAt: firebase_admin_1.default.firestore.FieldValue.serverTimestamp() }));
    const doc = yield docRef.get();
    return Object.assign({ id: doc.id }, doc.data());
});
exports.updateReport = updateReport;
// Função para deletar um relatório
const deleteReport = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const docRef = reportsCollection.doc(id);
    yield docRef.delete();
    return { id };
});
exports.deleteReport = deleteReport;
