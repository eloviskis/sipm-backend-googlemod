import mongoose, { Document, Schema } from 'mongoose';

// Subesquema para anamnese modelo SOAP
const soapSchema = new Schema({
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

const insuranceHistorySchema = new Schema({
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

const paymentSchema = new Schema({
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

const patientRecordSchema = new Schema({
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

export interface IPatientRecord extends Document {
    name: string;
    medicalHistory: string;
    consultations: string[];
    anamnese: {
        subjective: string;
        objective: string;
        assessment: string;
        plan: string;
    };
    prescriptions?: string[];
    insuranceHistory?: {
        insuranceProvider: string;
        policyNumber: string;
        validFrom: Date;
        validTo: Date;
    }[];
    payments?: {
        amount: number;
        date: Date;
        method: string;
    }[];
    therapyDiary?: string[];
    documents?: string[];
    consentForms?: string[];
}

const PatientRecord = mongoose.model<IPatientRecord>('PatientRecord', patientRecordSchema);

export default PatientRecord;
