const express = require("express");
const { createApiResponse } = require("../utils/ApiResponse");
const asyncHandler = require("../utils/asyncHandler");
const {
  addUser,
  getUserById,
  getUser,
  updateUser,
  deleteUser,
  queryUsers,
} = require("../controller/user.controller");
const router = express.Router();

router.route("/").post(addUser).get(getUser);
router.get("/search", queryUsers);
router.route("/:id").get(getUserById).delete(deleteUser).put(updateUser);

module.exports = router;
