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
exports.deleteDocumentTemplate = exports.updateDocumentTemplate = exports.getDocumentTemplate = exports.getDocumentTemplates = exports.createDocumentTemplate = void 0;
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const logger_1 = __importDefault(require("../middlewares/logger"));
const db = firebase_admin_1.default.firestore();
const documentTemplatesCollection = db.collection('documentTemplates');
// Criar um novo modelo de documento
const createDocumentTemplate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const template = req.body;
        const docRef = yield documentTemplatesCollection.add(template);
        const savedTemplate = yield docRef.get();
        (0, logger_1.default)('info', `Modelo de documento criado: ${docRef.id}`);
        res.status(201).send(Object.assign({ id: docRef.id }, savedTemplate.data()));
    }
    catch (error) {
        (0, logger_1.default)('error', 'Erro ao criar modelo de documento:', error);
        res.status(400).send(error);
    }
});
exports.createDocumentTemplate = createDocumentTemplate;
// Obter todos os modelos de documentos
const getDocumentTemplates = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const snapshot = yield documentTemplatesCollection.get();
        const templates = snapshot.docs.map(doc => (Object.assign({ id: doc.id }, doc.data())));
        res.send(templates);
    }
    catch (error) {
        (0, logger_1.default)('error', 'Erro ao obter modelos de documentos:', error);
        res.status(500).send(error);
    }
});
exports.getDocumentTemplates = getDocumentTemplates;
// Obter um modelo de documento específico
const getDocumentTemplate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const doc = yield documentTemplatesCollection.doc(req.params.id).get();
        if (!doc.exists) {
            (0, logger_1.default)('error', `Modelo de documento não encontrado: ${req.params.id}`);
            return res.status(404).send();
        }
        res.send(Object.assign({ id: doc.id }, doc.data()));
    }
    catch (error) {
        (0, logger_1.default)('error', 'Erro ao obter modelo de documento:', error);
        res.status(500).send(error);
    }
});
exports.getDocumentTemplate = getDocumentTemplate;
// Atualizar um modelo de documento específico
const updateDocumentTemplate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'content'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));
    if (!isValidOperation) {
        return res.status(400).send({ error: 'Atualizações inválidas!' });
    }
    try {
        const docRef = documentTemplatesCollection.doc(req.params.id);
        const doc = yield docRef.get();
        if (!doc.exists) {
            (0, logger_1.default)('error', `Modelo de documento não encontrado: ${req.params.id}`);
            return res.status(404).send();
        }
        const template = doc.data();
        updates.forEach((update) => {
            if (template && update in template) {
                template[update] = req.body[update];
            }
        });
        yield docRef.update(template);
        (0, logger_1.default)('info', `Modelo de documento atualizado: ${docRef.id}`);
        res.send(Object.assign({ id: docRef.id }, template));
    }
    catch (error) {
        (0, logger_1.default)('error', 'Erro ao atualizar modelo de documento:', error);
        res.status(400).send(error);
    }
});
exports.updateDocumentTemplate = updateDocumentTemplate;
// Deletar um modelo de documento específico
const deleteDocumentTemplate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const docRef = documentTemplatesCollection.doc(req.params.id);
        const doc = yield docRef.get();
        if (!doc.exists) {
            (0, logger_1.default)('error', `Modelo de documento não encontrado: ${req.params.id}`);
            return res.status(404).send();
        }
        yield docRef.delete();
        (0, logger_1.default)('info', `Modelo de documento deletado: ${docRef.id}`);
        res.send(Object.assign({ id: docRef.id }, doc.data()));
    }
    catch (error) {
        (0, logger_1.default)('error', 'Erro ao deletar modelo de documento:', error);
        res.status(500).send(error);
    }
});
exports.deleteDocumentTemplate = deleteDocumentTemplate;
