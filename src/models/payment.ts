import mongoose, { Document, Schema } from 'mongoose';

export interface IPayment extends Document {
    userId: string;
    amount: number;
    status: string;
    method: string;
    invoiceId: string;
}

const paymentSchema = new Schema<IPayment>({
    userId: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        required: true,
        enum: ['PENDING', 'COMPLETED', 'FAILED'],
    },
    method: {
        type: String,
        required: true,
    },
    invoiceId: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});

const Payment = mongoose.model<IPayment>('Payment', paymentSchema);

export default Payment;
