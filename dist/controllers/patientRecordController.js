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
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const logger_1 = __importDefault(require("../utils/logger")); // Corrigindo o caminho da importação
const integrationService_1 = require("../services/integrationService"); // Serviços de integração
const db = firebase_admin_1.default.firestore();
const patientRecordsCollection = db.collection('patientRecords');
// Função para validar dados do prontuário do paciente
const validatePatientRecord = (patientRecord) => {
    if (!patientRecord.name || typeof patientRecord.name !== 'string') {
        throw new Error('O nome do paciente é obrigatório e deve ser uma string.');
    }
    if (!patientRecord.medicalHistory || !Array.isArray(patientRecord.medicalHistory)) {
        throw new Error('O histórico médico é obrigatório e deve ser um array.');
    }
    // Adicione outras validações necessárias
};
// Função para criar um novo prontuário de paciente
const createPatientRecord = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const patientRecord = req.body;
        // Validação dos dados do prontuário
        validatePatientRecord(patientRecord);
        const docRef = yield patientRecordsCollection.add(patientRecord);
        const savedPatientRecord = yield docRef.get();
        // Integração com laboratórios e dispositivos médicos
        (0, integrationService_1.integrateWithLab)(savedPatientRecord.data());
        (0, integrationService_1.integrateWithMedicalDevices)(savedPatientRecord.data());
        logger_1.default.info(`Prontuário do paciente criado: ${docRef.id}`); // Adicionando log de criação de prontuário
        res.status(201).send(Object.assign({ id: docRef.id }, savedPatientRecord.data()));
    }
    catch (error) {
        logger_1.default.error(`Erro ao criar prontuário do paciente: ${error.message}`); // Adicionando log de erro
        res.status(400).send({ error: error.message });
    }
});
exports.createPatientRecord = createPatientRecord;
// Função para obter todos os prontuários de pacientes
const getPatientRecords = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const snapshot = yield patientRecordsCollection.get();
        const patientRecords = snapshot.docs.map(doc => (Object.assign({ id: doc.id }, doc.data())));
        res.send(patientRecords);
    }
    catch (error) {
        logger_1.default.error(`Erro ao obter prontuários de pacientes: ${error.message}`); // Adicionando log de erro
        res.status(500).send({ error: error.message });
    }
});
exports.getPatientRecords = getPatientRecords;
// Função para obter um prontuário específico
const getPatientRecord = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const doc = yield patientRecordsCollection.doc(req.params.id).get();
        if (!doc.exists) {
            logger_1.default.error(`Prontuário não encontrado: ${req.params.id}`); // Adicionando log de erro
            return res.status(404).send({ error: 'Prontuário não encontrado' });
        }
        res.send(Object.assign({ id: doc.id }, doc.data()));
    }
    catch (error) {
        logger_1.default.error(`Erro ao obter prontuário do paciente: ${error.message}`); // Adicionando log de erro
        res.status(500).send({ error: error.message });
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
        const docRef = patientRecordsCollection.doc(req.params.id);
        const doc = yield docRef.get();
        if (!doc.exists) {
            logger_1.default.error(`Prontuário não encontrado: ${req.params.id}`); // Adicionando log de erro
            return res.status(404).send({ error: 'Prontuário não encontrado' });
        }
        const patientRecord = doc.data();
        updates.forEach((update) => {
            if (patientRecord && update in patientRecord) {
                patientRecord[update] = req.body[update];
            }
        });
        yield docRef.update(patientRecord);
        logger_1.default.info(`Prontuário do paciente atualizado: ${docRef.id}`); // Adicionando log de atualização de prontuário
        res.send(Object.assign({ id: docRef.id }, patientRecord));
    }
    catch (error) {
        logger_1.default.error(`Erro ao atualizar prontuário do paciente: ${error.message}`); // Adicionando log de erro
        res.status(400).send({ error: error.message });
    }
});
exports.updatePatientRecord = updatePatientRecord;
// Função para deletar um prontuário de paciente
const deletePatientRecord = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const docRef = patientRecordsCollection.doc(req.params.id);
        const doc = yield docRef.get();
        if (!doc.exists) {
            logger_1.default.error(`Prontuário não encontrado: ${req.params.id}`); // Adicionando log de erro
            return res.status(404).send({ error: 'Prontuário não encontrado' });
        }
        yield docRef.delete();
        logger_1.default.info(`Prontuário do paciente deletado: ${docRef.id}`); // Adicionando log de exclusão de prontuário
        res.send(Object.assign({ id: docRef.id }, doc.data()));
    }
    catch (error) {
        logger_1.default.error(`Erro ao deletar prontuário do paciente: ${error.message}`); // Adicionando log de erro
        res.status(500).send({ error: error.message });
    }
});
exports.deletePatientRecord = deletePatientRecord;
