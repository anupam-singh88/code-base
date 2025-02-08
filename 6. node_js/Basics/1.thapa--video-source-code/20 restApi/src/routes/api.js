const express = require("express");
const Student = require("../models/students");
const router = express.Router();

//get students
router.get("/students", async (req, res) => {
  try {
    const studentsData = await Student.find();
    res.send(studentsData);
  } catch (error) {
    res.send(error);
  }
});

//create a new student
// app.post("/students", (req, res) => {
//   const user = new Student(req.body);
//   user
//     .save()
//     .then(() => {
//       res.status(201).send(user);
//     })
//     .catch((e) => {
//       console.log(e);
//       res.status(400).send(e);
//     });
//     res.send("hello from the post student side");
// });
router.post("/students", async (req, res) => {
  const user = new Student(req.body);
  try {
    const createUser = await user.save();
    res.status(201).send(createUser);
  } catch (err) {
    return res.status(400).send({ message: "Error while creating User" });
    console.log(e);
  }
});

//get the individual data
router.get("/students/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    // console.log(_id);
    // res.send(_id);
    // Student.findById({_id:_id})
    const studentData = await Student.findById(_id);
    if (!studentData) {
      res.status(404).send();
    } else {
      res.send(studentData);
    }
  } catch (error) {
    res.send(error);
  }
});

//update the student by its id
router.patch("/students/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const updateStudents = await Student.findByIdAndUpdate(_id, req.body, {
      new: true,
    });
    console.log(_id);
    res.send(updateStudents);
  } catch (error) {
    // res.status(404).send(updateStudents);
    console.log(error);
  }
});

//delete the document
router.delete("/delete/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    // res.send(_id);
    const deleteStudent = await Student.findByIdAndDelete(req.params.id);
    if (!req.params.id) {
      res.status(404).send();
      console.log("no id");
    }
    res.send(deleteStudent);
    console.log(deleteStudent);
  } catch (error) {
    console.log(error);
  }
});

router.get("/", (req, res) => {
  res.send("welcome to the home page baby");
});
module.exports = router;
