import jwt from "jsonwebtoken"; // Consistent naming convention
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import config from "../config/index.js";

// Middleware to verify JWT
export const verifyJWT = asyncHandler(async (req, res, next) => {
  const accessToken =
    req.cookies?.accessToken ||
    (req.header("Authorization")?.startsWith("Bearer ")
      ? req.header("Authorization").split(" ")[1]
      : null);

  if (!accessToken) {
    return next(
      new ApiError({ statusCode: 401, message: "Access token is missing" })
    );
  }

  try {
    const decodedToken = jwt.verify(accessToken, config.ACCESS_TOKEN_SECRET);

    if (!decodedToken?._id) {
      throw new ApiError({ statusCode: 401, message: "Invalid token payload" });
    }

    const user = await User.findById(decodedToken._id).select(
      "-password -refreshToken"
    );
    if (!user) {
      throw new ApiError({
        statusCode: 401,
        message: "User not found for the provided access token",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    next(handleTokenError(error));
  }
});

// Centralized token verification error handling
const handleTokenError = (error) => {
  if (error.name === "TokenExpiredError") {
    return new ApiError({
      statusCode: 401,
      message: "Access token has expired",
    });
  }
  if (error.name === "JsonWebTokenError") {
    return new ApiError({ statusCode: 401, message: "Invalid access token" });
  }
  return new ApiError({ statusCode: 500, message: "Error verifying token" });
};

// Middleware to authorize specific permissions or roles
export const authorizePermissions = (
  requiredRoles = [],
  requiredPermissions = []
) => {
  return asyncHandler(async (req, res, next) => {
    if (!req.user) {
      throw new ApiError({ statusCode: 401, message: "Unauthorized access" });
    }

    const userRoles = req.user.roles || [];
    const userPermissions = req.user.permissions || [];

    const hasRole =
      requiredRoles.length === 0 ||
      requiredRoles.some((role) => userRoles.includes(role));
    const hasPermission =
      requiredPermissions.length === 0 ||
      requiredPermissions.some((perm) => userPermissions.includes(perm));

    if (!hasRole && !hasPermission) {
      throw new ApiError({
        statusCode: 403,
        message: "You do not have the required roles or permissions",
      });
    }

    next();
  });
};
