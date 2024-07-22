import mongoose, { Document, Schema } from 'mongoose';

const reportSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    content: {
        type: String,
        required: true,
        trim: true,
    },
    generatedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    type: {
        type: String,
        enum: ['financial', 'medical', 'operational'],
        required: true,
    },
    status: {
        type: String,
        enum: ['draft', 'final'],
        default: 'draft',
    },
}, {
    timestamps: true,
});

export interface IReport extends Document {
    title: string;
    content: string;
    generatedBy: string;
    type: 'financial' | 'medical' | 'operational';
    status: 'draft' | 'final';
}

const Report = mongoose.model<IReport>('Report', reportSchema);

export default Report;
