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
exports.deleteDocumentTemplate = exports.updateDocumentTemplate = exports.getDocumentTemplateById = exports.getDocumentTemplates = exports.createDocumentTemplate = void 0;
const firebase_admin_1 = __importDefault(require("firebase-admin"));
// Inicializa o Firebase Admin SDK (certifique-se de que está configurado corretamente)
firebase_admin_1.default.initializeApp({
    credential: firebase_admin_1.default.credential.applicationDefault()
});
const db = firebase_admin_1.default.firestore();
const documentTemplatesCollection = db.collection('documentTemplates');
// Função para criar um novo modelo de documento
const createDocumentTemplate = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const docRef = yield documentTemplatesCollection.add(Object.assign(Object.assign({}, data), { createdAt: firebase_admin_1.default.firestore.FieldValue.serverTimestamp(), updatedAt: firebase_admin_1.default.firestore.FieldValue.serverTimestamp() }));
    const doc = yield docRef.get();
    return Object.assign({ id: doc.id }, doc.data());
});
exports.createDocumentTemplate = createDocumentTemplate;
// Função para obter todos os modelos de documentos
const getDocumentTemplates = () => __awaiter(void 0, void 0, void 0, function* () {
    const snapshot = yield documentTemplatesCollection.get();
    return snapshot.docs.map(doc => (Object.assign({ id: doc.id }, doc.data())));
});
exports.getDocumentTemplates = getDocumentTemplates;
// Função para obter um modelo de documento específico
const getDocumentTemplateById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const doc = yield documentTemplatesCollection.doc(id).get();
    if (!doc.exists) {
        throw new Error('Modelo de documento não encontrado');
    }
    return Object.assign({ id: doc.id }, doc.data());
});
exports.getDocumentTemplateById = getDocumentTemplateById;
// Função para atualizar um modelo de documento
const updateDocumentTemplate = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const docRef = documentTemplatesCollection.doc(id);
    yield docRef.update(Object.assign(Object.assign({}, data), { updatedAt: firebase_admin_1.default.firestore.FieldValue.serverTimestamp() }));
    const doc = yield docRef.get();
    return Object.assign({ id: doc.id }, doc.data());
});
exports.updateDocumentTemplate = updateDocumentTemplate;
// Função para deletar um modelo de documento
const deleteDocumentTemplate = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const docRef = documentTemplatesCollection.doc(id);
    yield docRef.delete();
    return { id };
});
exports.deleteDocumentTemplate = deleteDocumentTemplate;
