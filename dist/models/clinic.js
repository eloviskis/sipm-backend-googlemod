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
exports.deleteClinic = exports.updateClinic = exports.getClinicById = exports.getClinics = exports.createClinic = void 0;
const firebase_admin_1 = __importDefault(require("firebase-admin"));
// Inicializa o Firebase Admin SDK (certifique-se de que está configurado corretamente)
firebase_admin_1.default.initializeApp({
    credential: firebase_admin_1.default.credential.applicationDefault()
});
const db = firebase_admin_1.default.firestore();
const clinicsCollection = db.collection('clinics');
// Função para criar uma nova clínica
const createClinic = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const docRef = yield clinicsCollection.add(Object.assign(Object.assign({}, data), { createdAt: firebase_admin_1.default.firestore.FieldValue.serverTimestamp(), updatedAt: firebase_admin_1.default.firestore.FieldValue.serverTimestamp() }));
    const doc = yield docRef.get();
    return Object.assign({ id: doc.id }, doc.data());
});
exports.createClinic = createClinic;
// Função para obter todas as clínicas
const getClinics = () => __awaiter(void 0, void 0, void 0, function* () {
    const snapshot = yield clinicsCollection.get();
    return snapshot.docs.map(doc => (Object.assign({ id: doc.id }, doc.data())));
});
exports.getClinics = getClinics;
// Função para obter uma clínica específica
const getClinicById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const doc = yield clinicsCollection.doc(id).get();
    if (!doc.exists) {
        throw new Error('Clínica não encontrada');
    }
    return Object.assign({ id: doc.id }, doc.data());
});
exports.getClinicById = getClinicById;
// Função para atualizar uma clínica
const updateClinic = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const docRef = clinicsCollection.doc(id);
    yield docRef.update(Object.assign(Object.assign({}, data), { updatedAt: firebase_admin_1.default.firestore.FieldValue.serverTimestamp() }));
    const doc = yield docRef.get();
    return Object.assign({ id: doc.id }, doc.data());
});
exports.updateClinic = updateClinic;
// Função para deletar uma clínica
const deleteClinic = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const docRef = clinicsCollection.doc(id);
    yield docRef.delete();
    return { id };
});
exports.deleteClinic = deleteClinic;
