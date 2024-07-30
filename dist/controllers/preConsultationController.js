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
exports.deletePreConsultation = exports.updatePreConsultation = exports.getPreConsultation = exports.getPreConsultations = exports.createPreConsultation = void 0;
const preConsultation_1 = __importDefault(require("../models/preConsultation"));
const logger_1 = __importDefault(require("../middlewares/logger"));
// Criar uma nova pré-consulta
const createPreConsultation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const preConsultation = new preConsultation_1.default(req.body);
        yield preConsultation.save();
        (0, logger_1.default)('info', `Pré-consulta criada: ${preConsultation._id}`);
        res.status(201).send(preConsultation);
    }
    catch (error) {
        (0, logger_1.default)('error', 'Erro ao criar pré-consulta:', error);
        res.status(400).send(error);
    }
});
exports.createPreConsultation = createPreConsultation;
// Obter todas as pré-consultas
const getPreConsultations = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const preConsultations = yield preConsultation_1.default.find({});
        res.send(preConsultations);
    }
    catch (error) {
        (0, logger_1.default)('error', 'Erro ao obter pré-consultas:', error);
        res.status(500).send(error);
    }
});
exports.getPreConsultations = getPreConsultations;
// Obter uma pré-consulta específica
const getPreConsultation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const preConsultation = yield preConsultation_1.default.findById(req.params.id);
        if (!preConsultation) {
            (0, logger_1.default)('error', `Pré-consulta não encontrada: ${req.params.id}`);
            return res.status(404).send();
        }
        res.send(preConsultation);
    }
    catch (error) {
        (0, logger_1.default)('error', 'Erro ao obter pré-consulta:', error);
        res.status(500).send(error);
    }
});
exports.getPreConsultation = getPreConsultation;
// Atualizar uma pré-consulta específica (USANDO TYPE ASSERTION)
const updatePreConsultation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'details'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));
    if (!isValidOperation) {
        return res.status(400).send({ error: 'Atualizações inválidas!' });
    }
    try {
        const preConsultation = yield preConsultation_1.default.findById(req.params.id);
        if (!preConsultation) {
            (0, logger_1.default)('error', `Pré-consulta não encontrada: ${req.params.id}`);
            return res.status(404).send();
        }
        updates.forEach((update) => {
            preConsultation[update] = req.body[update]; // Use Type Assertion
        });
        yield preConsultation.save();
        (0, logger_1.default)('info', `Pré-consulta atualizada: ${preConsultation._id}`);
        res.send(preConsultation);
    }
    catch (error) {
        (0, logger_1.default)('error', 'Erro ao atualizar pré-consulta:', error);
        res.status(400).send(error);
    }
});
exports.updatePreConsultation = updatePreConsultation;
// Deletar uma pré-consulta específica
const deletePreConsultation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const preConsultation = yield preConsultation_1.default.findByIdAndDelete(req.params.id);
        if (!preConsultation) {
            (0, logger_1.default)('error', `Pré-consulta não encontrada: ${req.params.id}`);
            return res.status(404).send();
        }
        (0, logger_1.default)('info', `Pré-consulta deletada: ${preConsultation._id}`);
        res.send(preConsultation);
    }
    catch (error) {
        (0, logger_1.default)('error', 'Erro ao deletar pré-consulta:', error);
        res.status(500).send(error);
    }
});
exports.deletePreConsultation = deletePreConsultation;
