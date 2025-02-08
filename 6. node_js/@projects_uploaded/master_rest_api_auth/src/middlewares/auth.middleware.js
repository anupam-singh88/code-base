import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from '../utils/asyncHandler.js'
import jwt from 'jsonwebtoken'
import { User } from '../models/user.model.js'

export const verifyJWT = asyncHandler(async (req, _, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "") || req.body?.accessToken || req.query?.accessToken || req.params?.accessToken;

        if (!token) throw new ApiError(401,
            "Unauthorized - No token provided"
        )

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        const user = await User.findById(decodedToken?._id).select("-password -refreshToken");

        if (!user) throw new ApiError(401, "Unauthorized - Invalid Access token")

        req.user = user;
        next();
    } catch (error) {
        throw new ApiError(401, error?.message || 'Unauthorized - Invalid token')
    }
})