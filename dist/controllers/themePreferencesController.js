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
exports.updateThemePreferences = void 0;
const user_1 = __importDefault(require("../models/user"));
const logger_1 = __importDefault(require("../middlewares/logger")); // Adicionando middleware de logger
// Função para atualizar as preferências de tema do usuário
const updateThemePreferences = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const { primaryColor, secondaryColor, backgroundColor } = req.body;
    try {
        const user = yield user_1.default.findById(userId);
        if (!user) {
            (0, logger_1.default)('error', `Usuário não encontrado: ${userId}`); // Adicionando log de erro
            return res.status(404).send({ error: 'Usuário não encontrado.' });
        }
        user.themePreferences = { primaryColor, secondaryColor, backgroundColor };
        yield user.save();
        (0, logger_1.default)('info', `Preferências de tema atualizadas para o usuário: ${userId}`); // Adicionando log de sucesso
        res.send(user.themePreferences);
    }
    catch (error) {
        (0, logger_1.default)('error', 'Erro ao atualizar preferências de tema:', error); // Adicionando log de erro
        res.status(400).send(error);
    }
});
exports.updateThemePreferences = updateThemePreferences;
