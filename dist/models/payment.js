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
exports.deletePayment = exports.updatePayment = exports.getPaymentById = exports.getPayments = exports.createPayment = void 0;
const firebase_admin_1 = __importDefault(require("firebase-admin"));
// Inicializa o Firebase Admin SDK (certifique-se de que está configurado corretamente)
firebase_admin_1.default.initializeApp({
    credential: firebase_admin_1.default.credential.applicationDefault()
});
const db = firebase_admin_1.default.firestore();
const paymentsCollection = db.collection('payments');
// Função para criar um novo pagamento
const createPayment = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const docRef = yield paymentsCollection.add(Object.assign(Object.assign({}, data), { createdAt: firebase_admin_1.default.firestore.FieldValue.serverTimestamp(), updatedAt: firebase_admin_1.default.firestore.FieldValue.serverTimestamp() }));
    const doc = yield docRef.get();
    return Object.assign({ id: doc.id }, doc.data());
});
exports.createPayment = createPayment;
// Função para obter todos os pagamentos
const getPayments = () => __awaiter(void 0, void 0, void 0, function* () {
    const snapshot = yield paymentsCollection.get();
    return snapshot.docs.map(doc => (Object.assign({ id: doc.id }, doc.data())));
});
exports.getPayments = getPayments;
// Função para obter um pagamento específico
const getPaymentById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const doc = yield paymentsCollection.doc(id).get();
    if (!doc.exists) {
        throw new Error('Pagamento não encontrado');
    }
    return Object.assign({ id: doc.id }, doc.data());
});
exports.getPaymentById = getPaymentById;
// Função para atualizar um pagamento
const updatePayment = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const docRef = paymentsCollection.doc(id);
    yield docRef.update(Object.assign(Object.assign({}, data), { updatedAt: firebase_admin_1.default.firestore.FieldValue.serverTimestamp() }));
    const doc = yield docRef.get();
    return Object.assign({ id: doc.id }, doc.data());
});
exports.updatePayment = updatePayment;
// Função para deletar um pagamento
const deletePayment = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const docRef = paymentsCollection.doc(id);
    yield docRef.delete();
    return { id };
});
exports.deletePayment = deletePayment;
