import mongoose, { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const UserSchema = new Schema({
    username: {
        type: String,
        required: [true, "Name is required"],
        minLength: [3, "Name must be at least 3 characters long"],
        maxLength: [50, "Name cannot be more than 50 characters long"],
        trim: true,
        unique: true
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true,
        match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Please fill a valid email address"]
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minLength: [6, "Password must be at least 6 characters long"],
        select: false
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
    profileImg: {
        type: String,
    },
    refreshToken: {
        type: String
    }
}, {
    timestamps: true
})

UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    const salt = await bcrypt.genSalt(10);

    this.password = await bcrypt.hashSync(this.password, salt);
    next();
});

UserSchema.methods.checkPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

UserSchema.methods.generateAccessToken = function () {
    return jwt.sign({
        id: this._id,
        role: this.role,
        email: this.email,
        username: this.username
    }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    });
}

UserSchema.methods.generateRefreshToken = function () {
    return jwt.sign({
        id: this._id,
        role: this.role,
    }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_REFRESH_EXPIRE,
    });
}

const User = model("User", UserSchema);

export default User;