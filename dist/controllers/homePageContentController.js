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
exports.updateHomePageContent = exports.getHomePageContent = void 0;
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const logger_1 = __importDefault(require("../middlewares/logger")); // Adicionando middleware de logger
const db = firebase_admin_1.default.firestore();
const homePageContentDoc = db.collection('homePageContent').doc('mainContent');
// Função para validar o conteúdo da página inicial
const validateHomePageContent = (content) => {
    if (!content.title || typeof content.title !== 'string') {
        throw new Error('O título é obrigatório e deve ser uma string.');
    }
    if (!content.body || typeof content.body !== 'string') {
        throw new Error('O corpo do conteúdo é obrigatório e deve ser uma string.');
    }
    // Adicione outras validações necessárias
};
// Função para obter o conteúdo da página inicial
const getHomePageContent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const doc = yield homePageContentDoc.get();
        if (!doc.exists) {
            (0, logger_1.default)('error', 'Conteúdo da página inicial não encontrado'); // Adicionando log de erro
            return res.status(404).json({ message: 'Conteúdo da página inicial não encontrado' });
        }
        res.json(Object.assign({ id: doc.id }, doc.data()));
    }
    catch (error) {
        (0, logger_1.default)('error', `Erro ao obter conteúdo da página inicial: ${error.message}`); // Adicionando log de erro
        res.status(500).json({ error: 'Erro ao obter conteúdo da página inicial' });
    }
});
exports.getHomePageContent = getHomePageContent;
// Função para atualizar o conteúdo da página inicial
const updateHomePageContent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        validateHomePageContent(req.body);
        yield homePageContentDoc.set(req.body, { merge: true });
        const updatedDoc = yield homePageContentDoc.get();
        (0, logger_1.default)('info', 'Conteúdo da página inicial atualizado'); // Adicionando log de sucesso
        res.json(Object.assign({ id: updatedDoc.id }, updatedDoc.data()));
    }
    catch (error) {
        (0, logger_1.default)('error', `Erro ao atualizar conteúdo da página inicial: ${error.message}`); // Adicionando log de erro
        res.status(500).json({ error: 'Erro ao atualizar conteúdo da página inicial' });
    }
});
exports.updateHomePageContent = updateHomePageContent;
