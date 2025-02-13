import dotenv from 'dotenv';
import connectDB from './db/index.js';
import { app } from './app.js';

dotenv.config({
    // path: '../.env'
    path: process.env.NODE_ENV === 'production' ? '.env' : '.env.development'
})

connectDB().then(() => {
    app.listen(process.env.PORT || 5000, () => {
        console.log(`Server is running on port ${process.env.PORT || 5000}`)
    })
}).catch((err) => {
    console.log('MONGODB CONNECTION FAILED : ', err)
})