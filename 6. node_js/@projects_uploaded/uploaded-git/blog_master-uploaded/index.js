require('dotenv').config()
require('./conn')
const express = require('express');
const app = express();
const path = require('path')
const cookieParser = require("cookie-parser");
const userRoutes = require('./routes/user')
const blogRoutes = require('./routes/blogs')
const { Blog } = require("./models/Blogs");

const port = process.env.port || 3000;

let viewPath = (path.join(path.resolve() + '/views'))
app.set('view engine', 'ejs');
app.set("views", viewPath);
app.use(express.static(path.join(path.resolve(), "public")))
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser());
// app.use(checkForAuthenticationCookie("token"));

app.use(userRoutes)
app.use(blogRoutes)

app.get('/', async (req, res) => {
    const allBlogs = await Blog.find({});
    res.render('index', {
        name: 'anupam singh',
        loginBool: true,
        blogs: allBlogs
    })
})

app.listen(port, () => {
    console.log(`server listening to port : http://localhost:${port}`)
})