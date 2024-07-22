import mongoose, { Document, Schema } from 'mongoose';

export interface IPayment extends Document {
    userId: string;
    amount: number;
    status: 'PENDING' | 'COMPLETED' | 'FAILED';
    method: string;
    invoiceId: string;
}

const paymentSchema = new Schema<IPayment>({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    amount: {
        type: Number,
        required: true,
        min: 0,
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
        type: Schema.Types.ObjectId,
        ref: 'Invoice',
        required: true,
    },
}, {
    timestamps: true,
});

const Payment = mongoose.model<IPayment>('Payment', paymentSchema);

export default Payment;
