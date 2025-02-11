const express = require("express");
const app = express();
const userRouter = require("./routes/user.routes");
const globalErrorHandler = require("./middleware/globalError.middleware");
const { createApiResponse } = require("./utils/ApiResponse");
const sequelize = require("./config/dbConfig");

const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", userRouter);

app.use((req, res) => {
  return res.status(404).json(
    createApiResponse({
      message: "Route not found",
      statusCode: 404,
    })
  );
});

app.use(globalErrorHandler);

const connectToDb = async () => {
  await sequelize.authenticate();
  await sequelize.sync({ alter: true });
  console.log("Db Connnected");
};

connectToDb()
  .then(() => {
    app.listen(port, () => {
      console.log("server running on " + port);
    });
  })
  .catch((err) => {
    console.log("Some Error Occured", err);
  });
