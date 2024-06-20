const mongoose = require('mongoose');

const incomeSchema = new mongoose.Schema({
    title: { type: String, required: true },
    amount: { type: Number, required: true },
    category: { type: String, required: true },
    description: { type: String },
    date: { type: Date, required: true, default: Date.now }
});

module.exports = mongoose.model('Income', incomeSchema);
