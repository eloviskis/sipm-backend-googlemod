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
const createPatientRecord = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const patientRecord = new patientRecord_1.default(req.body);
        const savedPatientRecord = yield patientRecord.save();
        res.status(201).send(savedPatientRecord);
    }
    catch (error) {
        res.status(400).send(error);
    }
});
exports.createPatientRecord = createPatientRecord;
const getPatientRecords = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const patientRecords = yield patientRecord_1.default.find({});
        res.send(patientRecords);
    }
    catch (error) {
        res.status(500).send(error);
    }
});
exports.getPatientRecords = getPatientRecords;
const getPatientRecord = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const patientRecord = yield patientRecord_1.default.findById(req.params.id);
        if (!patientRecord) {
            return res.status(404).send();
        }
        res.send(patientRecord);
    }
    catch (error) {
        res.status(500).send(error);
    }
});
exports.getPatientRecord = getPatientRecord;
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
        res.send(patientRecord);
    }
    catch (error) {
        res.status(400).send(error);
    }
});
exports.updatePatientRecord = updatePatientRecord;
const deletePatientRecord = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const patientRecord = yield patientRecord_1.default.findByIdAndDelete(req.params.id);
        if (!patientRecord) {
            return res.status(404).send();
        }
        res.send(patientRecord);
    }
    catch (error) {
        res.status(500).send(error);
    }
});
exports.deletePatientRecord = deletePatientRecord;
