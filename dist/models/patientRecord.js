"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
// Subesquema para anamnese modelo SOAP
const soapSchema = new mongoose_1.Schema({
    subjective: {
        type: String,
        required: true,
    },
    objective: {
        type: String,
        required: true,
    },
    assessment: {
        type: String,
        required: true,
    },
    plan: {
        type: String,
        required: true,
    },
}, {
    _id: false,
});
const insuranceHistorySchema = new mongoose_1.Schema({
    insuranceProvider: {
        type: String,
        required: true,
    },
    policyNumber: {
        type: String,
        required: true,
    },
    validFrom: {
        type: Date,
        required: true,
    },
    validTo: {
        type: Date,
        required: true,
    },
}, {
    _id: false,
});
const paymentSchema = new mongoose_1.Schema({
    amount: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    method: {
        type: String,
        required: true,
    },
}, {
    _id: false,
});
const patientRecordSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    medicalHistory: {
        type: String,
        required: true,
    },
    consultations: {
        type: [String],
        required: true,
    },
    anamnese: {
        type: soapSchema,
        required: true,
    },
    prescriptions: {
        type: [String],
        required: false,
    },
    insuranceHistory: {
        type: [insuranceHistorySchema],
        required: false,
    },
    payments: {
        type: [paymentSchema],
        required: false,
    },
    therapyDiary: {
        type: [String],
        required: false,
    },
    documents: {
        type: [String],
        required: false,
    },
    consentForms: {
        type: [String],
        required: false,
    },
}, {
    timestamps: true,
});
const PatientRecord = mongoose_1.default.model('PatientRecord', patientRecordSchema);
exports.default = PatientRecord;
