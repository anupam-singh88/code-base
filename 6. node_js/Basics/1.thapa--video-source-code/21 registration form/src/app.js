require("dotenv").config();
const path = require("path");
const express = require("express");
require("./db/conn");
const Register = require("./models/registers");
const app = express();
const hbs = require("hbs");
const bcrypt = require("bcryptjs");
const cookieParser = require("cookie-parser");
// const jwt = require("jsonwebtoken");
const auth = require("./middleware/auth");

const port = process.env.port || 3000;

const staticPath = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");
// console.log(partials_path);

app.use(express.static(staticPath));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.set("view engine", "hbs");
app.set("views", template_path);
hbs.registerPartials(partials_path);

// console.log(process.env.SECRET_KEY);

app.get("/", (req, res) => {
  res.render(__dirname + "/templates/views/index.hbs");
  //   console.log(__dirname + "/templates/views/index.hbs");
});

app.get("/secret", auth, (req, res) => {
  res.render(__dirname + "/templates/views/secret.hbs");
  // console.log("cookie : " + req.cookies.jwt);
});


app.get("/register", (req, res) => {
  res.render(__dirname + "/templates/views/register.hbs");
  //   console.log(__dirname + "/templates/views/index.hbs");
});

//create a new data in db
app.post("/register", async (req, res) => {
  try {
    // console.log(req.body.firstName);
    // res.send(req.body.firstName);
    const password = req.body.password;
    const cpassword = req.body.rePassword;
    if (password === cpassword) {
      const registerEmployee = new Register({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        gender: req.body.gender,
        phone: req.body.phoneNumber,
        password: password,
        confirmPassword: cpassword,
      });
      //now calling the pre-method in model to hash the password 

      //here hashing needs to done with the help of middleware
      const token = await registerEmployee.generateAuthToken();
      // console.log(token);

      // the res.cookie() function is used to set the cookie name to value
      //the value parameter may be a string or object converted to JSON

      // res.cookie(name,value,[options])
      res.cookie("jwt", token, {
        expires: new Date(Date.now() + 30000),
        http: true,
      });

      const registered = await registerEmployee.save();
      res.status(201).render(__dirname + "/templates/views/index.hbs");
    } else {
      res.send("password not matched");
    }
  } catch (error) {
    console.log(error);
  }
});
app.get("/login", (req, res) => {
  //   res.send("login page");
  res.render(__dirname + "/templates/views/login.hbs");
});

//create a user
app.post("/login", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const useremail = await Register.findOne({ email: email });
    // console.log(useremail.password, password);

    const isMatch = await bcrypt.compare(password, useremail.password);

    const token = await useremail.generateAuthToken();

    res.cookie("jwt", token, {
      expires: new Date(Date.now() + 600000),
      http: true,
      // secure: true, //for https
    });

    // console.log(token);
    if (isMatch) {
      // if (useremail.password === password) {
      res.status(201).render(__dirname + "/templates/views/secret.hbs");
      // console.log("inside");
    }
    // res.send(useremail);
    // console.log(useremail.password);
  } catch (error) {
    console.log(error);
  }
});

app.get("/logout", auth, async (req, res) => {
  try {
    //for single logout
    // req.user.tokens = req.user.tokens.filter((currElement) => {
    //   return currElement.token != req.token;
    // });

    // for all devices logout
    req.user.tokens = [];

    res.clearCookie("jwt");
    await req.user.save();
    res.render(__dirname + "/templates/views/login.hbs");
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(port, () => {
  console.log(`app running on port ${port}`);
});
