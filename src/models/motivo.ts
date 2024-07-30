import mongoose, { Document, Schema } from 'mongoose';

export interface IMotivo extends Document {
    name: string;
    description: string;
}

const motivoSchema: Schema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
});

export default mongoose.model<IMotivo>('Motivo', motivoSchema);
