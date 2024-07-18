import mongoose, { Document, Schema } from 'mongoose';

const pageSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});

export interface IPage extends Document {
    title: string;
    content: string;
}

const Page = mongoose.model<IPage>('Page', pageSchema);

export default Page;
