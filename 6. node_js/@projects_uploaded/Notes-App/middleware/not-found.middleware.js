const notFountMiddleware = (req, res, next) => {
    res.status(404).send('Requested Resource Not found');
};

export default notFountMiddleware;