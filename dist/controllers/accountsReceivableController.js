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
exports.deleteAccountReceivable = exports.updateAccountReceivable = exports.getAccountReceivable = exports.getAccountsReceivable = exports.createAccountReceivable = void 0;
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const logger_1 = __importDefault(require("../middlewares/logger")); // Adicionando middleware de logger
const db = firebase_admin_1.default.firestore();
const accountsReceivableCollection = db.collection('accountsReceivable');
// Criar uma nova conta a receber
const createAccountReceivable = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const accountReceivable = req.body;
        const docRef = yield accountsReceivableCollection.add(accountReceivable);
        const savedAccount = yield docRef.get();
        (0, logger_1.default)('info', `Conta a receber criada: ${docRef.id}`); // Adicionando log de criação
        res.status(201).send(Object.assign({ id: docRef.id }, savedAccount.data()));
    }
    catch (error) {
        (0, logger_1.default)('error', 'Erro ao criar conta a receber:', error); // Adicionando log de erro
        res.status(400).send(error);
    }
});
exports.createAccountReceivable = createAccountReceivable;
// Obter todas as contas a receber
const getAccountsReceivable = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const snapshot = yield accountsReceivableCollection.get();
        const accountsReceivable = snapshot.docs.map(doc => (Object.assign({ id: doc.id }, doc.data())));
        res.send(accountsReceivable);
    }
    catch (error) {
        (0, logger_1.default)('error', 'Erro ao obter contas a receber:', error); // Adicionando log de erro
        res.status(500).send(error);
    }
});
exports.getAccountsReceivable = getAccountsReceivable;
// Obter uma conta a receber específica
const getAccountReceivable = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const doc = yield accountsReceivableCollection.doc(req.params.id).get();
        if (!doc.exists) {
            (0, logger_1.default)('error', `Conta a receber não encontrada: ${req.params.id}`); // Adicionando log de erro
            return res.status(404).send();
        }
        res.send(Object.assign({ id: doc.id }, doc.data()));
    }
    catch (error) {
        (0, logger_1.default)('error', 'Erro ao obter conta a receber:', error); // Adicionando log de erro
        res.status(500).send(error);
    }
});
exports.getAccountReceivable = getAccountReceivable;
// Atualizar uma conta a receber
const updateAccountReceivable = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'amount'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));
    if (!isValidOperation) {
        return res.status(400).send({ error: 'Atualizações inválidas!' });
    }
    try {
        const docRef = accountsReceivableCollection.doc(req.params.id);
        const doc = yield docRef.get();
        if (!doc.exists) {
            (0, logger_1.default)('error', `Conta a receber não encontrada: ${req.params.id}`); // Adicionando log de erro
            return res.status(404).send();
        }
        const accountReceivable = doc.data();
        updates.forEach((update) => (accountReceivable[update] = req.body[update]));
        yield docRef.update(accountReceivable);
        (0, logger_1.default)('info', `Conta a receber atualizada: ${docRef.id}`); // Adicionando log de atualização
        res.send(Object.assign({ id: docRef.id }, accountReceivable));
    }
    catch (error) {
        (0, logger_1.default)('error', 'Erro ao atualizar conta a receber:', error); // Adicionando log de erro
        res.status(400).send(error);
    }
});
exports.updateAccountReceivable = updateAccountReceivable;
// Deletar uma conta a receber
const deleteAccountReceivable = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const docRef = accountsReceivableCollection.doc(req.params.id);
        const doc = yield docRef.get();
        if (!doc.exists) {
            (0, logger_1.default)('error', `Conta a receber não encontrada: ${req.params.id}`); // Adicionando log de erro
            return res.status(404).send();
        }
        yield docRef.delete();
        (0, logger_1.default)('info', `Conta a receber deletada: ${req.params.id}`); // Adicionando log de deleção
        res.send(Object.assign({ id: docRef.id }, doc.data()));
    }
    catch (error) {
        (0, logger_1.default)('error', 'Erro ao deletar conta a receber:', error); // Adicionando log de erro
        res.status(500).send(error);
    }
});
exports.deleteAccountReceivable = deleteAccountReceivable;
