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
exports.deletePage = exports.updatePage = exports.getPage = exports.getPages = exports.createPage = void 0;
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const logger_1 = __importDefault(require("../middlewares/logger")); // Adicionando middleware de logger
const db = firebase_admin_1.default.firestore();
const pagesCollection = db.collection('pages');
// Função para validar dados da página
const validatePageData = (page) => {
    if (!page.title || typeof page.title !== 'string') {
        throw new Error('O título da página é obrigatório e deve ser uma string.');
    }
    if (!page.content || typeof page.content !== 'string') {
        throw new Error('O conteúdo da página é obrigatório e deve ser uma string.');
    }
    // Adicione outras validações necessárias
};
// Função para criar uma nova página
const createPage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = req.body;
        // Validação dos dados da página
        validatePageData(page);
        const docRef = yield pagesCollection.add(page);
        const savedPage = yield docRef.get();
        (0, logger_1.default)('info', `Página criada: ${docRef.id}`); // Adicionando log de criação de página
        res.status(201).send(Object.assign({ id: docRef.id }, savedPage.data()));
    }
    catch (error) {
        (0, logger_1.default)('error', `Erro ao criar página: ${error.message}`); // Adicionando log de erro
        res.status(400).send({ error: error.message });
    }
});
exports.createPage = createPage;
// Função para obter todas as páginas
const getPages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const snapshot = yield pagesCollection.get();
        const pages = snapshot.docs.map(doc => (Object.assign({ id: doc.id }, doc.data())));
        res.send(pages);
    }
    catch (error) {
        (0, logger_1.default)('error', `Erro ao obter páginas: ${error.message}`); // Adicionando log de erro
        res.status(500).send({ error: error.message });
    }
});
exports.getPages = getPages;
// Função para obter uma página específica
const getPage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const doc = yield pagesCollection.doc(req.params.id).get();
        if (!doc.exists) {
            (0, logger_1.default)('error', `Página não encontrada: ${req.params.id}`); // Adicionando log de erro
            return res.status(404).send({ error: 'Página não encontrada' });
        }
        res.send(Object.assign({ id: doc.id }, doc.data()));
    }
    catch (error) {
        (0, logger_1.default)('error', `Erro ao obter página: ${error.message}`); // Adicionando log de erro
        res.status(500).send({ error: error.message });
    }
});
exports.getPage = getPage;
// Função para atualizar uma página específica
const updatePage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['title', 'content'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));
    if (!isValidOperation) {
        return res.status(400).send({ error: 'Atualizações inválidas!' });
    }
    try {
        const docRef = pagesCollection.doc(req.params.id);
        const doc = yield docRef.get();
        if (!doc.exists) {
            (0, logger_1.default)('error', `Página não encontrada: ${req.params.id}`); // Adicionando log de erro
            return res.status(404).send({ error: 'Página não encontrada' });
        }
        const page = doc.data();
        updates.forEach((update) => {
            if (page && update in page) {
                page[update] = req.body[update];
            }
        });
        yield docRef.update(page);
        (0, logger_1.default)('info', `Página atualizada: ${docRef.id}`); // Adicionando log de atualização de página
        res.send(Object.assign({ id: docRef.id }, page));
    }
    catch (error) {
        (0, logger_1.default)('error', `Erro ao atualizar página: ${error.message}`); // Adicionando log de erro
        res.status(400).send({ error: error.message });
    }
});
exports.updatePage = updatePage;
// Função para deletar uma página específica
const deletePage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const docRef = pagesCollection.doc(req.params.id);
        const doc = yield docRef.get();
        if (!doc.exists) {
            (0, logger_1.default)('error', `Página não encontrada: ${req.params.id}`); // Adicionando log de erro
            return res.status(404).send({ error: 'Página não encontrada' });
        }
        yield docRef.delete();
        (0, logger_1.default)('info', `Página deletada: ${docRef.id}`); // Adicionando log de deleção de página
        res.send(Object.assign({ id: docRef.id }, doc.data()));
    }
    catch (error) {
        (0, logger_1.default)('error', `Erro ao deletar página: ${error.message}`); // Adicionando log de erro
        res.status(500).send({ error: error.message });
    }
});
exports.deletePage = deletePage;
