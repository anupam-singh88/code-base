const { createUnauthenicatedErr, CreateUnauthorizedError } = require("../errors");
const { isTokenValid } = require("../utils/jwt");

const authenticateUser = async (req, res, next) => {
    const token = req.signedCookes.token;

    if (!token) {
        return next(createUnauthenicatedErr("Authentication Invalid"))
    }

    try {
        const { name, userId, role } = isTokenValid({ token });
        req.user = {
            name,
            userId,
            role
        }
        next();
    } catch (error) {
        return next(createUnauthenicatedErr("Authentication Invalid"))
    }
}

const authorizePermissions = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(CreateUnauthorizedError("Permission Denied"));
        }
        next();
    }
}

module.exports = {
    authenticateUser,
    authorizePermissions
}