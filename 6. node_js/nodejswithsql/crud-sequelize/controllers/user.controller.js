const models = require('../models');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { userSchema } = require('../validations/post');

function save(req, res) {
    const { error } = userSchema.validate(req.body)
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    const user = {
        name: req.body.name,
        email: req.body.email,
        password: bcryptjs.hashSync(req.body.password, 8)
    };
    models.User.create(user).then(result => {
        res.status(201).json({
            message: "User created successfully",
            user: result
        })
    }).catch(err => {
        res.status(500).json({
            message: "Something went wrong",
            error: err
        })
    })
}

function login(req, res) {
    const email = req.body.email;
    const password = req.body.password
    models.User.findOne({ where: { email: email } }).then(user => {
        if (user) {
            const passwordIsValid = bcryptjs.compareSync(password, user.password);
            if (passwordIsValid) {
                const token = jwt.sign({ id: user.id }, 'secret', {
                    expiresIn: 86400
                });
                res.status(200).json({
                    message: "Login successful",
                    token: token
                })
            } else {
                res.status(401).json({
                    message: "Invalid password"
                })
            }
        } else {
            res.status(404).json({
                message: "User not found"
            })
        }
    }).catch(err => {
        res.status(500).json({
            message: "Something went wrong",
            error: err
        })
    })
}

module.exports = {
    save,
    login
}
//  In the above code, we have created two functions  save  and  login  to save the user and login the user respectively.
//  In the  save  function, we are validating the request body using the  userSchema  schema. If the request body is not valid, we are returning a 400 status code with an error message. If the request body is valid, we are creating a user with the given data and returning a 201 status code with a success message.
//  In the  login  function, we are checking if the user exists with the given email. If the user exists, we are comparing the password with the hashed password. If the password is correct, we are generating a token using the  jwt  package and returning a 200 status code with the token. If the password is incorrect, we are returning a 401 status code with an error message. If the user does not exist, we are returning a 404 status code with an error message.
//  Now, let’s create a route for the user controller.