/*Events module
handle streams events -> data ,end, and error
*/
const fs = require("fs");
const http = require("http");

const server = http.createServer(() => { });

server.on("request", (req, res) => {
  //this method used to read data from a file but it is asynchronous way
  // fs.readFile("input.txt", (err, data) => {
  //   if (err) return console.error(err);
  //   res.end(data.toString());
  //   // console.log(data.toString());
  // });
  //2nd wat if reading data and continuously parsing it on the screen by creating a readable stream

  const rstream = fs.createReadStream("input.txt");
  rstream.on("data", (chunkdata) => {
    res.write(chunkdata);
  });
  rstream.on("end", () => {
    res.end();
  });
  rstream.on("error", (err) => {
    console.log(err);
    res.end("file not found");
  });
});
server.listen(8000, "127.0.0.1");
