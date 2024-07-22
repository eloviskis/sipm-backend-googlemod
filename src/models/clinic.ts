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
    address: {
        street: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        state: {
            type: String,
            required: true,
        },
        zipCode: {
            type: String,
            required: true,
        },
    },
    contactInfo: {
        phone: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
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
    address: {
        street: string;
        city: string;
        state: string;
        zipCode: string;
    };
    contactInfo: {
        phone: string;
        email: string;
    };
}

const Clinic = mongoose.model<IClinic>('Clinic', clinicSchema);

export default Clinic;
