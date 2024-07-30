import mongoose from 'mongoose';

const accountsPayableSchema = new mongoose.Schema({
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

const AccountsPayable = mongoose.model('AccountsPayable', accountsPayableSchema);

export default AccountsPayable;
