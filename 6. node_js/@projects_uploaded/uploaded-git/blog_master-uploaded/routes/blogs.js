const express = require('express');
const Router = express.Router();
const multer = require('multer');
const path = require('path');
const { isAuthenticated } = require('../middleware/checkToken')
const { Blog } = require('../models/Blogs')
const { publishController, blogController, editController, updateBlogController, deleteBlogController } = require('../controllers/blog-controller')

const uploadPath = path.resolve('./public/uploads')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, uploadPath)
    },
    filename: function (req, file, cb) {
        return cb(null, Date.now() + '-' + file.originalname);
    }
})

const upload = multer({ storage })

Router.post('/publish', isAuthenticated, upload.single('coverimage'), publishController)

Router.get('/blog', isAuthenticated, (req, res) => {
    // console.log(req.user)
    res.render('blog', {
        name: req.user.name
    })
})

Router.get('/blog/:id', blogController)

Router.get('/edit/:id', isAuthenticated, editController)

Router.post('/update/:id', isAuthenticated, upload.single('coverimage'), updateBlogController)

Router.get('/delete/:id', isAuthenticated, deleteBlogController)


module.exports = Router;