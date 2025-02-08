const express = require("express");

const app = express();

// app.get(route,callback)
app.get("/", (req, res) => {
  res.send("hello from express");
});
app.get("/about", (req, res) => {
  res.send("hello from about page");
});
let port = 8000;
app.listen(port, () => {
  console.log(`listening ${port}`);
});

/*API
GET-READ
post-create
put-update
patch- any small change
delete - delete
----------------------------------
the callback function has 2 parameters request(req),response(res).
the request object(req) represents the HTTP request and has properties for the request query string,parameters, body,HTTP headers, etc

similarly the response object represents the HTTP response that the express app sends when it recieves an HTTP request
*/
