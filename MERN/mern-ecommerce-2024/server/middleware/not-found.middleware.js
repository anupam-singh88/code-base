const notFoundMiddleware = (req, res, next) => {
    res.status(404).send('Requested Resource Not Found');
};

module.exports = notFoundMiddleware;
