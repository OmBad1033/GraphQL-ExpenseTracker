import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    description: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    paymentType: {
        type: String,
        enum: ["card", "cash"],
        required: true
    },
    category: {
        type: String,
        enum: ["investment", "expense", "saving"],
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    location: {
        type: String,
        default: "Unknown"
    }
});

const Transaction = mongoose.model("Transaction", transactionSchema);

export default Transaction