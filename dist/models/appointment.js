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
exports.deleteAppointment = exports.updateAppointment = exports.getAppointmentById = exports.getAppointments = exports.createAppointment = void 0;
const firebase_admin_1 = __importDefault(require("firebase-admin"));
// Inicializa o Firebase Admin SDK (certifique-se de que está configurado corretamente)
firebase_admin_1.default.initializeApp({
    credential: firebase_admin_1.default.credential.applicationDefault()
});
const db = firebase_admin_1.default.firestore();
const appointmentsCollection = db.collection('appointments');
// Função para criar um novo agendamento
const createAppointment = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const docRef = yield appointmentsCollection.add(Object.assign(Object.assign({}, data), { createdAt: firebase_admin_1.default.firestore.FieldValue.serverTimestamp(), updatedAt: firebase_admin_1.default.firestore.FieldValue.serverTimestamp() }));
    const doc = yield docRef.get();
    return Object.assign({ id: doc.id }, doc.data());
});
exports.createAppointment = createAppointment;
// Função para obter todos os agendamentos
const getAppointments = () => __awaiter(void 0, void 0, void 0, function* () {
    const snapshot = yield appointmentsCollection.get();
    return snapshot.docs.map(doc => (Object.assign({ id: doc.id }, doc.data())));
});
exports.getAppointments = getAppointments;
// Função para obter um agendamento específico
const getAppointmentById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const doc = yield appointmentsCollection.doc(id).get();
    if (!doc.exists) {
        throw new Error('Agendamento não encontrado');
    }
    return Object.assign({ id: doc.id }, doc.data());
});
exports.getAppointmentById = getAppointmentById;
// Função para atualizar um agendamento
const updateAppointment = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const docRef = appointmentsCollection.doc(id);
    yield docRef.update(Object.assign(Object.assign({}, data), { updatedAt: firebase_admin_1.default.firestore.FieldValue.serverTimestamp() }));
    const doc = yield docRef.get();
    return Object.assign({ id: doc.id }, doc.data());
});
exports.updateAppointment = updateAppointment;
// Função para deletar um agendamento
const deleteAppointment = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const docRef = appointmentsCollection.doc(id);
    yield docRef.delete();
    return { id };
});
exports.deleteAppointment = deleteAppointment;
