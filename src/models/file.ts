import mongoose, { Document, Schema } from 'mongoose';

const fileSchema = new Schema({
    filename: {
        type: String,
        required: true,
    },
    path: {
        type: String,
        required: true,
    },
    size: {
        type: Number,
        required: true,
    },
    mimetype: {
        type: String,
        required: true,
    },
    uploadedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
}, {
    timestamps: true,
});

export interface IFile extends Document {
    filename: string;
    path: string;
    size: number;
    mimetype: string;
    uploadedBy: string;
}

const File = mongoose.model<IFile>('File', fileSchema);

export default File;
