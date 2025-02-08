import jwt from "jsonwebtoken";
import User from "../models/User.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import { createUnauthorizedError } from "../errors/unauthorirzed-error.js";

export const verifyJWT = asyncHandler(async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json(createUnauthorizedError("No Token Provided"));
    }

    const token = authorization.split(" ")[1];

    if (!token) {
        return res.status(401).json(createUnauthorizedError("Unauthorized Error- No Token Provided"));
    }

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decodedToken?.id).select("-password -refreshToken");

        if (!user) {
            return res.status(401).json(createUnauthorizedError("Invalid Token"));
        }

        req.user = user;
        next();
    } catch (error) {
        res.status(401).json(createUnauthorizedError("Invalid Signature", [error.message]));
    }
});

export const authorizePermissions = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json(createUnauthorizedError("You are not authorized to access this route"));
        }
        next();
    }
}