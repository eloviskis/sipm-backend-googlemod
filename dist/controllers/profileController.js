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
exports.updateProfile = exports.getProfile = void 0;
const user_1 = __importDefault(require("../models/user"));
const logger_1 = __importDefault(require("../middlewares/logger"));
// Função para obter o perfil do usuário
const getProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.user) {
            (0, logger_1.default)('error', 'Usuário não autenticado');
            return res.status(401).send({ error: 'Usuário não autenticado' });
        }
        const userId = req.user._id;
        const user = yield user_1.default.findById(userId);
        if (!user) {
            (0, logger_1.default)('error', `Usuário não encontrado: ${userId}`);
            return res.status(404).send({ error: 'Usuário não encontrado' });
        }
        (0, logger_1.default)('info', `Perfil obtido para o usuário: ${userId}`);
        res.send({ name: user.name, email: user.email });
    }
    catch (error) {
        (0, logger_1.default)('error', 'Erro ao obter perfil do usuário:', error);
        res.status(500).send({ error: 'Erro ao obter perfil do usuário' });
    }
});
exports.getProfile = getProfile;
// Função para atualizar o perfil do usuário
const updateProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.user) {
            (0, logger_1.default)('error', 'Usuário não autenticado');
            return res.status(401).send({ error: 'Usuário não autenticado' });
        }
        const userId = req.user._id;
        const updates = Object.keys(req.body);
        const allowedUpdates = ['name', 'email'];
        const isValidOperation = updates.every((update) => allowedUpdates.includes(update));
        if (!isValidOperation) {
            return res.status(400).send({ error: 'Atualizações inválidas!' });
        }
        const user = yield user_1.default.findById(userId);
        if (!user) {
            (0, logger_1.default)('error', `Usuário não encontrado: ${userId}`);
            return res.status(404).send({ error: 'Usuário não encontrado' });
        }
        updates.forEach((update) => {
            if (update in user) {
                user[update] = req.body[update];
            }
        });
        yield user.save();
        (0, logger_1.default)('info', `Perfil atualizado para o usuário: ${userId}`);
        res.send({ name: user.name, email: user.email });
    }
    catch (error) {
        (0, logger_1.default)('error', 'Erro ao atualizar perfil do usuário:', error);
        res.status(500).send({ error: 'Erro ao atualizar perfil do usuário' });
    }
});
exports.updateProfile = updateProfile;
