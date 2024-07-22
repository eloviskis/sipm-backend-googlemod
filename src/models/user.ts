import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';
import { BaseSchema } from '../types/Schema';

const themePreferencesSchema = new Schema<BaseSchema>({
    primaryColor: {
        type: String,
        default: '#3498db', // Cor padrão
    },
    secondaryColor: {
        type: String,
        default: '#2ecc71', // Cor padrão
    },
    backgroundColor: {
        type: String,
        default: '#ecf0f1', // Cor padrão
    },
}, {
    _id: false,
});

const userSchema = new Schema<IUser>({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['ADMIN', 'USER'],
        default: 'USER',
    },
    cnpj: {
        type: String,
        required: false,
    },
    cpf: {
        type: String,
        required: false,
    },
    financialResponsible: {
        type: String,
        required: false,
    },
    themePreferences: {
        type: themePreferencesSchema,
        required: false,
    },
    mfaEnabled: {
        type: Boolean,
        default: false,
    },
    mfaSecret: {
        type: String,
        required: false,
    },
}, {
    timestamps: true,
});

userSchema.methods.isValidPassword = async function (password: string) {
    const user = this as IUser;
    return bcrypt.compare(password, user.password);
};

export interface IUser extends Document, BaseSchema {
    name: string;
    email: string;
    password: string;
    role: string;
    cnpj?: string;
    cpf?: string;
    financialResponsible?: string;
    themePreferences?: {
        primaryColor?: string;
        secondaryColor?: string;
        backgroundColor?: string;
    };
    mfaEnabled: boolean;
    mfaSecret?: string;
    isValidPassword(password: string): Promise<boolean>;
}

const User = mongoose.model<IUser>('User', userSchema);

export default User;
