import { Router } from "express";
import {
  appendSheetData,
  getSheetData,
  sendEmailsAndUpdateSheet,
} from "../../controllers/sheet.controller.js";

const router = Router();

router.route("/send").get(getSheetData).post(sendEmailsAndUpdateSheet);

export default router;
