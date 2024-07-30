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
const accountsReceivable_1 = __importDefault(require("../models/accountsReceivable")); // Update the path to the correct module
const logger_1 = __importDefault(require("../middlewares/logger")); // Adicionando middleware de logger
// Criar uma nova conta a receber
const createAccountReceivable = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const accountReceivable = new accountsReceivable_1.default(req.body);
        const savedAccount = yield accountReceivable.save();
        (0, logger_1.default)('info', `Conta a receber criada: ${savedAccount._id}`); // Adicionando log de criação
        res.status(201).send(savedAccount);
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
        const accountsReceivable = yield accountsReceivable_1.default.find({});
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
        const accountReceivable = yield accountsReceivable_1.default.findById(req.params.id);
        if (!accountReceivable) {
            (0, logger_1.default)('error', `Conta a receber não encontrada: ${req.params.id}`); // Adicionando log de erro
            return res.status(404).send();
        }
        res.send(accountReceivable);
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
        const accountReceivable = yield accountsReceivable_1.default.findById(req.params.id);
        if (!accountReceivable) {
            (0, logger_1.default)('error', `Conta a receber não encontrada: ${req.params.id}`); // Adicionando log de erro
            return res.status(404).send();
        }
        updates.forEach((update) => (accountReceivable[update] = req.body[update]));
        yield accountReceivable.save();
        (0, logger_1.default)('info', `Conta a receber atualizada: ${accountReceivable._id}`); // Adicionando log de atualização
        res.send(accountReceivable);
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
        const accountReceivable = yield accountsReceivable_1.default.findByIdAndDelete(req.params.id);
        if (!accountReceivable) {
            (0, logger_1.default)('error', `Conta a receber não encontrada: ${req.params.id}`); // Adicionando log de erro
            return res.status(404).send();
        }
        (0, logger_1.default)('info', `Conta a receber deletada: ${accountReceivable._id}`); // Adicionando log de deleção
        res.send(accountReceivable);
    }
    catch (error) {
        (0, logger_1.default)('error', 'Erro ao deletar conta a receber:', error); // Adicionando log de erro
        res.status(500).send(error);
    }
});
exports.deleteAccountReceivable = deleteAccountReceivable;
