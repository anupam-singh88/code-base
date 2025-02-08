const mongoose = require("mongoose");
mongoose
  .connect("mongodb://127.0.0.1:27017/students=api", {
    useNewUrlParser: true,

    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected to db successful");
  })
  .catch(() => {
    console.log("not connected to db");
  });
// useNewUrlParser: true,
// useUnifiedTopology: true,
// useCreateIndex: true,
// useFindAndModify: false,
