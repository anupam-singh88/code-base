const mongoose = require('mongoose');

const mongoURI = process.env.MONGO_URL

mongoose.connect(mongoURI).then(() => {
    console.log('connected to db successfully!!')
}).catch((e) => {
    console.log('not connected to db ', e.message)
})