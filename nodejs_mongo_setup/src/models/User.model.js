import { Schema, model } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import config from "../config/index.js";
import logger from "../utils/logger.js";

// Constants
const SALT_ROUNDS = 12;
const {
  ACCESS_TOKEN_EXPIRY,
  REFRESH_TOKEN_EXPIRY,
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
} = config;

// User Schema
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    fullName: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
      index: true,
    },
    // avatar: {
    //   type: {
    //     public_id: String,
    //     url: String,
    //   },
    //   required: true,
    // },
    profileImage: {
      type: {
        public_id: String,
        url: String,
      },
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
      // select: false
    },
    refreshToken: {
      type: String,
    },
    otp: Number,
  },
  {
    timestamps: true,
  }
);

// Middleware for password hashing before saving the user
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const hashedPassword = await bcrypt.hash(this.password, SALT_ROUNDS);
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error); // Pass error to error handler
  }
});

// Methods to compare password and generate tokens
userSchema.methods = {
  // Compare the password with hashed password
  comparePassword: async function (plainTextPassword) {
    try {
      return await bcrypt.compare(plainTextPassword, this.password);
    } catch (error) {
      throw new Error("Password comparison failed", error.message);
    }
  },

  // Generate access token
  generateAccessToken: function (validity) {
    if (!ACCESS_TOKEN_SECRET) {
      throw new Error("Access token secret is missing");
    }

    return jwt.sign(
      {
        _id: this._id,
        email: this.email,
        username: this.username,
        fullName: this.fullName,
      },
      ACCESS_TOKEN_SECRET,
      {
        expiresIn: validity || ACCESS_TOKEN_EXPIRY,
      }
    );
  },

  // Generate refresh token
  generateRefreshToken: function () {
    if (!REFRESH_TOKEN_SECRET) {
      throw new Error("Refresh token secret is missing");
    }

    return jwt.sign(
      {
        _id: this._id,
      },
      REFRESH_TOKEN_SECRET,
      {
        expiresIn: REFRESH_TOKEN_EXPIRY,
      }
    );
  },
};

userSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  delete user.refreshToken;
  return user;
};

export const User = model("User", userSchema);
