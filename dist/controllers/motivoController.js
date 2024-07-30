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
const motivo_1 = __importDefault(require("../models/motivo"));
const logger_1 = __importDefault(require("../middlewares/logger"));
// Criar um novo motivo
const createMotivo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const motivo = new motivo_1.default(req.body);
        yield motivo.save();
        (0, logger_1.default)('info', `Motivo criado: ${motivo._id}`);
        res.status(201).send(motivo);
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
        const motivos = yield motivo_1.default.find({});
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
        const motivo = yield motivo_1.default.findById(req.params.id);
        if (!motivo) {
            (0, logger_1.default)('error', `Motivo não encontrado: ${req.params.id}`);
            return res.status(404).send();
        }
        res.send(motivo);
    }
    catch (error) {
        (0, logger_1.default)('error', 'Erro ao obter motivo:', error);
        res.status(500).send(error);
    }
});
exports.getMotivo = getMotivo;
// Atualizar um motivo específico (USANDO TYPE ASSERTION)
const updateMotivo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'description'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));
    if (!isValidOperation) {
        return res.status(400).send({ error: 'Atualizações inválidas!' });
    }
    try {
        const motivo = yield motivo_1.default.findById(req.params.id);
        if (!motivo) {
            (0, logger_1.default)('error', `Motivo não encontrado: ${req.params.id}`);
            return res.status(404).send();
        }
        updates.forEach((update) => {
            motivo[update] = req.body[update]; // Use Type Assertion
        });
        yield motivo.save();
        (0, logger_1.default)('info', `Motivo atualizado: ${motivo._id}`);
        res.send(motivo);
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
        const motivo = yield motivo_1.default.findByIdAndDelete(req.params.id);
        if (!motivo) {
            (0, logger_1.default)('error', `Motivo não encontrado: ${req.params.id}`);
            return res.status(404).send();
        }
        (0, logger_1.default)('info', `Motivo deletado: ${motivo._id}`);
        res.send(motivo);
    }
    catch (error) {
        (0, logger_1.default)('error', 'Erro ao deletar motivo:', error);
        res.status(500).send(error);
    }
});
exports.deleteMotivo = deleteMotivo;
