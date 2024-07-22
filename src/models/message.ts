import mongoose, { Document, Schema } from 'mongoose';

const messageSchema = new Schema({
    from: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    to: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    subject: {
        type: String,
        required: true,
        trim: true,
    },
    content: {
        type: String,
        required: true,
        trim: true,
    },
    read: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});

export interface IMessage extends Document {
    from: string;
    to: string;
    subject: string;
    content: string;
    read: boolean;
}

const Message = mongoose.model<IMessage>('Message', messageSchema);

export default Message;
