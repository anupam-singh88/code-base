require('dotenv').config();
require('./db')
const express = require('express');
const app = express();
var cors = require("cors");
const noteRoutes = require('./routes/note-route')

app.use(cors());
app.use(express.json())

const port = process.env.PORT || 3000;

app.use(noteRoutes)

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`)
})