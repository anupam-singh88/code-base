const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { createTokenForUser } = require('../services/authentication')
const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }

}, { timestamps: true })


UserSchema.pre('save', async function (next) {

    const user = this;
    if (!user.isModified("password")) return;

    const hashedPassword = await bcrypt.hash(this.password, 10);

    this.password = hashedPassword;

    next();
})

UserSchema.static('matchPasswordGenerateToken', async function (email, password) {
    const user = await this.findOne({ email });
    if (!user) {
        throw new Error("User not found!")

    };
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        // throw new Error("Incorrect Password");
        // return console.log({ message: "Incorrect Password" });
        return
    }
    const token = createTokenForUser(user);
    return token
})

const User = mongoose.model('user', UserSchema);

module.exports = {
    User
}