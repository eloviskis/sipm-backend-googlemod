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
exports.deletePreConsultation = exports.updatePreConsultation = exports.getPreConsultationById = exports.getPreConsultations = exports.createPreConsultation = void 0;
const firebase_admin_1 = __importDefault(require("firebase-admin"));
// Inicializa o Firebase Admin SDK (certifique-se de que está configurado corretamente)
firebase_admin_1.default.initializeApp({
    credential: firebase_admin_1.default.credential.applicationDefault()
});
const db = firebase_admin_1.default.firestore();
const preConsultationsCollection = db.collection('preConsultations');
// Função para criar uma nova pré-consulta
const createPreConsultation = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const docRef = yield preConsultationsCollection.add(Object.assign(Object.assign({}, data), { createdAt: firebase_admin_1.default.firestore.FieldValue.serverTimestamp(), updatedAt: firebase_admin_1.default.firestore.FieldValue.serverTimestamp() }));
    const doc = yield docRef.get();
    return Object.assign({ id: doc.id }, doc.data());
});
exports.createPreConsultation = createPreConsultation;
// Função para obter todas as pré-consultas
const getPreConsultations = () => __awaiter(void 0, void 0, void 0, function* () {
    const snapshot = yield preConsultationsCollection.get();
    return snapshot.docs.map(doc => (Object.assign({ id: doc.id }, doc.data())));
});
exports.getPreConsultations = getPreConsultations;
// Função para obter uma pré-consulta específica
const getPreConsultationById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const doc = yield preConsultationsCollection.doc(id).get();
    if (!doc.exists) {
        throw new Error('Pré-consulta não encontrada');
    }
    return Object.assign({ id: doc.id }, doc.data());
});
exports.getPreConsultationById = getPreConsultationById;
// Função para atualizar uma pré-consulta
const updatePreConsultation = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const docRef = preConsultationsCollection.doc(id);
    yield docRef.update(Object.assign(Object.assign({}, data), { updatedAt: firebase_admin_1.default.firestore.FieldValue.serverTimestamp() }));
    const doc = yield docRef.get();
    return Object.assign({ id: doc.id }, doc.data());
});
exports.updatePreConsultation = updatePreConsultation;
// Função para deletar uma pré-consulta
const deletePreConsultation = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const docRef = preConsultationsCollection.doc(id);
    yield docRef.delete();
    return { id };
});
exports.deletePreConsultation = deletePreConsultation;
