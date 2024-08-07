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
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const logger_1 = __importDefault(require("../middlewares/logger")); // Adicionando middleware de logger
const db = firebase_admin_1.default.firestore();
const themesCollection = db.collection('themes');
// Função para criar um novo tema
const createTheme = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const theme = req.body;
        const docRef = yield themesCollection.add(theme);
        const savedTheme = yield docRef.get();
        (0, logger_1.default)('info', `Tema criado: ${docRef.id}`); // Adicionando log de criação de tema
        res.status(201).send(Object.assign({ id: docRef.id }, savedTheme.data()));
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
        const snapshot = yield themesCollection.get();
        const themes = snapshot.docs.map(doc => (Object.assign({ id: doc.id }, doc.data())));
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
        const doc = yield themesCollection.doc(req.params.id).get();
        if (!doc.exists) {
            (0, logger_1.default)('error', `Tema não encontrado: ${req.params.id}`); // Adicionando log de erro
            return res.status(404).send();
        }
        res.send(Object.assign({ id: doc.id }, doc.data()));
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
        const docRef = themesCollection.doc(req.params.id);
        const doc = yield docRef.get();
        if (!doc.exists) {
            (0, logger_1.default)('error', `Tema não encontrado: ${req.params.id}`); // Adicionando log de erro
            return res.status(404).send();
        }
        const theme = doc.data();
        updates.forEach((update) => {
            if (theme && update in theme) {
                theme[update] = req.body[update];
            }
        });
        yield docRef.update(theme);
        (0, logger_1.default)('info', `Tema atualizado: ${docRef.id}`); // Adicionando log de atualização de tema
        res.send(Object.assign({ id: docRef.id }, theme));
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
        const docRef = themesCollection.doc(req.params.id);
        const doc = yield docRef.get();
        if (!doc.exists) {
            (0, logger_1.default)('error', `Tema não encontrado: ${req.params.id}`); // Adicionando log de erro
            return res.status(404).send();
        }
        yield docRef.delete();
        (0, logger_1.default)('info', `Tema deletado: ${docRef.id}`); // Adicionando log de deleção de tema
        res.send(Object.assign({ id: docRef.id }, doc.data()));
    }
    catch (error) {
        (0, logger_1.default)('error', 'Erro ao deletar tema:', error); // Adicionando log de erro
        res.status(500).send(error);
    }
});
exports.deleteTheme = deleteTheme;
