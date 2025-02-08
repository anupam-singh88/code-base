import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import createNewApiResponse from "../utils/ApiResposne.js";
import { HTTP_STATUS } from "../utils/httpStatus.js";
import logger from "../utils/logger.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

import userRepository from "../repositories/user.repository.js";
import UserService from "../services/user.service.js";
import MailService from "../services/mail.service.js";
import {
  loginSchema,
  validateCreateUser,
  validateUpdateUser,
} from "../validations/user.validation.js";
import config from "../config/index.js";

const userService = new UserService(new userRepository());

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
};

const handleUserResponse = async (user, res, message) => {
  const { accessToken, refreshToken } =
    await userService.generateAccessAndRefreshToken(user.id);
  const loggedInUser = await userService.getUserByNameOrEmailorId({
    userId: user.id,
  });

  const userObject = loggedInUser;
  delete userObject.password;
  delete userObject.refreshToken;

  return res
    .status(HTTP_STATUS.OK)
    .cookie("accessToken", accessToken, COOKIE_OPTIONS)
    .json(
      createNewApiResponse({
        statusCode: HTTP_STATUS.OK,
        data: { ...userObject, accessToken },
        message,
      })
    );
};

const createUser = asyncHandler(async (req, res) => {
  const { error, value } = validateCreateUser.validate(req.body);
  if (error) {
    throw new ApiError({ statusCode: 400, message: error.message });
  }

  const { username, email, fullName, password } = value;

  if (!req.file?.path) {
    throw new ApiError({
      statusCode: 400,
      message: "Profile image is required",
    });
  }

  let profileImageUrl;
  try {
    profileImageUrl = await uploadOnCloudinary(req.file.path);
    if (!profileImageUrl?.secure_url) {
      throw new Error("Failed to upload image");
    }
  } catch (error) {
    logger.error(`Cloudinary Upload Error: ${error.message}`);
    throw new ApiError({ statusCode: 500, message: "Failed to upload image" });
  }

  const user = await userService.createUser({
    username,
    email,
    fullName,
    password,
    profileImage: {
      publicid: profileImageUrl.publicid,
      url: profileImageUrl.secure_url,
    },
  });

  MailService.sendWelcomeEmail({ to: email, username }).catch((err) =>
    logger.error(`Email Send Error: ${err.message}`)
  );

  return handleUserResponse(user, res, "User created successfully");
});

const loginUser = asyncHandler(async (req, res) => {
  const { error, value } = loginSchema.validate(req.body);
  if (error) {
    throw new ApiError({ statusCode: 400, message: error.message });
  }

  const { email, password } = value;
  const user = await userService.validateUserCredentials({ email, password });

  MailService.loginMail({ to: email, username: user.username });

  return handleUserResponse(user, res, "User logged in successfully");
});

function generateOtp({ otpLength }) {
  let otp = 0;
  for (let i = 0; i < otpLength; i++) {
    let randomNumber = Math.floor(Math.random() * 10);
    otp = otp * 10 + randomNumber;
  }
  return otp;
}

const loginViaOtp = asyncHandler(async (req, res) => {
  const { email } = req.body;
  if (!email) {
    throw new Error("Email is required");
  }

  const user = await userService.getUserByNameOrEmailorId({ email });

  const otp = generateOtp({ otpLength: 6 });
  await userService.updateUser(user?.id, { otp: otp });
  await MailService.verifyOtp({
    to: user.email,
    username: user.fullName,
    otp: otp,
  });
  return res.status(200).json(
    createNewApiResponse({
      message: "OTP SENT SUCCESSFULLY",
      statusCode: 200,
    })
  );
});

const verifyOtp = asyncHandler(async (req, res) => {
  const { email, otp } = req.body;
  if (!email || !otp) {
    throw new Error("Email and otp are required");
  }
  const user = await userService.getUserByNameOrEmailorId({ email });

  if (otp != user?.otp) {
    throw new Error("Otp verification failed");
  }
  return handleUserResponse(user, res, "User logged in successfully");
});

const logoutUser = asyncHandler(async (req, res) => {
  await userService.logoutUser(req.user?.id);

  return res
    .status(200)
    .clearCookie("accessToken", COOKIE_OPTIONS)
    .clearCookie("refreshToken", COOKIE_OPTIONS)
    .json(
      createNewApiResponse({
        message: "User logged out successfully !!!",
        statusCode: 200,
      })
    );
});

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await userService.getAllUsers();
  return res.status(200).json(
    createNewApiResponse({
      statusCode: HTTP_STATUS.OK,
      data: users,
    })
  );
});

const getUserById = asyncHandler(async (req, res) => {
  const userId = req.params.userId || req.user.id;
  const user = await userService.getUserByNameOrEmailorId({ userId });
  return res.status(200).json(
    createNewApiResponse({
      statusCode: HTTP_STATUS.OK,
      data: user,
    })
  );
});

const deleteUser = asyncHandler(async (req, res) => {
  const userId = req.params.userId || req.user.id;
  await userService.deleteUser(userId);
  return res.status(200).json(
    createNewApiResponse({
      statusCode: HTTP_STATUS.OK,
      message: "User deleted successfully",
    })
  );
});

const updateUser = asyncHandler(async (req, res) => {
  const userId = req.params.userId || req.user.id;
  const { error, value } = validateUpdateUser.validate(req.body);
  if (error) {
    throw new ApiError({ statusCode: 400, message: error.message });
  }

  const user = await userService.updateUser(userId, value);
  return res.status(200).json(
    createNewApiResponse({
      statusCode: HTTP_STATUS.OK,
      data: user,
      message: "User updated successfully",
    })
  );
});
// throw new Error("Password reset link sent to your email");

const resetPassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword) {
    throw new ApiError({
      statusCode: 400,
      message: "Old password and new password are required",
    });
  }

  if (oldPassword === newPassword) {
    throw new ApiError({
      statusCode: 400,
      message: "New password cannot be the same as old password",
    });
  }

  const userId = req.user.id;
  await userService.changePassword(userId, { oldPassword, newPassword });

  return res.status(200).json(
    createNewApiResponse({
      statusCode: HTTP_STATUS.OK,
      message: "Password changed successfully",
    })
  );
});

//forgot password
const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    throw new Error("Email is required");
  }

  const user = await userService.getUserByNameOrEmailorId({ email });

  const { accessToken, refreshToken } =
    await userService.generateAccessAndRefreshToken(user.id, "30s");

  const verificationLink = `http://localhost:${config.PORT}/api/v1/users/verify?accessToken=${accessToken}`;

  MailService.sendPasswordResetEmail({
    to: user.email,
    username: user.username,
    resetLink: verificationLink,
  }).catch((err) => {
    logger.error(`Email Send Error: ${err.message}`);
    throw new ApiError({ statusCode: 500, message: "Failed to send email" });
  });

  return res.status(200).json(
    createNewApiResponse({
      statusCode: HTTP_STATUS.OK,
      message: "Password reset link sent to your email",
    })
  );
});

const verifyPassword = asyncHandler(async (req, res) => {
  const { accessToken } = req.query;

  if (!accessToken) {
    throw new ApiError({
      statusCode: 400,
      message: "Access token is required",
    });
  }

  const { user } = await userService.verifyToken(accessToken);

  return res.status(200).sendFile("index.html", { root: "public" });
});

export {
  createUser,
  loginUser,
  logoutUser,
  getAllUsers,
  getUserById,
  deleteUser,
  updateUser,
  resetPassword,
  loginViaOtp,
  verifyOtp,
  forgotPassword,
  verifyPassword,
};

//one device login
//logout all devices
