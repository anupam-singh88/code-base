import express, { Router } from 'express';
import { registerUser, loginUser, logoutUser, refershAccessToken, changeCurrentPassword, currentUser, updateAccountDetails, updateProfileImage, getAllUsers } from '../controller/user.controller.js';
import { authorizePermissions, verifyJWT } from '../middleware/auth.middleware.js';
import { upload } from '../middleware/multer.middleware.js';

const router = Router();

router.route('/register').post(
    upload.fields([
        { name: 'profileImg', maxCount: 1 },
    ])
    , registerUser);

router.route('/login').post(loginUser);
router.route('/logout').post(verifyJWT, logoutUser);
router.route('/refresh-token').post(refershAccessToken);
router.route('/reset-password').post(verifyJWT, changeCurrentPassword);
router.route('/current-user').post(verifyJWT, currentUser);
router.route('/update-user').post(verifyJWT, updateAccountDetails);
router.route('/update-profileImg').post(verifyJWT,
    upload.fields(
        [
            { name: 'profileImg', maxCount: 1 },
        ]
    ), updateProfileImage);

router.route('/get-all-users').get(verifyJWT, authorizePermissions('admin'), getAllUsers);

export default router;