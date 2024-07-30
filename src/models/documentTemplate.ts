import mongoose, { Document, Schema } from 'mongoose';

export interface IDocumentTemplate extends Document {
    name: string;
    content: string;
}

const documentTemplateSchema: Schema = new Schema({
    name: { type: String, required: true },
    content: { type: String, required: true },
});

export default mongoose.model<IDocumentTemplate>('DocumentTemplate', documentTemplateSchema);
