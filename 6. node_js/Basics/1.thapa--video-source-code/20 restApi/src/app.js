const express = require("express");
require("./db/conn");
const Student = require("./models/students");
const app = express();
const port = process.env.port || 3005;
const studentRoutes = require("./routes/api");

//this middleware tell the server that we are sending json as a response
app.use(express.json());

//out student routes
app.use(studentRoutes);

app.listen(port, () => {
  console.log(`connected successfully on port ${port}`);
});



//you don not need express.json() and express.urlencoded() for get requests or delete requests. we only need it for post and put request because we need to retreived the data from the url  --> app.use(express.urlencoded({extended : false}))

//express.json() is a method inbuilt in express to recognize the incoming request object as a json object this method is called as a middleware in your application using the code: app.use(express.json())

//* REST - representational state transfer
//* API - application programming interface
