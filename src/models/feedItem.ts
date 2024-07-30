import mongoose, { Document, Schema } from 'mongoose';

export interface IFeedItem extends Document {
    title: string;
    content: string;
}

const FeedItemSchema: Schema = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
});

export default mongoose.model<IFeedItem>('FeedItem', FeedItemSchema);
