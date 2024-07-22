import mongoose, { Document, Schema } from 'mongoose';

const themePreferencesSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    primaryColor: {
        type: String,
        required: true,
        trim: true,
    },
    secondaryColor: {
        type: String,
        required: true,
        trim: true,
    },
    backgroundColor: {
        type: String,
        required: true,
        trim: true,
    },
}, {
    timestamps: true,
});

export interface IThemePreferences extends Document {
    userId: string;
    primaryColor: string;
    secondaryColor: string;
    backgroundColor: string;
}

const ThemePreferences = mongoose.model<IThemePreferences>('ThemePreferences', themePreferencesSchema);

export default ThemePreferences;
