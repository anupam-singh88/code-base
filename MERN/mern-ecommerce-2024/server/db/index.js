const mongoose = require('mongoose');

const connectToDB = async (url) => {
    try {
        const connectionInstance = await mongoose.connect(url)
        console.log(`\nMongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);

    } catch (error) {
        console.error("Error connecting to database: ", error.message);
        process.exit(1);
    }
}

module.exports = { connectToDB };