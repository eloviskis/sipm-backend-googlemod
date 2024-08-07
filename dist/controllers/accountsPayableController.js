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
exports.deleteAccountPayable = exports.updateAccountPayable = exports.getAccountPayable = exports.getAccountsPayable = exports.createAccountPayable = void 0;
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const logger_1 = __importDefault(require("../middlewares/logger")); // Adicionando middleware de logger
const db = firebase_admin_1.default.firestore();
const accountsPayableCollection = db.collection('accountsPayable');
// Criar uma nova conta a pagar
const createAccountPayable = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const accountPayable = req.body;
        const docRef = yield accountsPayableCollection.add(accountPayable);
        const savedAccount = yield docRef.get();
        (0, logger_1.default)('info', `Conta a pagar criada: ${docRef.id}`); // Adicionando log de criação
        res.status(201).send(Object.assign({ id: docRef.id }, savedAccount.data()));
    }
    catch (error) {
        (0, logger_1.default)('error', 'Erro ao criar conta a pagar:', error); // Adicionando log de erro
        res.status(400).send(error);
    }
});
exports.createAccountPayable = createAccountPayable;
// Obter todas as contas a pagar
const getAccountsPayable = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const snapshot = yield accountsPayableCollection.get();
        const accountsPayable = snapshot.docs.map(doc => (Object.assign({ id: doc.id }, doc.data())));
        res.send(accountsPayable);
    }
    catch (error) {
        (0, logger_1.default)('error', 'Erro ao obter contas a pagar:', error); // Adicionando log de erro
        res.status(500).send(error);
    }
});
exports.getAccountsPayable = getAccountsPayable;
// Obter uma conta a pagar específica
const getAccountPayable = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const doc = yield accountsPayableCollection.doc(req.params.id).get();
        if (!doc.exists) {
            (0, logger_1.default)('error', `Conta a pagar não encontrada: ${req.params.id}`); // Adicionando log de erro
            return res.status(404).send();
        }
        res.send(Object.assign({ id: doc.id }, doc.data()));
    }
    catch (error) {
        (0, logger_1.default)('error', 'Erro ao obter conta a pagar:', error); // Adicionando log de erro
        res.status(500).send(error);
    }
});
exports.getAccountPayable = getAccountPayable;
// Atualizar uma conta a pagar
const updateAccountPayable = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'amount'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));
    if (!isValidOperation) {
        return res.status(400).send({ error: 'Atualizações inválidas!' });
    }
    try {
        const docRef = accountsPayableCollection.doc(req.params.id);
        const doc = yield docRef.get();
        if (!doc.exists) {
            (0, logger_1.default)('error', `Conta a pagar não encontrada: ${req.params.id}`); // Adicionando log de erro
            return res.status(404).send();
        }
        const accountPayable = doc.data();
        updates.forEach((update) => (accountPayable[update] = req.body[update]));
        yield docRef.update(accountPayable);
        (0, logger_1.default)('info', `Conta a pagar atualizada: ${docRef.id}`); // Adicionando log de atualização
        res.send(Object.assign({ id: docRef.id }, accountPayable));
    }
    catch (error) {
        (0, logger_1.default)('error', 'Erro ao atualizar conta a pagar:', error); // Adicionando log de erro
        res.status(400).send(error);
    }
});
exports.updateAccountPayable = updateAccountPayable;
// Deletar uma conta a pagar
const deleteAccountPayable = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const docRef = accountsPayableCollection.doc(req.params.id);
        const doc = yield docRef.get();
        if (!doc.exists) {
            (0, logger_1.default)('error', `Conta a pagar não encontrada: ${req.params.id}`); // Adicionando log de erro
            return res.status(404).send();
        }
        yield docRef.delete();
        (0, logger_1.default)('info', `Conta a pagar deletada: ${req.params.id}`); // Adicionando log de deleção
        res.send(Object.assign({ id: docRef.id }, doc.data()));
    }
    catch (error) {
        (0, logger_1.default)('error', 'Erro ao deletar conta a pagar:', error); // Adicionando log de erro
        res.status(500).send(error);
    }
});
exports.deleteAccountPayable = deleteAccountPayable;
