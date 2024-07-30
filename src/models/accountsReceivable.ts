import mongoose from 'mongoose';

const accountsReceivableSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    amount: {
        type: Number,
        required: true,
        trim: true
    },
}, {
    timestamps: true
});

const AccountsReceivable = mongoose.model('AccountsReceivable', accountsReceivableSchema);

export default AccountsReceivable;
    