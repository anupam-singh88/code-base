const UserTable = require("../models/user.model");
const { ApiError } = require("../utils/ApiError");
const { createApiResponse } = require("../utils/ApiResponse");
const asyncHandler = require("../utils/asyncHandler");

const addUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    throw new ApiError({
      message: "Username and password are required",
      statusCode: 400,
    });
  }

  const user = await UserTable.create(req.body);

  return res.status(201).json(
    createApiResponse({
      message: "User created successfully",
      data: user,
    })
  );
});

const getUser = asyncHandler(async (req, res) => {
  const users = await UserTable.findAll();
  return res.status(200).json(
    createApiResponse({
      message: "Users retrieved successfully",
      data: users,
    })
  );
});

const getUserById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const user = await UserTable.findByPk(id);
  if (!user) {
    throw new ApiError({
      message: "User not found",
      statusCode: 404,
    });
  }

  return res.status(200).json(
    createApiResponse({
      message: "User retrieved successfully",
      data: user,
    })
  );
});

const updateUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { username, password } = req.body;

  const user = await UserTable.findByPk(id);
  if (!user) {
    throw new ApiError({
      message: "User not found",
      statusCode: 404,
    });
  }

  await user.update({ username, password });

  return res.status(200).json(
    createApiResponse({
      message: "User updated successfully",
      data: user,
    })
  );
});

const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const user = await UserTable.findByPk(id);
  if (!user) {
    throw new ApiError({
      message: "User not found",
      statusCode: 404,
    });
  }

  await user.destroy();

  return res.status(200).json(
    createApiResponse({
      message: "User deleted successfully",
    })
  );
});

const queryUsers = asyncHandler(async (req, res) => {
  const { username, createdAt, limit = 10, offset = 0 } = req.query;

  const whereClause = {};

  if (username) {
    whereClause.username = username;
  }

  if (createdAt) {
    whereClause.createdAt = createdAt;
  }

  const users = await UserTable.findAndCountAll({
    where: whereClause,
    limit: parseInt(limit), // Convert to integer
    offset: parseInt(offset), // Convert to integer
  });

  return res.status(200).json(
    createApiResponse({
      message: "Users retrieved successfully",
      data: users.rows,
      total: users.count, // Total records count
      limit: parseInt(limit),
      offset: parseInt(offset),
    })
  );
});

module.exports = {
  addUser,
  getUser,
  getUserById,
  updateUser,
  deleteUser,
  queryUsers,
};
