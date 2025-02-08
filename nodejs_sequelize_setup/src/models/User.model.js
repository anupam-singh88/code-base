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
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    profileImage: {
      type: DataTypes.JSON,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
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
  }
);

export default User;
