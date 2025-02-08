import app from "./app.js";
import { DB_NAME } from "./constants/common.js";
import connectToDB from "./db/connect.js";
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 3000;

connectToDB(`${process.env.MONGODB_URI}/${DB_NAME}`).then(() => {
    app.listen(PORT || 8000, () => {
        console.log(`Server is running at port : ${PORT}`);
    })
}).catch(err => {
    console.error("Error connecting to database: ", err);
    process.exit(1);
});
