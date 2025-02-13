const mongoose = require('mongoose');

const QuotationSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true }],
    date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Quotation', QuotationSchema);
