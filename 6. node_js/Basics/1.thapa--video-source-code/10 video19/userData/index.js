const http = require("http");
const fs = require("fs");
// const { json } = require("stream/consumers");
const server = http.createServer((req, res) => {
  if (req.url == "/") {
    res.write("<h1>Our own web server</h1>");
    res.write("<p>Home page</p>");
    res.end();
  } else if (req.url == "/userapi") {
    //? res.setHeader('Content-Type', 'application/json');
    // res.write("hello from user api");
    fs.readFile(`${__dirname}/userApi/userapi.json`, "utf-8", (err, data) => {
      res.end(data);
    });
    // console.log(data1)

    //res.sendFile()
    // res.end();
  } else {
    res.write("<h1>other than home page</h1>");
    //? res.statusCode = 404;
    //? res.writeHead(404, { "content-type": "text/html" });

    res.end();
  }
  //   res.end();
});
server.listen(3000);
