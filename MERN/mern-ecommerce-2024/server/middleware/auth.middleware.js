const jwt = require("jsonwebtoken");
const asyncHandler = require("../utils/asyncHandler.js");
const { createUnauthorizedError } = require("../errors/unauthorirzed-error.js");

const authMiddleware = asyncHandler(async (req, res, next) => {
    // const { authorization } = req.headers;

    // if (!authorization) {
    //     return res.status(401).json(createUnauthorizedError("No Token Provided"));
    // }

    // const token = authorization.split(" ")[1];
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json(createUnauthorizedError("Unauthorized Error - No Token Provided"));
    }

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        // const user = await User.findById(decodedToken?.id).select("-password -refreshToken");

        // if (!user) {
        //     return res.status(401).json(createUnauthorizedError("Invalid Token"));
        // }

        req.user = decodedToken;
        next();
    } catch (error) {
        res.status(401).json(createUnauthorizedError("Invalid Signature", [error.message]));
    }
});

const authorizePermissions = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json(createUnauthorizedError("You are not authorized to access this route"));
        }
        next();
    }
};

module.exports = { authMiddleware, authorizePermissions };
