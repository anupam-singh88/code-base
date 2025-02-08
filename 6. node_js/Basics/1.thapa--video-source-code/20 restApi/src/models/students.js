const mongoose = require("mongoose");
const validator = require("validator");

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    // minlength: [10, "minlength 10 is required"],
    // maxlength: [
    //   256,
    //   "maxlength of the field should be less than or equal to  30",
    // ],
  },
  email: {
    type: String,
    required: true,
    // unique: [true, "email is already present in the database"],
    // validate(value) {
    //   if (validator.isEmail(value)) {
    //     throw new Err("INVALID EMAIL !!!!!");
    //   }
    // },
  },
  phone: {
    type: Number,
    min: 10,
    // max: 10,
    required: true,
    unique: true,
  },
  address: {
    type: String,
    required: true,
  },
});

//we  will create a new collection using model
const Student = new mongoose.model("Student", studentSchema);

module.exports = Student;
