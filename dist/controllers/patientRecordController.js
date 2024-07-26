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
exports.deletePatientRecord = exports.updatePatientRecord = exports.getPatientRecord = exports.getPatientRecords = exports.createPatientRecord = void 0;
const patientRecord_1 = __importDefault(require("../models/patientRecord"));
const logger_1 = __importDefault(require("../utils/logger")); // Corrigindo o caminho da importação
const integrationService_1 = require("../services/integrationService"); // Serviços de integração
// Função para criar um novo prontuário de paciente
const createPatientRecord = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const patientRecord = new patientRecord_1.default(req.body);
        const savedPatientRecord = yield patientRecord.save();
        // Integração com laboratórios e dispositivos médicos
        (0, integrationService_1.integrateWithLab)(savedPatientRecord);
        (0, integrationService_1.integrateWithMedicalDevices)(savedPatientRecord);
        logger_1.default.info(`Prontuário do paciente criado: ${savedPatientRecord._id}`); // Adicionando log de criação de prontuário
        res.status(201).send(savedPatientRecord);
    }
    catch (error) {
        if (error instanceof Error) {
            logger_1.default.error('Erro ao criar prontuário do paciente:', error); // Adicionando log de erro
            res.status(400).send({ error: error.message });
        }
        else {
            res.status(400).send({ error: 'Erro desconhecido' });
        }
    }
});
exports.createPatientRecord = createPatientRecord;
// Função para obter todos os prontuários de pacientes
const getPatientRecords = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const patientRecords = yield patientRecord_1.default.find({});
        res.send(patientRecords);
    }
    catch (error) {
        if (error instanceof Error) {
            logger_1.default.error('Erro ao obter prontuários de pacientes:', error); // Adicionando log de erro
            res.status(500).send({ error: error.message });
        }
        else {
            res.status(500).send({ error: 'Erro desconhecido' });
        }
    }
});
exports.getPatientRecords = getPatientRecords;
// Função para obter um prontuário específico
const getPatientRecord = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const patientRecord = yield patientRecord_1.default.findById(req.params.id);
        if (!patientRecord) {
            return res.status(404).send();
        }
        res.send(patientRecord);
    }
    catch (error) {
        if (error instanceof Error) {
            logger_1.default.error('Erro ao obter prontuário do paciente:', error); // Adicionando log de erro
            res.status(500).send({ error: error.message });
        }
        else {
            res.status(500).send({ error: 'Erro desconhecido' });
        }
    }
});
exports.getPatientRecord = getPatientRecord;
// Função para atualizar um prontuário de paciente
const updatePatientRecord = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'medicalHistory', 'consultations', 'anamnese', 'prescriptions', 'insuranceHistory', 'payments', 'therapyDiary', 'documents', 'consentForms'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));
    if (!isValidOperation) {
        return res.status(400).send({ error: 'Atualizações inválidas!' });
    }
    try {
        const patientRecord = yield patientRecord_1.default.findById(req.params.id);
        if (!patientRecord) {
            return res.status(404).send();
        }
        updates.forEach((update) => {
            if (update in patientRecord) {
                patientRecord[update] = req.body[update];
            }
        });
        yield patientRecord.save();
        logger_1.default.info(`Prontuário do paciente atualizado: ${patientRecord._id}`); // Adicionando log de atualização de prontuário
        res.send(patientRecord);
    }
    catch (error) {
        if (error instanceof Error) {
            logger_1.default.error('Erro ao atualizar prontuário do paciente:', error); // Adicionando log de erro
            res.status(400).send({ error: error.message });
        }
        else {
            res.status(400).send({ error: 'Erro desconhecido' });
        }
    }
});
exports.updatePatientRecord = updatePatientRecord;
// Função para deletar um prontuário de paciente
const deletePatientRecord = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const patientRecord = yield patientRecord_1.default.findByIdAndDelete(req.params.id);
        if (!patientRecord) {
            return res.status(404).send();
        }
        logger_1.default.info(`Prontuário do paciente deletado: ${patientRecord._id}`); // Adicionando log de exclusão de prontuário
        res.send(patientRecord);
    }
    catch (error) {
        if (error instanceof Error) {
            logger_1.default.error('Erro ao deletar prontuário do paciente:', error); // Adicionando log de erro
            res.status(500).send({ error: error.message });
        }
        else {
            res.status(500).send({ error: 'Erro desconhecido' });
        }
    }
});
exports.deletePatientRecord = deletePatientRecord;
