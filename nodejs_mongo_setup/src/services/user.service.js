import ApiError from "../utils/ApiError.js";
import logger from "../utils/logger.js";

class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async createUser({ username, email, fullName, password, profileImage }) {
    try {
      const userExists =
        await this.userRepository.findUserByEmailOrUsernameOrId({
          email,
          username,
        });
      if (userExists) {
        throw new ApiError({ statusCode: 400, message: "User already exists" });
      }

      return await this.userRepository.createUser({
        username,
        email,
        fullName,
        password,
        profileImage,
      });
    } catch (error) {
      logger.error("UserService Error:", error);
      throw new ApiError({
        statusCode: 500,
        message: "Failed to create user: " + error?.message,
      });
    }
  }

  async generateAccessAndRefreshToken(userId, validity) {
    const user = await this.userRepository.findUserById(userId);
    if (!user) {
      throw new ApiError({ statusCode: 404, message: "User not found" });
    }

    const accessToken = user.generateAccessToken(validity);
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  }

  async getUserByNameOrEmailorId({ username, email, userId }) {
    const user = await this.userRepository.findUserByEmailOrUsernameOrId({
      username,
      email,
      userId,
    });
    if (!user) {
      throw new ApiError({ statusCode: 404, message: "User not found" });
    }

    return user;
  }

  async validateUserCredentials({ email, password }) {
    const user = await this.userRepository.findUserByEmailOrUsernameOrId(
      { email },
      true
    );
    if (!user) {
      throw new ApiError({
        statusCode: 400,
        message: "Invalid !!! No user found",
      });
    }

    const isPasswordMatch = await this.userRepository.matchPassword({
      email,
      password,
    });
    if (!isPasswordMatch) {
      throw new ApiError({ statusCode: 401, message: "Invalid credentials" });
    }

    return user;
  }

  async logoutUser(userId) {
    const user = await this.userRepository.findUserByIdAndUpdate(
      userId,
      { $unset: { refreshToken: 1 } },
      { new: true }
    );

    if (!user) {
      throw new ApiError({ statusCode: 404, message: "User not found" });
    }

    return user;
  }

  async getAllUsers() {
    return await this.userRepository.getAllUsers();
  }

  async deleteUser(userId) {
    const user = await this.userRepository.findUserByIdAndDelete(userId);
    if (!user) {
      throw new ApiError({ statusCode: 404, message: "User not found" });
    }

    return user;
  }

  async updateUser(userId, update) {
    const user = await this.userRepository.findUserByIdAndUpdate(
      userId,
      update,
      { new: true }
    );
    if (!user) {
      throw new ApiError({ statusCode: 404, message: "User not found" });
    }

    return user;
  }

  async changePassword(userId, { oldPassword, newPassword }) {
    const user = await this.userRepository.findUserById(userId);
    if (!user) {
      throw new ApiError({ statusCode: 404, message: "User not found" });
    }

    const isPasswordMatch = await this.userRepository.matchPassword({
      id: userId,
      password: oldPassword,
    });
    if (!isPasswordMatch) {
      throw new ApiError({ statusCode: 400, message: "Invalid credentials" });
    }

    user.password = newPassword;
    await user.save();

    return user;
  }

  async verifyToken(token) {
    return await this.userRepository.verifyToken(token);
  }
}

export default UserService;
