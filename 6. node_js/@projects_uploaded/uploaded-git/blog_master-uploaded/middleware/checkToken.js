const jwt = require("jsonwebtoken");
const secret = process.env.SECRET;
const { User } = require('../models/User')

const isAuthenticated = async (req, res, next) => {
    const { token } = req.cookies;
    if (token) {
        const decoded = jwt.verify(token, secret);
        req.user = await User.findById(decoded._id);

        next();
    } else {
        res.render("login", { message: 'Kindly Login First!!!', loginBool: true });
    }
};

module.exports = { isAuthenticated }