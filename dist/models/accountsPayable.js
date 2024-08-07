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
exports.deleteAccountsPayable = exports.updateAccountsPayable = exports.getAccountsPayableById = exports.getAccountsPayable = exports.createAccountsPayable = void 0;
const firebase_admin_1 = __importDefault(require("firebase-admin"));
// Inicializa o Firebase Admin SDK (certifique-se de que está configurado corretamente)
firebase_admin_1.default.initializeApp({
    credential: firebase_admin_1.default.credential.applicationDefault()
});
const db = firebase_admin_1.default.firestore();
const accountsPayableCollection = db.collection('accountsPayable');
// Função para criar uma nova conta a pagar
const createAccountsPayable = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const docRef = yield accountsPayableCollection.add(Object.assign(Object.assign({}, data), { createdAt: firebase_admin_1.default.firestore.FieldValue.serverTimestamp(), updatedAt: firebase_admin_1.default.firestore.FieldValue.serverTimestamp() }));
    const doc = yield docRef.get();
    return Object.assign({ id: doc.id }, doc.data());
});
exports.createAccountsPayable = createAccountsPayable;
// Função para obter todas as contas a pagar
const getAccountsPayable = () => __awaiter(void 0, void 0, void 0, function* () {
    const snapshot = yield accountsPayableCollection.get();
    return snapshot.docs.map(doc => (Object.assign({ id: doc.id }, doc.data())));
});
exports.getAccountsPayable = getAccountsPayable;
// Função para obter uma conta a pagar específica
const getAccountsPayableById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const doc = yield accountsPayableCollection.doc(id).get();
    if (!doc.exists) {
        throw new Error('Conta a pagar não encontrada');
    }
    return Object.assign({ id: doc.id }, doc.data());
});
exports.getAccountsPayableById = getAccountsPayableById;
// Função para atualizar uma conta a pagar
const updateAccountsPayable = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const docRef = accountsPayableCollection.doc(id);
    yield docRef.update(Object.assign(Object.assign({}, data), { updatedAt: firebase_admin_1.default.firestore.FieldValue.serverTimestamp() }));
    const doc = yield docRef.get();
    return Object.assign({ id: doc.id }, doc.data());
});
exports.updateAccountsPayable = updateAccountsPayable;
// Função para deletar uma conta a pagar
const deleteAccountsPayable = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const docRef = accountsPayableCollection.doc(id);
    yield docRef.delete();
    return { id };
});
exports.deleteAccountsPayable = deleteAccountsPayable;
