const express = require('express');
const Router = express.Router();


const { loginController, logoutController, registerController, resetHandler } = require('../controllers/user-controller')

Router.get('/login', (req, res) => {
    res.render('login', {
        loginBool: true
    })
})

Router.post('/login', loginController)
Router.get("/logout", logoutController);

Router.get('/register', (req, res) => {
    res.render('register')
})
Router.post('/register', registerController)


Router.get('/reset', (req, res) => {
    res.render('reset')
})
Router.post('/reset', resetHandler)


Router.get('/about', (req, res) => {
    res.render('about', { loginBool: true })
})

module.exports = Router;