const Quotation = require('../models/Quotation');

exports.getQuotations = async (req, res, next) => {
    try {
        const quotations = await Quotation.find({ user: req.user.id }).populate('products');

        res.status(200).json({ quotations });
    } catch (err) {
        next(err);
    }
};
