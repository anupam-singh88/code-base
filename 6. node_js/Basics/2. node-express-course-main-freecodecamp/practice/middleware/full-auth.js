const { createUnauthenicatedErr, CreateUnauthorizedError } = require("../errors/index");
const { isTokenValid } = require("../utils/jwt");

const authenticateUser = async (req, res, next) => {
    let token;

    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith('Bearer')) {
        token = authHeader.split(' ')[1];
    } else if (req.cookies.token) {
        token = req.cookies.token;
    }

    if (!token) {
        return next(createUnauthenicatedErr("Authentication Invalid"))
    }

    try {
        const payload = isTokenValid({ token });

        req.user = {
            userId: payload.userId,
            role: payload.role,
        }

        next();
    } catch (error) {
        return next(createUnauthenicatedErr("Authentication Invalid"))
    }
}

const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(CreateUnauthorizedError("Permission Denied"))
        }

        next();
    }
}

module.exports = { authenticateUser, authorizeRoles }