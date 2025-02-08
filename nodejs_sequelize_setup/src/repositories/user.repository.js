import config from "../config/index.js";
import User from "../models/User.model.js";
import jwt from "jsonwebtoken";
import { Op } from "sequelize";

class UserRepository {
  async createUser({ username, email, fullName, password, profileImage }) {
    return await User.create({
      username,
      email,
      fullName,
      password,
      profileImage,
    });
  }

  async findUserByEmailOrUsernameOrId(
    { email, username, userId },
    includePassword = false
  ) {
    const whereClause = {};
    if (email) whereClause.email = email;
    if (username) whereClause.username = username;
    if (userId) whereClause.id = userId;

    const attributes = includePassword ? {} : { exclude: ["password"] };

    return await User.findOne({
      where: {
        [Op.or]: Object.entries(whereClause).map(([key, value]) => ({
          [key]: value,
        })),
      },
      attributes,
    });
  }

  async findUserById(id) {
    return await User.findByPk(id, {
      attributes: { exclude: ["password"] },
    });
  }

  async matchPassword({ id, email, password }) {
    const whereClause = {};
    if (id) whereClause.id = id;
    if (email) whereClause.email = email;

    const user = await User.findOne({
      where: {
        [Op.or]: Object.entries(whereClause).map(([key, value]) => ({
          [key]: value,
        })),
      },
    });

    if (!user) return false;
    return await user.comparePassword(password);
  }

  async findUserByIdAndUpdate(id, update) {
    const [updated] = await User.update(update, {
      where: { id },
      returning: true,
    });

    if (!updated) return null;
    return await User.findByPk(id, { attributes: { exclude: ["password"] } });
  }

  async getAllUsers() {
    return await User.findAll({
      attributes: { exclude: ["password"] },
    });
  }

  async findUserByIdAndDelete(id) {
    return await User.destroy({ where: { id } });
  }

  async verifyToken(token) {
    try {
      const decodedToken = jwt.verify(token, config.ACCESS_TOKEN_SECRET);
      if (!decodedToken?.id) throw new Error("Invalid token payload");

      const user = await User.findByPk(decodedToken.id, {
        attributes: { exclude: ["password", "refreshToken"] },
      });

      if (!user)
        throw new Error("User not found for the provided access token");
      return user;
    } catch (error) {
      throw new Error("Link Expired");
    }
  }
}

export default UserRepository;
