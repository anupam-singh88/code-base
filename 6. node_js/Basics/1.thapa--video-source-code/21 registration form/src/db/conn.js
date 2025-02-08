const mongoose = require("mongoose");
mongoose
  .connect("mongodb://127.0.0.1:27017/nodeForm", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected to db successfully");
  })
  .catch(() => {
    console.log("Not Connected to db");
  });
