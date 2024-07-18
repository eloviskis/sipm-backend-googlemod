import mongoose, { Document, Schema } from 'mongoose';

const reportSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    generatedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
}, {
    timestamps: true,
});

export interface IReport extends Document {
    title: string;
    content: string;
    generatedBy: string;
}

const Report = mongoose.model<IReport>('Report', reportSchema);

export default Report;
