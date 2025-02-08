
const app = require("./app.js");
// const { DB_NAME } = require("./constants/common.js");
const dotenv = require('dotenv');
const { connectToDB } = require("./db/index.js");

dotenv.config();

const PORT = process.env.PORT || 3000;


connectToDB(`${process.env.MONGODB_URI}`).then(() => {
    app.listen(PORT || 3000, () => {
        console.log(`Server is running at port : ${PORT}`);
    })
}).catch(err => {
    console.error("Error connecting to database: ", err);
    process.exit(1);
});
