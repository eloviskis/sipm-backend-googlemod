import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

// Definir o esquema do usuário
const userSchema = new Schema({
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
}, {
    timestamps: true,
});

// Método para verificar a senha
userSchema.methods.isValidPassword = async function (password: string) {
    const user = this as IUser;
    return bcrypt.compare(password, user.password);
};

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    role: string;
    cnpj?: string;
    cpf?: string;
    financialResponsible?: string;
    isValidPassword(password: string): Promise<boolean>;
}

const User = mongoose.model<IUser>('User', userSchema);

export default User;
