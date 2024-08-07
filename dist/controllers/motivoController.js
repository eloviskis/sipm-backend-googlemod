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
exports.deleteMotivo = exports.updateMotivo = exports.getMotivo = exports.getMotivos = exports.createMotivo = void 0;
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const logger_1 = __importDefault(require("../middlewares/logger"));
const db = firebase_admin_1.default.firestore();
const motivosCollection = db.collection('motivos');
// Criar um novo motivo
const createMotivo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const motivo = req.body;
        const docRef = yield motivosCollection.add(motivo);
        const savedMotivo = yield docRef.get();
        (0, logger_1.default)('info', `Motivo criado: ${docRef.id}`);
        res.status(201).send(Object.assign({ id: docRef.id }, savedMotivo.data()));
    }
    catch (error) {
        (0, logger_1.default)('error', 'Erro ao criar motivo:', error);
        res.status(400).send(error);
    }
});
exports.createMotivo = createMotivo;
// Obter todos os motivos
const getMotivos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const snapshot = yield motivosCollection.get();
        const motivos = snapshot.docs.map(doc => (Object.assign({ id: doc.id }, doc.data())));
        res.send(motivos);
    }
    catch (error) {
        (0, logger_1.default)('error', 'Erro ao obter motivos:', error);
        res.status(500).send(error);
    }
});
exports.getMotivos = getMotivos;
// Obter um motivo específico
const getMotivo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const doc = yield motivosCollection.doc(req.params.id).get();
        if (!doc.exists) {
            (0, logger_1.default)('error', `Motivo não encontrado: ${req.params.id}`);
            return res.status(404).send();
        }
        res.send(Object.assign({ id: doc.id }, doc.data()));
    }
    catch (error) {
        (0, logger_1.default)('error', 'Erro ao obter motivo:', error);
        res.status(500).send(error);
    }
});
exports.getMotivo = getMotivo;
// Atualizar um motivo específico
const updateMotivo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'description'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));
    if (!isValidOperation) {
        return res.status(400).send({ error: 'Atualizações inválidas!' });
    }
    try {
        const docRef = motivosCollection.doc(req.params.id);
        const doc = yield docRef.get();
        if (!doc.exists) {
            (0, logger_1.default)('error', `Motivo não encontrado: ${req.params.id}`);
            return res.status(404).send();
        }
        const motivo = doc.data();
        updates.forEach((update) => {
            if (motivo && update in motivo) {
                motivo[update] = req.body[update];
            }
        });
        yield docRef.update(motivo);
        (0, logger_1.default)('info', `Motivo atualizado: ${docRef.id}`);
        res.send(Object.assign({ id: docRef.id }, motivo));
    }
    catch (error) {
        (0, logger_1.default)('error', 'Erro ao atualizar motivo:', error);
        res.status(400).send(error);
    }
});
exports.updateMotivo = updateMotivo;
// Deletar um motivo específico
const deleteMotivo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const docRef = motivosCollection.doc(req.params.id);
        const doc = yield docRef.get();
        if (!doc.exists) {
            (0, logger_1.default)('error', `Motivo não encontrado: ${req.params.id}`);
            return res.status(404).send();
        }
        yield docRef.delete();
        (0, logger_1.default)('info', `Motivo deletado: ${docRef.id}`);
        res.send(Object.assign({ id: docRef.id }, doc.data()));
    }
    catch (error) {
        (0, logger_1.default)('error', 'Erro ao deletar motivo:', error);
        res.status(500).send(error);
    }
});
exports.deleteMotivo = deleteMotivo;
