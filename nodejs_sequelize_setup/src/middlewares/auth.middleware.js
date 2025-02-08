import jwt from "jsonwebtoken";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import User from "../models/User.model.js";
import config from "../config/index.js";
import logger from "../utils/logger.js";

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

    if (!decodedToken?.id) {
      throw new ApiError({ statusCode: 401, message: "Invalid token payload" });
    }

    const user = await User.findByPk(decodedToken.id);
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
  logger.error("🚀 ~ handleTokenError ~ error:", error);
  if (error.name === "TokenExpiredError") {
    return new ApiError({
      statusCode: 401,
      message: "Access token has expired",
    });
  }
  if (error.name === "JsonWebTokenError") {
    return new ApiError({ statusCode: 401, message: "Invalid access token" });
  }
  return new ApiError({
    statusCode: 500,
    message: error?.message || "Error verifying token",
  });
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
