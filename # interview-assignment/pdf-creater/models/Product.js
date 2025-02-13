const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true },
    qty: { type: Number, required: true },
    rate: { type: Number, required: true },
    gst: { type: Number, default: 18 },
});

module.exports = mongoose.model('Product', ProductSchema);
