const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const employeeSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  gender: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  confirmPassword: {
    type: String,
    required: true,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

//methods use when calling from instance otherwise static  -> use normal function we have to use this keyword
employeeSchema.methods.generateAuthToken = async function () {
  try {
    //creating new token
    const token = jwt.sign(
      { _id: this._id.toString() },
      process.env.SECRET_KEY
    );
    this.tokens = this.tokens.concat({ token: token });
    await this.save();
    // console.log(token);
    return token;
  } catch (error) {
    console.log(error);
  }
};

employeeSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    // console.log(`the current password is ${this.password}`);
    this.password = await bcrypt.hash(this.password, 10);
    // console.log(`after current password is ${this.password}`);
    this.confirmPassword = await bcrypt.hash(this.confirmPassword, 10);
    // this.confirmPassword = undefined;
  }
  // console.log(this.firstName);
  // console.log(this.lastName);
  // console.log(this.email);
  // console.log(this.gender);
  // console.log(this.phone);
  // console.log(this.confirmPassword);
  next();
});

//create a collection
const Register = new mongoose.model("Register", employeeSchema);

module.exports = Register;



// statics are the methods defined on the model
// methods are defined on the document (instance)

// use .statics for static methods
// use .methods for instance methods