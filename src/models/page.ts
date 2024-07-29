// src/models/Page.ts

import mongoose, { Document, Schema } from 'mongoose';

const pageSchema = new Schema({
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
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    published: {
        type: Boolean,
        default: false,
    },
    tags: {
        type: [String],
        default: [],
    },
}, {
    timestamps: true,
});

export interface IPage extends Document {
    title: string;
    content: string;
    author: string;
    published: boolean;
    tags: string[];
}

const Page = mongoose.model<IPage>('Page', pageSchema);

export default Page;
