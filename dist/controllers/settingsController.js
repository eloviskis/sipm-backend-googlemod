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
exports.deleteSetting = exports.updateSetting = exports.getSetting = exports.getSettings = exports.createSetting = void 0;
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const logger_1 = __importDefault(require("../middlewares/logger")); // Certifique-se de que logger está correto
const db = firebase_admin_1.default.firestore();
const settingsCollection = db.collection('settings');
// Função para validar dados das configurações
const validateSettingsData = (settings) => {
    if (!settings.key || typeof settings.key !== 'string') {
        throw new Error('A chave da configuração é obrigatória e deve ser uma string.');
    }
    if (typeof settings.value === 'undefined') {
        throw new Error('O valor da configuração é obrigatório.');
    }
    // Adicione outras validações necessárias
};
// Função para criar uma nova configuração
const createSetting = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const settings = req.body;
        // Validação dos dados da configuração
        validateSettingsData(settings);
        const docRef = yield settingsCollection.add(settings);
        const savedSettings = yield docRef.get();
        (0, logger_1.default)('info', `Configuração criada: ${docRef.id}`);
        res.status(201).send(Object.assign({ id: docRef.id }, savedSettings.data()));
    }
    catch (error) {
        (0, logger_1.default)('error', `Erro ao criar configuração: ${error.message}`);
        res.status(400).send({ error: error.message });
    }
});
exports.createSetting = createSetting;
// Função para obter todas as configurações
const getSettings = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const snapshot = yield settingsCollection.get();
        const settings = snapshot.docs.map(doc => (Object.assign({ id: doc.id }, doc.data())));
        res.send(settings);
    }
    catch (error) {
        (0, logger_1.default)('error', `Erro ao obter configurações: ${error.message}`);
        res.status(500).send({ error: error.message });
    }
});
exports.getSettings = getSettings;
// Função para obter uma configuração específica
const getSetting = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const doc = yield settingsCollection.doc(req.params.id).get();
        if (!doc.exists) {
            (0, logger_1.default)('error', `Configuração não encontrada: ${req.params.id}`);
            return res.status(404).send({ error: 'Configuração não encontrada' });
        }
        res.send(Object.assign({ id: doc.id }, doc.data()));
    }
    catch (error) {
        (0, logger_1.default)('error', `Erro ao obter configuração: ${error.message}`);
        res.status(500).send({ error: error.message });
    }
});
exports.getSetting = getSetting;
// Função para atualizar uma configuração específica
const updateSetting = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['key', 'value'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));
    if (!isValidOperation) {
        return res.status(400).send({ error: 'Atualizações inválidas!' });
    }
    try {
        const docRef = settingsCollection.doc(req.params.id);
        const doc = yield docRef.get();
        if (!doc.exists) {
            (0, logger_1.default)('error', `Configuração não encontrada: ${req.params.id}`);
            return res.status(404).send({ error: 'Configuração não encontrada' });
        }
        const settings = doc.data();
        updates.forEach((update) => {
            if (settings && update in settings) {
                settings[update] = req.body[update];
            }
        });
        yield docRef.update(settings);
        (0, logger_1.default)('info', `Configuração atualizada: ${docRef.id}`);
        res.send(Object.assign({ id: docRef.id }, settings));
    }
    catch (error) {
        (0, logger_1.default)('error', `Erro ao atualizar configuração: ${error.message}`);
        res.status(400).send({ error: error.message });
    }
});
exports.updateSetting = updateSetting;
// Função para deletar uma configuração
const deleteSetting = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const docRef = settingsCollection.doc(req.params.id);
        const doc = yield docRef.get();
        if (!doc.exists) {
            (0, logger_1.default)('error', `Configuração não encontrada: ${req.params.id}`);
            return res.status(404).send({ error: 'Configuração não encontrada' });
        }
        yield docRef.delete();
        (0, logger_1.default)('info', `Configuração deletada: ${docRef.id}`);
        res.send(Object.assign({ id: docRef.id }, doc.data()));
    }
    catch (error) {
        (0, logger_1.default)('error', `Erro ao deletar configuração: ${error.message}`);
        res.status(500).send({ error: error.message });
    }
});
exports.deleteSetting = deleteSetting;
