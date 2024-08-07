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
exports.deletePatientRecord = exports.updatePatientRecord = exports.getPatientRecordById = exports.getPatientRecords = exports.createPatientRecord = void 0;
const firebase_admin_1 = __importDefault(require("firebase-admin"));
// Inicializa o Firebase Admin SDK (certifique-se de que está configurado corretamente)
firebase_admin_1.default.initializeApp({
    credential: firebase_admin_1.default.credential.applicationDefault()
});
const db = firebase_admin_1.default.firestore();
const patientRecordsCollection = db.collection('patientRecords');
// Função para criar um novo prontuário de paciente
const createPatientRecord = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const docRef = yield patientRecordsCollection.add(Object.assign(Object.assign({}, data), { createdAt: firebase_admin_1.default.firestore.FieldValue.serverTimestamp(), updatedAt: firebase_admin_1.default.firestore.FieldValue.serverTimestamp() }));
    const doc = yield docRef.get();
    return Object.assign({ id: doc.id }, doc.data());
});
exports.createPatientRecord = createPatientRecord;
// Função para obter todos os prontuários de pacientes
const getPatientRecords = () => __awaiter(void 0, void 0, void 0, function* () {
    const snapshot = yield patientRecordsCollection.get();
    return snapshot.docs.map(doc => (Object.assign({ id: doc.id }, doc.data())));
});
exports.getPatientRecords = getPatientRecords;
// Função para obter um prontuário específico
const getPatientRecordById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const doc = yield patientRecordsCollection.doc(id).get();
    if (!doc.exists) {
        throw new Error('Prontuário não encontrado');
    }
    return Object.assign({ id: doc.id }, doc.data());
});
exports.getPatientRecordById = getPatientRecordById;
// Função para atualizar um prontuário de paciente
const updatePatientRecord = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const docRef = patientRecordsCollection.doc(id);
    yield docRef.update(Object.assign(Object.assign({}, data), { updatedAt: firebase_admin_1.default.firestore.FieldValue.serverTimestamp() }));
    const doc = yield docRef.get();
    return Object.assign({ id: doc.id }, doc.data());
});
exports.updatePatientRecord = updatePatientRecord;
// Função para deletar um prontuário de paciente
const deletePatientRecord = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const docRef = patientRecordsCollection.doc(id);
    yield docRef.delete();
    return { id };
});
exports.deletePatientRecord = deletePatientRecord;
