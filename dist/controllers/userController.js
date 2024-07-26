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
exports.deleteUser = exports.updateUser = exports.createUser = void 0;
const user_1 = __importDefault(require("../models/user"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const logger_1 = __importDefault(require("../middlewares/logger")); // Adicionando middleware de logger
// Função para criar um novo usuário com criptografia de senha
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password, role, cnpj, cpf, financialResponsible, consent } = req.body;
        if (!consent) {
            return res.status(400).send({ error: 'O consentimento do usuário é obrigatório para o processamento de dados.' });
        }
        // Criptografar a senha antes de salvar
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        const user = new user_1.default({ name, email, password: hashedPassword, role, cnpj, cpf, financialResponsible });
        yield user.save();
        (0, logger_1.default)('info', `Usuário criado: ${user._id}`); // Adicionando log de criação de usuário
        res.status(201).send(user);
    }
    catch (error) {
        (0, logger_1.default)('error', 'Erro ao criar usuário:', error); // Adicionando log de erro
        res.status(400).send(error);
    }
});
exports.createUser = createUser;
// Atualizar usuário com criptografia de senha
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'email', 'password', 'role', 'cnpj', 'cpf', 'financialResponsible'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));
    if (!isValidOperation) {
        return res.status(400).send({ error: 'Atualizações inválidas!' });
    }
    try {
        const user = yield user_1.default.findById(req.params.id);
        if (!user) {
            (0, logger_1.default)('error', `Usuário não encontrado: ${req.params.id}`); // Adicionando log de erro
            return res.status(404).send();
        }
        for (const update of updates) {
            if (update === 'password') {
                user[update] = yield bcryptjs_1.default.hash(req.body[update], 10); // Criptografar a nova senha
            }
            else {
                user[update] = req.body[update];
            }
        }
        yield user.save();
        (0, logger_1.default)('info', `Usuário atualizado: ${user._id}`); // Adicionando log de atualização de usuário
        res.send(user);
    }
    catch (error) {
        (0, logger_1.default)('error', 'Erro ao atualizar usuário:', error); // Adicionando log de erro
        res.status(400).send(error);
    }
});
exports.updateUser = updateUser;
// Função para deletar um usuário
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_1.default.findByIdAndDelete(req.params.id);
        if (!user) {
            (0, logger_1.default)('error', `Usuário não encontrado: ${req.params.id}`); // Adicionando log de erro
            return res.status(404).send();
        }
        (0, logger_1.default)('info', `Usuário deletado: ${user._id}`); // Adicionando log de exclusão de usuário
        res.send({ message: 'Usuário deletado com sucesso.' });
    }
    catch (error) {
        (0, logger_1.default)('error', 'Erro ao deletar usuário:', error); // Adicionando log de erro
        res.status(500).send(error);
    }
});
exports.deleteUser = deleteUser;
