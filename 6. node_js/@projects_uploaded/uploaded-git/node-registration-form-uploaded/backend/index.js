const express = require('express');
const app = express();
var cors = require("cors");
const regroutes = require('./routes/regroutes')
require('./db/conn')

const port = 5500 || process.env.PORT;
app.use(cors());
app.use(express.json());
app.use(regroutes)

app.listen(port, () => {
    console.log(`Server Listening at port : http:localhost:${port}`)
})