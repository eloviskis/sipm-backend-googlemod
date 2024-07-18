import mongoose, { Document, Schema } from 'mongoose';

const appointmentSchema = new Schema({
    date: {
        type: Date,
        required: true,
    },
    notes: {
        type: String,
        required: false,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
}, {
    timestamps: true,
});

export interface IAppointment extends Document {
    date: Date;
    notes?: string;
    userId: string;
}

const Appointment = mongoose.model<IAppointment>('Appointment', appointmentSchema);

export default Appointment;
