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
exports.deleteTheme = exports.updateTheme = exports.getTheme = exports.getThemes = exports.createTheme = void 0;
const theme_1 = __importDefault(require("../models/theme"));
const logger_1 = __importDefault(require("../middlewares/logger")); // Adicionando middleware de logger
// Função para criar um novo tema
const createTheme = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const theme = new theme_1.default(req.body);
        const savedTheme = yield theme.save();
        (0, logger_1.default)('info', `Tema criado: ${savedTheme._id}`); // Adicionando log de criação de tema
        res.status(201).send(savedTheme);
    }
    catch (error) {
        (0, logger_1.default)('error', 'Erro ao criar tema:', error); // Adicionando log de erro
        res.status(400).send(error);
    }
});
exports.createTheme = createTheme;
// Função para obter todos os temas
const getThemes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const themes = yield theme_1.default.find({});
        res.send(themes);
    }
    catch (error) {
        (0, logger_1.default)('error', 'Erro ao obter temas:', error); // Adicionando log de erro
        res.status(500).send(error);
    }
});
exports.getThemes = getThemes;
// Função para obter um tema específico
const getTheme = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const theme = yield theme_1.default.findById(req.params.id);
        if (!theme) {
            (0, logger_1.default)('error', `Tema não encontrado: ${req.params.id}`); // Adicionando log de erro
            return res.status(404).send();
        }
        res.send(theme);
    }
    catch (error) {
        (0, logger_1.default)('error', 'Erro ao obter tema:', error); // Adicionando log de erro
        res.status(500).send(error);
    }
});
exports.getTheme = getTheme;
// Função para atualizar um tema específico
const updateTheme = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'layout', 'colors'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));
    if (!isValidOperation) {
        return res.status(400).send({ error: 'Atualizações inválidas!' });
    }
    try {
        const theme = yield theme_1.default.findById(req.params.id);
        if (!theme) {
            (0, logger_1.default)('error', `Tema não encontrado: ${req.params.id}`); // Adicionando log de erro
            return res.status(404).send();
        }
        updates.forEach((update) => {
            if (update in theme) {
                theme[update] = req.body[update];
            }
        });
        yield theme.save();
        (0, logger_1.default)('info', `Tema atualizado: ${theme._id}`); // Adicionando log de atualização de tema
        res.send(theme);
    }
    catch (error) {
        (0, logger_1.default)('error', 'Erro ao atualizar tema:', error); // Adicionando log de erro
        res.status(400).send(error);
    }
});
exports.updateTheme = updateTheme;
// Função para deletar um tema específico
const deleteTheme = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const theme = yield theme_1.default.findByIdAndDelete(req.params.id);
        if (!theme) {
            (0, logger_1.default)('error', `Tema não encontrado: ${req.params.id}`); // Adicionando log de erro
            return res.status(404).send();
        }
        (0, logger_1.default)('info', `Tema deletado: ${theme._id}`); // Adicionando log de deleção de tema
        res.send(theme);
    }
    catch (error) {
        (0, logger_1.default)('error', 'Erro ao deletar tema:', error); // Adicionando log de erro
        res.status(500).send(error);
    }
});
exports.deleteTheme = deleteTheme;
