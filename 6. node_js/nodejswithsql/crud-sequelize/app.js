const express = require('express');
const bodyParser = require('body-parser')
const path = require('path')

const { index } = require('./controllers/post.controller');
const app = express();
const postRouter = require('./routes/post.route.js')
const userRouter = require('./routes/user.route.js')
const imageRouter = require('./routes/images.route.js')


const staticPath = path.join(__dirname, 'public', 'uploads');
app.use(bodyParser.json());
app.use('/uploads', express.static(staticPath));
app.use('/post', postRouter)
app.use('/users', userRouter)
app.use('/image', imageRouter)


module.exports = { app };