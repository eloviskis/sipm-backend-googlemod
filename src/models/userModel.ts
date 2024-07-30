import mongoose, { Document, Schema } from 'mongoose';

interface IUser extends Document {
  email: string;
  password: string;
  role: string;
  permissions: string[];
}

const UserSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true, enum: ['Admin', 'Medico', 'Paciente'] },
  permissions: [{ type: String }],
});

export default mongoose.model<IUser>('User', UserSchema);
