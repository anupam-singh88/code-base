const express = require("express");
const app = express();

//*  setting view engine
app.set("view engine", "hbs");

//* this will tell the server that the default views directory renamed as templates
// app.set('views',"templates")

app.get("/", (req, res) => {
  res.render("index", {
    dynamicData: "title",
  });
});
app.get("/", (req, res) => {
  res.send("hello from express server");
});

app.listen(4000);
