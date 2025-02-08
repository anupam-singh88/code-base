import config from "../config/index.js";
import { User } from "../models/User.model.js";
import jwt from "jsonwebtoken";

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
    const query = User.findOne({
      $or: [{ email }, { username }, { _id: userId }].filter(Boolean),
    });
    if (includePassword) {
      query.select("+password");
    }
    return await query.exec();
  }

  async findUserById(id) {
    return await User.findById(id);
  }

  async matchPassword({ id, email, password }) {
    const user = await User.findOne({ $or: [{ email }, { _id: id }] }).select(
      "+password"
    );
    if (!user) {
      return false;
    }
    return await user.comparePassword(password);
  }

  async findUserByIdAndUpdate(id, update, options = { new: true }) {
    return await User.findByIdAndUpdate(id, update, options);
  }

  async getAllUsers() {
    return await User.find();
  }

  async findUserByIdAndDelete(id) {
    return await User.findByIdAndDelete(id);
  }

  async verifyToken(token) {
    try {
      const decodedToken = jwt.verify(token, config.ACCESS_TOKEN_SECRET);

      if (!decodedToken?._id) {
        throw Error("Invalid token payload");
      }
      const user = await User.findById(decodedToken._id).select(
        "-password -refreshToken"
      );
      if (!user) {
        throw new Error("User not found for the provided access token");
      }
      return user;
    } catch (error) {
      throw Error("Link Expired");
    }
  }
}

export default UserRepository;
