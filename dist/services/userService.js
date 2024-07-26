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
exports.getUserById = exports.deleteUser = exports.updateUser = exports.createUser = void 0;
const user_1 = __importDefault(require("../models/user"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const logger_1 = __importDefault(require("../middlewares/logger")); // Adicionando middleware de logger
// Função para criar um novo usuário
const createUser = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const hashedPassword = yield bcryptjs_1.default.hash(userData.password, 10);
        const user = new user_1.default(Object.assign(Object.assign({}, userData), { password: hashedPassword }));
        const savedUser = yield user.save();
        (0, logger_1.default)('info', `Usuário criado: ${savedUser._id}`); // Adicionando log de criação de usuário
        return savedUser;
    }
    catch (error) {
        (0, logger_1.default)('error', `Erro ao criar usuário: ${error.message}`); // Adicionando log de erro
        throw new Error(`Erro ao criar usuário: ${error.message}`);
    }
});
exports.createUser = createUser;
// Função para atualizar um usuário
const updateUser = (userId, updates) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (updates.password) {
            updates.password = yield bcryptjs_1.default.hash(updates.password, 10);
        }
        const user = yield user_1.default.findByIdAndUpdate(userId, updates, { new: true, runValidators: true });
        if (!user) {
            (0, logger_1.default)('error', `Usuário não encontrado: ${userId}`); // Adicionando log de erro
            throw new Error('Usuário não encontrado');
        }
        (0, logger_1.default)('info', `Usuário atualizado: ${user._id}`); // Adicionando log de atualização de usuário
        return user;
    }
    catch (error) {
        (0, logger_1.default)('error', `Erro ao atualizar usuário: ${error.message}`); // Adicionando log de erro
        throw new Error(`Erro ao atualizar usuário: ${error.message}`);
    }
});
exports.updateUser = updateUser;
// Função para deletar um usuário
const deleteUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_1.default.findByIdAndDelete(userId);
        if (!user) {
            (0, logger_1.default)('error', `Usuário não encontrado: ${userId}`); // Adicionando log de erro
            throw new Error('Usuário não encontrado');
        }
        (0, logger_1.default)('info', `Usuário deletado: ${user._id}`); // Adicionando log de deleção de usuário
        return user;
    }
    catch (error) {
        (0, logger_1.default)('error', `Erro ao deletar usuário: ${error.message}`); // Adicionando log de erro
        throw new Error(`Erro ao deletar usuário: ${error.message}`);
    }
});
exports.deleteUser = deleteUser;
// Função para buscar um usuário por ID
const getUserById = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_1.default.findById(userId);
        if (!user) {
            (0, logger_1.default)('error', `Usuário não encontrado: ${userId}`); // Adicionando log de erro
            throw new Error('Usuário não encontrado');
        }
        (0, logger_1.default)('info', `Usuário encontrado: ${user._id}`); // Adicionando log de busca de usuário
        return user;
    }
    catch (error) {
        (0, logger_1.default)('error', `Erro ao buscar usuário: ${error.message}`); // Adicionando log de erro
        throw new Error(`Erro ao buscar usuário: ${error.message}`);
    }
});
exports.getUserById = getUserById;
