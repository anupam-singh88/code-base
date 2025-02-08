const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
  checkAuth
} = require("../../controllers/auth/auth-controller");
const { createApiResponse } = require("../../utils/ApiResponse");
const { authMiddleware } = require("../../middleware/auth.middleware");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/check-auth", authMiddleware, checkAuth);

module.exports = router;
