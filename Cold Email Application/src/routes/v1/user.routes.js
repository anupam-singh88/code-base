import { Router } from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
  loginUser,
  logoutUser,
  resetPassword,
  updateUser,
  loginViaOtp,
  verifyOtp,
  forgotPassword,
  verifyPassword,
} from "../../controllers/index.js";
import { upload } from "../../middlewares/multer.middleware.js";
import {
  authorizePermissions,
  verifyJWT,
} from "../../middlewares/auth.middleware.js";

const router = Router();

router.get('/')

router.route("/register").post(upload.single("profileImage"), createUser);
router.route("/login").post(loginUser);
router.route("/login-otp").post(loginViaOtp);
router.route("/verify-otp").post(verifyOtp);
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/").get(verifyJWT, getAllUsers);
router.route("/reset-password").post(verifyJWT, resetPassword);
router.route("/forgot-password").post(forgotPassword);
router.route("/verify").get(verifyPassword);
router
  .route("/:userId")
  .get(verifyJWT, getUserById)
  .delete(verifyJWT, deleteUser)
  .patch(verifyJWT, updateUser);

//   .post(verifyJWT, authorizePermissions(["user"]), logoutUser);

export default router;
