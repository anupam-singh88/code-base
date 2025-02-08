import { createBadRequestError } from "../errors/bad-request-error.js";
import { createCustomApiError } from "../errors/custom-error.js";
import { createUnauthorizedError } from "../errors/unauthorirzed-error.js";
import User from "../models/User.model.js";
import { createApiResponse } from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js"
import { destroyOnCloudinary, uploadOnCloudinary } from "../utils/cloudinary.js";
import userSchema from "../validations/User.js";
import jwt from "jsonwebtoken";

const generateAccessAndRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId);
        const accessToken = await user.generateAccessToken();
        const refreshToken = await user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save();

        return { accessToken, refreshToken }
    } catch (error) {
        console.log("🚀 ~ generateAccessAndRefreshToken ~ error:", error)
        throw new Error("Token generation failed", error)
    }
}

const registerUser = asyncHandler(async (req, res) => {
    const {
        body: userBody,
    } = req;

    const { error } = userSchema.validate(userBody);

    if (error) {
        res.status(400).json(createBadRequestError(error.message))
    }

    const { username, email, password, role } = userBody;

    const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    })

    if (existedUser) {
        res.status(400).json(createCustomApiError(409, "User already exists"))
    }

    const profileImg = req.files?.profileImg ? req.files.profileImg[0].path : null;

    const uploadProfileImg = await uploadOnCloudinary(profileImg);

    if (!uploadProfileImg) {
        return res.status(500).json(createCustomApiError(500, "Image upload failed"))
    }

    const newUser = new User({
        username: username.toLowerCase(),
        email,
        password,
        role,
        profileImg: uploadProfileImg.url
    })

    await newUser.save();

    if (!newUser) {
        return res.status(500).json(createCustomApiError(500, "User registration failed"))
    }

    res.status(201).json(createApiResponse(201, newUser, "User registered successfully"))

})

const loginUser = asyncHandler(async (req, res) => {
    const { body: { email, password } } = req;

    if (!email || !password) {
        return res.status(400).json(createBadRequestError("Email and password are required"))
    }

    const user = await User.findOne({ email }).select('+password');

    if (!user) {
        return res.status(404).json(createCustomApiError(404, "User not found"))
    }

    const isPasswordMatch = await user.checkPassword(password);

    if (!isPasswordMatch) {
        return res.status(401).json(createUnauthorizedError(401, "Invalid credentials"))
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id);

    const loggedInUser = await User.findById(user._id).select("-password ");

    const options = {
        httpOnly: true,
        secure: true
    }

    return res.status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(createApiResponse(200, loggedInUser, "User logged in successfully"))
})

const logoutUser = asyncHandler(async (req, res) => {
    // const { user } = req;
    // user.refreshToken = null;
    // await user.save();

    // res.clearCookie("accessToken");
    // res.clearCookie("refreshToken");

    // res.status(200).json(createApiResponse(200, null, "User logged out successfully"))
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: { refreshToken: 1 }
        },
        { new: true }
    )

    const options = {
        httpOnly: true,
        secure: true
    }

    return res.status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(createApiResponse(200, null, "User logged out successfully"))
})

const refershAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken = req.cookies?.refreshToken || req.body.refreshToken;

    if (!incomingRefreshToken) {
        return res.status(401).json(createUnauthorizedError(401, "Unauthorized"))
    }

    try {
        const decodedToken = jwt.verify(incomingRefreshToken, process.env.JWT_SECRET);

        const user = await User.findById(decodedToken?.id);

        if (!user) {
            return res.status(401).json(createUnauthorizedError(401, "Unauthorized - Invalid Token"))
        }

        if (user.refreshToken !== incomingRefreshToken) {
            return res.status(401).json(createUnauthorizedError(401, "Unauthorized - Invalid Token"))
        }

        const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id);

        const loggedInUser = await User.findById(user._id).select("-password");

        const options = {
            httpOnly: true,
            secure: true
        }

        return res.status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .json(createApiResponse(200, loggedInUser, "Token refreshed successfully"))

    } catch (error) {
        console.log("🚀 ~ refershAccessToken ~ error:", error);
        throw new Error("Token refresh failed", error.message)
    }
})

const changeCurrentPassword = asyncHandler(async (req, res) => {
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
        return res.status(400).json(createBadRequestError("Old password and new password are required"))
    }

    const user = await User.findById(req.user._id).select("+password");
    const isPasswordMatch = await user.checkPassword(oldPassword);

    if (!isPasswordMatch) {
        return res.status(401).json(createUnauthorizedError(401, "Invalid credentials"))
    }

    user.password = newPassword;
    await user.save({ validateBeforeSave: false });

    res.status(200).json(createApiResponse(200, null, "Password changed successfully"))
})

const currentUser = asyncHandler(async (req, res) => {
    const user = req.user;
    const loggedInUser = await User.findById(user._id);

    res.status(200).json(createApiResponse(200, loggedInUser, "User fetched successfully"))
})

const updateAccountDetails = asyncHandler(async (req, res) => {
    const { body: { username, email } } = req;
    const user = req.user;

    const existingUser = await User.findOne({ $or: [{ username }, { email }] });

    if (existingUser) {
        return res.status(400).json(createBadRequestError("Username or email already exists"))
    }

    const updatedUser = await User.findByIdAndUpdate({
        _id: user._id
    }, {
        $set: {
            username,
            email
        }
    }, {
        new: true
    })

    res.status(200).json(createApiResponse(200, updatedUser, "User details updated successfully"))
})

const updateProfileImage = asyncHandler(async (req, res) => {
    const profileImg = req.files?.profileImg ? req.files.profileImg[0].path : null;

    if (!profileImg) {
        return res.status(400).json(createBadRequestError("Image is required"))
    }

    const user = req.user;

    const uploadProfileImg = await uploadOnCloudinary(profileImg);

    if (!uploadProfileImg) {
        return res.status(500).json(createCustomApiError(500, "Image upload failed"))
    }

    // Delete the previous profile image (if it exists)
    if (user.profileImg) {
        const id = user.profileImg.split("/").pop();
        const publicId = id.split(".")[0];
        destroyOnCloudinary(publicId);
    }


    const updatedUser = await User.findByIdAndUpdate({
        _id: user.id
    }, {
        $set: {
            profileImg: uploadProfileImg.url
        }
    }, {
        new: true
    })

    res.status(200).json(createApiResponse(200, updatedUser, "Profile image updated successfully"))
})

const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find();

    res.status(200).json(createApiResponse(200, users, "Users fetched successfully"))
})


export { registerUser, loginUser, logoutUser, refershAccessToken, changeCurrentPassword, currentUser, updateAccountDetails, updateProfileImage, getAllUsers }