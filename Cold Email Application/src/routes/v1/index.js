import { Router } from "express";
import userRouter from "./user.routes.js";
import sheetRouter from "./sheet.routes.js";

const v1Router = Router();

v1Router.use("/users", userRouter);
v1Router.use("/sheets", sheetRouter);

export default v1Router;
