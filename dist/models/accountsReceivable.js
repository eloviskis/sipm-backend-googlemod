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
exports.deleteAccountsReceivable = exports.updateAccountsReceivable = exports.getAccountsReceivableById = exports.getAccountsReceivable = exports.createAccountsReceivable = void 0;
const firebase_admin_1 = __importDefault(require("firebase-admin"));
// Inicializa o Firebase Admin SDK (certifique-se de que está configurado corretamente)
firebase_admin_1.default.initializeApp({
    credential: firebase_admin_1.default.credential.applicationDefault()
});
const db = firebase_admin_1.default.firestore();
const accountsReceivableCollection = db.collection('accountsReceivable');
// Função para criar uma nova conta a receber
const createAccountsReceivable = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const docRef = yield accountsReceivableCollection.add(Object.assign(Object.assign({}, data), { createdAt: firebase_admin_1.default.firestore.FieldValue.serverTimestamp(), updatedAt: firebase_admin_1.default.firestore.FieldValue.serverTimestamp() }));
    const doc = yield docRef.get();
    return Object.assign({ id: doc.id }, doc.data());
});
exports.createAccountsReceivable = createAccountsReceivable;
// Função para obter todas as contas a receber
const getAccountsReceivable = () => __awaiter(void 0, void 0, void 0, function* () {
    const snapshot = yield accountsReceivableCollection.get();
    return snapshot.docs.map(doc => (Object.assign({ id: doc.id }, doc.data())));
});
exports.getAccountsReceivable = getAccountsReceivable;
// Função para obter uma conta a receber específica
const getAccountsReceivableById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const doc = yield accountsReceivableCollection.doc(id).get();
    if (!doc.exists) {
        throw new Error('Conta a receber não encontrada');
    }
    return Object.assign({ id: doc.id }, doc.data());
});
exports.getAccountsReceivableById = getAccountsReceivableById;
// Função para atualizar uma conta a receber
const updateAccountsReceivable = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const docRef = accountsReceivableCollection.doc(id);
    yield docRef.update(Object.assign(Object.assign({}, data), { updatedAt: firebase_admin_1.default.firestore.FieldValue.serverTimestamp() }));
    const doc = yield docRef.get();
    return Object.assign({ id: doc.id }, doc.data());
});
exports.updateAccountsReceivable = updateAccountsReceivable;
// Função para deletar uma conta a receber
const deleteAccountsReceivable = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const docRef = accountsReceivableCollection.doc(id);
    yield docRef.delete();
    return { id };
});
exports.deleteAccountsReceivable = deleteAccountsReceivable;
