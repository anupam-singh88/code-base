// Purpose: Connect to the database using mongoose.
const mongoose = require('mongoose');

const connectDb = (url) => {
    // return mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
    return mongoose.connect(url);
};

export default connectDb;