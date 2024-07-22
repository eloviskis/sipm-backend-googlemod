import mongoose, { Document, Schema } from 'mongoose';

const themeSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    layout: {
        type: String,
        required: true,
        trim: true,
    },
    colors: {
        primary: {
            type: String,
            required: true,
            trim: true,
        },
        secondary: {
            type: String,
            required: true,
            trim: true,
        },
        background: {
            type: String,
            required: true,
            trim: true,
        },
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
}, {
    timestamps: true,
});

export interface ITheme extends Document {
    name: string;
    layout: string;
    colors: {
        primary: string;
        secondary: string;
        background: string;
    };
    createdBy: string;
}

const Theme = mongoose.model<ITheme>('Theme', themeSchema);

export default Theme;
