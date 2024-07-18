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
const clinic_1 = __importDefault(require("../models/clinic"));
// Criar uma nova clínica
const createClinic = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const clinic = new clinic_1.default(req.body);
        const savedClinic = yield clinic.save();
        res.status(201).send(savedClinic);
    }
    catch (error) {
        res.status(400).send(error);
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
        const clinic = yield clinic_1.default.findById(req.params.id);
        if (!clinic) {
            return res.status(404).send();
        }
        updates.forEach((update) => {
            if (update in clinic) {
                clinic[update] = req.body[update];
            }
        });
        yield clinic.save();
        res.send(clinic);
    }
    catch (error) {
        res.status(400).send(error);
    }
});
exports.updateClinic = updateClinic;
// Obter todas as clínicas
const getClinics = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const clinics = yield clinic_1.default.find({});
        res.send(clinics);
    }
    catch (error) {
        res.status(500).send(error);
    }
});
exports.getClinics = getClinics;
// Obter uma clínica específica
const getClinic = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const clinic = yield clinic_1.default.findById(req.params.id);
        if (!clinic) {
            return res.status(404).send();
        }
        res.send(clinic);
    }
    catch (error) {
        res.status(500).send(error);
    }
});
exports.getClinic = getClinic;
// Deletar uma clínica
const deleteClinic = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const clinic = yield clinic_1.default.findByIdAndDelete(req.params.id);
        if (!clinic) {
            return res.status(404).send();
        }
        res.send(clinic);
    }
    catch (error) {
        res.status(500).send(error);
    }
});
exports.deleteClinic = deleteClinic;
