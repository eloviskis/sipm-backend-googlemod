import mongoose, { Document, Schema } from 'mongoose';

interface IUser extends Document {
  email: string;
  password: string;
  role: string;
  permissions: string[];
  resetPasswordToken?: string;
  resetPasswordExpires?: number;
}

const UserSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true, enum: ['Admin', 'Medico', 'Paciente'] },
  permissions: [{ type: String }],
  resetPasswordToken: { type: String },
  resetPasswordExpires: { type: Number },
});

// Verificar se o modelo já foi definido para evitar sobrescrever
export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
