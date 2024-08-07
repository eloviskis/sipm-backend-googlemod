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
exports.deleteMotivo = exports.updateMotivo = exports.getMotivoById = exports.getMotivos = exports.createMotivo = void 0;
const firebase_admin_1 = __importDefault(require("firebase-admin"));
// Inicializa o Firebase Admin SDK (certifique-se de que está configurado corretamente)
firebase_admin_1.default.initializeApp({
    credential: firebase_admin_1.default.credential.applicationDefault()
});
const db = firebase_admin_1.default.firestore();
const motivosCollection = db.collection('motivos');
// Função para criar um novo motivo
const createMotivo = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const docRef = yield motivosCollection.add(Object.assign(Object.assign({}, data), { createdAt: firebase_admin_1.default.firestore.FieldValue.serverTimestamp(), updatedAt: firebase_admin_1.default.firestore.FieldValue.serverTimestamp() }));
    const doc = yield docRef.get();
    return Object.assign({ id: doc.id }, doc.data());
});
exports.createMotivo = createMotivo;
// Função para obter todos os motivos
const getMotivos = () => __awaiter(void 0, void 0, void 0, function* () {
    const snapshot = yield motivosCollection.get();
    return snapshot.docs.map(doc => (Object.assign({ id: doc.id }, doc.data())));
});
exports.getMotivos = getMotivos;
// Função para obter um motivo específico
const getMotivoById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const doc = yield motivosCollection.doc(id).get();
    if (!doc.exists) {
        throw new Error('Motivo não encontrado');
    }
    return Object.assign({ id: doc.id }, doc.data());
});
exports.getMotivoById = getMotivoById;
// Função para atualizar um motivo
const updateMotivo = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const docRef = motivosCollection.doc(id);
    yield docRef.update(Object.assign(Object.assign({}, data), { updatedAt: firebase_admin_1.default.firestore.FieldValue.serverTimestamp() }));
    const doc = yield docRef.get();
    return Object.assign({ id: doc.id }, doc.data());
});
exports.updateMotivo = updateMotivo;
// Função para deletar um motivo
const deleteMotivo = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const docRef = motivosCollection.doc(id);
    yield docRef.delete();
    return { id };
});
exports.deleteMotivo = deleteMotivo;
