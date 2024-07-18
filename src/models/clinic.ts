import mongoose, { Document, Schema } from 'mongoose';

const clinicSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    cnpj: {
        type: String,
        required: true,
        unique: true,
    },
    financialResponsible: {
        type: String,
        required: true,
    },
    customization: {
        values: {
            type: Map,
            of: String,
            required: false,
        },
        reports: {
            type: Map,
            of: String,
            required: false,
        },
    },
}, {
    timestamps: true,
});

export interface IClinic extends Document {
    name: string;
    cnpj: string;
    financialResponsible: string;
    customization?: {
        values?: Map<string, string>;
        reports?: Map<string, string>;
    };
}

const Clinic = mongoose.model<IClinic>('Clinic', clinicSchema);

export default Clinic;
