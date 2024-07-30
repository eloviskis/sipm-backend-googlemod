import mongoose, { Document, Schema } from 'mongoose';

export interface IPreConsultation extends Document {
    name: string;
    details: string;
}

const preConsultationSchema: Schema = new Schema({
    name: { type: String, required: true },
    details: { type: String, required: true },
});

export default mongoose.model<IPreConsultation>('PreConsultation', preConsultationSchema);
