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
exports.deleteClinic = exports.getClinic = exports.getClinics = exports.updateClinic = exports.createClinic = void 0;
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const logger_1 = __importDefault(require("../middlewares/logger")); // Adicionando middleware de logger
const db = firebase_admin_1.default.firestore();
const clinicsCollection = db.collection('clinics');
// Função para validar dados da clínica
const validateClinic = (clinic) => {
    if (!clinic.name) {
        throw new Error('O nome da clínica é obrigatório.');
    }
    if (!clinic.financialResponsible) {
        throw new Error('O responsável financeiro é obrigatório.');
    }
    // Adicione outras validações necessárias
};
// Criar uma nova clínica
const createClinic = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const clinic = req.body;
        validateClinic(clinic);
        const docRef = yield clinicsCollection.add(clinic);
        const savedClinic = yield docRef.get();
        (0, logger_1.default)('info', `Clínica criada: ${docRef.id}`); // Adicionando log de criação de clínica
        res.status(201).send(Object.assign({ id: docRef.id }, savedClinic.data()));
    }
    catch (error) {
        (0, logger_1.default)('error', 'Erro ao criar clínica:', error); // Adicionando log de erro
        res.status(400).send({ error: error.message });
    }
});
exports.createClinic = createClinic;
// Atualizar uma clínica
const updateClinic = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'financialResponsible', 'customization'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));
    if (!isValidOperation) {
        return res.status(400).send({ error: 'Atualizações inválidas!' });
    }
    try {
        const docRef = clinicsCollection.doc(req.params.id);
        const doc = yield docRef.get();
        if (!doc.exists) {
            (0, logger_1.default)('error', `Clínica não encontrada: ${req.params.id}`); // Adicionando log de erro
            return res.status(404).send({ error: 'Clínica não encontrada.' });
        }
        const clinic = doc.data();
        updates.forEach((update) => {
            if (clinic && update in clinic) {
                clinic[update] = req.body[update];
            }
        });
        yield docRef.update(clinic);
        (0, logger_1.default)('info', `Clínica atualizada: ${docRef.id}`); // Adicionando log de atualização de clínica
        res.send(Object.assign({ id: docRef.id }, clinic));
    }
    catch (error) {
        (0, logger_1.default)('error', 'Erro ao atualizar clínica:', error); // Adicionando log de erro
        res.status(400).send({ error: error.message });
    }
});
exports.updateClinic = updateClinic;
// Obter todas as clínicas
const getClinics = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const snapshot = yield clinicsCollection.get();
        const clinics = snapshot.docs.map(doc => (Object.assign({ id: doc.id }, doc.data())));
        res.send(clinics);
    }
    catch (error) {
        (0, logger_1.default)('error', 'Erro ao obter clínicas:', error); // Adicionando log de erro
        res.status(500).send({ error: error.message });
    }
});
exports.getClinics = getClinics;
// Obter uma clínica específica
const getClinic = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const doc = yield clinicsCollection.doc(req.params.id).get();
        if (!doc.exists) {
            (0, logger_1.default)('error', `Clínica não encontrada: ${req.params.id}`); // Adicionando log de erro
            return res.status(404).send({ error: 'Clínica não encontrada.' });
        }
        res.send(Object.assign({ id: doc.id }, doc.data()));
    }
    catch (error) {
        (0, logger_1.default)('error', 'Erro ao obter clínica:', error); // Adicionando log de erro
        res.status(500).send({ error: error.message });
    }
});
exports.getClinic = getClinic;
// Deletar uma clínica
const deleteClinic = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const docRef = clinicsCollection.doc(req.params.id);
        const doc = yield docRef.get();
        if (!doc.exists) {
            (0, logger_1.default)('error', `Clínica não encontrada: ${req.params.id}`); // Adicionando log de erro
            return res.status(404).send({ error: 'Clínica não encontrada.' });
        }
        yield docRef.delete();
        (0, logger_1.default)('info', `Clínica deletada: ${docRef.id}`); // Adicionando log de deleção de clínica
        res.send(Object.assign({ id: docRef.id }, doc.data()));
    }
    catch (error) {
        (0, logger_1.default)('error', 'Erro ao deletar clínica:', error); // Adicionando log de erro
        res.status(500).send({ error: error.message });
    }
});
exports.deleteClinic = deleteClinic;
