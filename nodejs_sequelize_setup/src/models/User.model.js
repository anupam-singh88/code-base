import { DataTypes, Model } from "sequelize";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../config/index.js";
import { sequelize } from "../db/dbConnect.js";

const SALT_ROUNDS = 12;
const {
  ACCESS_TOKEN_EXPIRY,
  REFRESH_TOKEN_EXPIRY,
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
} = config;

class User extends Model {
  async comparePassword(plainTextPassword) {
    try {
      return await bcrypt.compare(plainTextPassword, this.password);
    } catch (error) {
      throw new Error("Password comparison failed: " + error.message);
    }
  }

  generateAccessToken(validity) {
    if (!ACCESS_TOKEN_SECRET) {
      throw new Error("Access token secret is missing");
    }
    return jwt.sign(
      {
        id: this.id,
        email: this.email,
        username: this.username,
        fullName: this.fullName,
      },
      ACCESS_TOKEN_SECRET,
      { expiresIn: validity || ACCESS_TOKEN_EXPIRY }
    );
  }

  generateRefreshToken() {
    if (!REFRESH_TOKEN_SECRET) {
      throw new Error("Refresh token secret is missing");
    }
    return jwt.sign({ id: this.id }, REFRESH_TOKEN_SECRET, {
      expiresIn: REFRESH_TOKEN_EXPIRY,
    });
  }
}

User.init(
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [3, 50], // Ensure username length is between 3 and 50 characters
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true, // Ensure the email is valid
      },
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2, 100], // Ensure full name length is between 2 and 100 characters
      },
    },
    profileImage: {
      type: DataTypes.JSON,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8, 100], // Ensure password length is between 8 and 100 characters
      },
    },
    refreshToken: {
      type: DataTypes.STRING,
    },
    otp: {
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize,
    modelName: "User",
    timestamps: true,
    hooks: {
      beforeCreate: async (user) => {
        user.password = await bcrypt.hash(user.password, SALT_ROUNDS);
      },
      beforeUpdate: async (user) => {
        if (user.changed("password")) {
          user.password = await bcrypt.hash(user.password, SALT_ROUNDS);
        }
      },
    },
    // indexes: [
    //   {
    //     unique: true,
    //     fields: ["username", "email"], // Add indexes for frequently queried fields
    //   },
    // ],
  }
);

export default User;
