import mongoose, { Document, Schema } from 'mongoose';

const themeSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    layout: {
        type: String,
        required: true,
    },
    colors: {
        primary: {
            type: String,
            required: true,
        },
        secondary: {
            type: String,
            required: true,
        },
        background: {
            type: String,
            required: true,
        },
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
}

const Theme = mongoose.model<ITheme>('Theme', themeSchema);

export default Theme;
