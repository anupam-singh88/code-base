const { User } = require('../models/User')
const jwt = require("jsonwebtoken");
const secret = process.env.SECRET;
const bcrypt = require('bcryptjs');
const { Blog } = require('../models/Blogs')

const loginController = async (req, res) => {
    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (!user) {
            // throw new Error();
            return res.status(404).render('login', {
                message: 'User Not Found',
                email,
                loginBool: true
            })
        }

        let token = await User.matchPasswordGenerateToken(email, password);
        if (!token) {
            // throw new Error()
            return res.render('login', {
                email,
                message: 'Invalid Credentials!!!',
                loginBool: false
            })
        }
        res.cookie("token", token, {
            httpOnly: true,
            expires: new Date(Date.now() + 60 * 5000),
        });

        const allBlog = await Blog.find({})
        res.render('index', {
            blogs: allBlog,
            loginBool: false
        });
    } catch (error) {
        return res.render("login", {
            message: "Incorrect Email or Password",
        });
    }
}

const logoutController = (req, res) => {
    res.cookie("token", null, {
        httpOnly: true,
        expires: new Date(Date.now()),
    });
    res.redirect("/");
}
const registerController = async (req, res) => {
    const { name, email, password, confirmpass } = req.body;
    let user = await User.findOne({ email });
    if (user) {
        return res.render("register", {
            name,
            email,
            message: "Email already exists!!!"
        });
    }
    if (password !== confirmpass) {
        return res.render("register", {
            name,
            email,
            password,
            passmsg: "Password Not Matched!!!"
        });
    }
    const userData = await User.create({
        name,
        email,
        password
    })

    const payload = {
        _id: userData._id,
        email: userData.email,
        profileImageURL: userData.profileImageURL,
        role: userData.role,
    };
    const token = jwt.sign(payload, secret);
    res.cookie("token", token, {
        httpOnly: true,
        expires: new Date(Date.now() + 60 * 1000),
    });
    res.render('blog', {
        name
    })
}

const resetHandler = async (req, res) => {
    const { email, password, cpassword } = req.body;
    let user = await User.findOne({ email });
    if (!user) {
        return res.status(404).render('reset', {
            message: 'Email Not Found',
            email
        })
    }
    if (password !== cpassword) {
        return res.status(200).render('reset', { passmsg: 'Password Not Matched', email })
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newpass = {
        password: hashedPassword
    }
    const updatePassWord = await User.findByIdAndUpdate(user._id, newpass, { new: true })
    res.redirect('/login')

}
module.exports = { loginController, logoutController, registerController, resetHandler }