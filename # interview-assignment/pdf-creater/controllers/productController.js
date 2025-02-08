const Product = require('../models/Product');
const Quotation = require('../models/Quotation');
const { generatePDF } = require('../utils/generatePDF');

exports.addProducts = async (req, res, next) => {
    try {
        const productsData = req.body.products.map(product => ({
            ...product,
            gst: product.rate * 0.18,
        }));

        const products = await Product.insertMany(productsData);
        const quotation = await Quotation.create({ user: req.user.id, products });

        const pdfBuffer = await generatePDF(quotation);

        res.status(201).json({ quotation, pdf: pdfBuffer.toString('base64') });
    } catch (err) {
        next(err);
    }
};
