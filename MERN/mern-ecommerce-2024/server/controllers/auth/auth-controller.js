const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");
const { createBadRequestError } = require("../../errors/bad-request-error");
const { createApiResponse } = require("../../utils/ApiResponse");
const asyncHandler = require("../../utils/asyncHandler");
const { createUnAuthenticatedError } = require("../../errors/unauthenticated-error");

//register
const registerUser = asyncHandler(async (req, res) => {
  const { userName, email, password } = req.body;

  if (!userName || !email || !password) {
    const msgObj = {};
    if (!userName) msgObj.userName = "userName is required";
    if (!email) msgObj.email = "email is required";
    if (!password) msgObj.password = "password is required";

    return res.status(400).json(
      createBadRequestError("Please provide all the required fields " + JSON.stringify(msgObj))
    );
  }
  const checkUser = await User.findOne({ email });
  if (checkUser) {
    return res.status(400).json(
      createBadRequestError("User already exists with the same email! Please try again")
    );
  }

  const hashPassword = await bcrypt.hash(password, 12);
  const newUser = new User({
    userName,
    email,
    password: hashPassword,
  });

  await newUser.save();

  // Convert newUser to a plain object and exclude password
  const userResponse = newUser.toObject();
  delete userResponse.password;

  res.status(201).json(
    createApiResponse(201, userResponse, "User registered successfully")
  );

});

//login
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    const msgObj = {};
    if (!email) msgObj.email = "email is required";
    if (!password) msgObj.password = "password is required";

    res.status(400).json(
      createBadRequestError("Please provide all the required fields" + JSON.stringify(msgObj))
    )
  }


  try {
    const checkUser = await User.findOne({ email });
    if (!checkUser)
      return res.status(400).json(
        createBadRequestError("User does not exist with the provided email! Please try again")
      );

    const checkPasswordMatch = await bcrypt.compare(
      password,
      checkUser.password
    );
    if (!checkPasswordMatch)
      return res.json(
        createUnAuthenticatedError("Invalid credentials! Please try again")
      );

    const token = jwt.sign(
      {
        id: checkUser._id,
        role: checkUser.role,
        email: checkUser.email,
        userName: checkUser.userName,
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRY }
    );


    // res.cookie("token", token, { httpOnly: true, secure: false }).json({
    //   success: true,
    //   message: "Logged in successfully",
    //   user: {
    //     email: checkUser.email,
    //     role: checkUser.role,
    //     id: checkUser._id,
    //     userName: checkUser.userName,
    //   },
    // });

    res.cookie("token", token, { httpOnly: true, secure: false }).status(200).json(
      createApiResponse(200, {
        email: checkUser.email,
        role: checkUser.role,
        id: checkUser._id,
        userName: checkUser.userName,
      }, "Logged in successfully")
    )



  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured",
    });
  }
};

//logout

const logoutUser = (req, res) => {
  res.clearCookie("token").json(
    createApiResponse(200, null, "Logged out successfully")
  );
};

//auth middleware
// const authMiddleware = async (req, res, next) => {
//   const token = req.cookies.token;
//   if (!token)
//     return res.status(401).json({
//       success: false,
//       message: "Unauthorised user!",
//     });

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded;
//     next();
//   } catch (error) {
//     res.status(401).json({
//       success: false,
//       message: "Unauthorised user!",
//     });
//   }
// };

const checkAuth = (req, res) => {
  const user = req.user;
  res.status(200).json(
    createApiResponse(
      200,
      {
        email: user.email,
        role: user.role,
        id: user.id,
        userName: user.userName,
      },
      "User is authenticated"
    )
  );
}

module.exports = { registerUser, loginUser, logoutUser, checkAuth };
