require("dotenv").config();

const dbURL = process.env.DB_URL;
const mongoose = require('mongoose');

const mongoURI = `${dbURL}`;
// const mongoURI = 'mongodb://127.0.0.1:27017/registrationdata';

mongoose.connect(mongoURI).then(() => {
    console.log('Connected to db successfully!!')

}).catch(() => {
    console.log('not connected to db')
})