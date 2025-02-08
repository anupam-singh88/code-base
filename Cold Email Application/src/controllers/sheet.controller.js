import { googleSheetService } from "../index.js";
import mailService from "../services/mail.service.js";
import ApiError, { createNewApiError } from "../utils/ApiError.js";
import createNewApiResponse from "../utils/ApiResposne.js";
import asyncHandler from "../utils/asyncHandler.js";
import logger from "../utils/logger.js";

const spreadsheetId = "1Hj4a8OV5RViI6d7pJO2g_GhjtsjuXK3urJ6XFiCDVVk";
const sourceSheet = "mailList"; // Source sheet
const successSheet = "success"; // Destination for successful emails
const failSheet = "fail"; // Destination for failed emails

export const getSheetData = asyncHandler(async (req, res) => {
  try {
    const data = await googleSheetService.getSheetData(spreadsheetId, range);
    console.log(typeof data);
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export const appendSheetData = asyncHandler(async (req, res) => {
  try {
    const values = [[new Date().toISOString(), "test"]];

    const data = await googleSheetService.appendSheetData(
      spreadsheetId,
      range,
      values
    );
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export const sendEmailsAndUpdateSheet = asyncHandler(async (req, res) => {
  try {
    const data = await googleSheetService.getSheetData(
      spreadsheetId,
      sourceSheet
    );

    // Return early if no data to process
    if (!data || data.length <= 1) {
      return res.status(400).json(
        createNewApiError({
          statusCode: 400,
          message: "No data found to process",
        })
      );
    }

    const successRows = [];
    const failRows = [];
    const remainingRows = [data[0]]; // Keep headers

    // Process each row
    for (let i = 1; i < data.length; i++) {
      const row = data[i];
      const email = row[0]; // assuming email is in the first column
      const hrName = row[1]; // assuming name is in the second column
      const companyName = row[2]; // assuming company name is in the third column
      const jobTitle = row[3]; // assuming job title is in the fourth column
      const jobType = row[4]; // assuming job type is in the fifth column

      // Skip rows with no email and log them
      if (!email) {
        logger.warn(`Skipping row ${i + 1}: No email address`);
        continue;
      }

      try {
        if (jobType?.toLowerCase() === "backend") {
          await mailService.sendBackendNew({
            to: email,
            details: {
              hrName,
              companyName,
              jobTitle,
            },
          });
        } else if (jobType?.toLowerCase() === "frontend") {
          await mailService.sendFrontendNew({
            to: email,
            details: {
              hrName,
              companyName,
              jobTitle,
            },
          });
        } else {
          await mailService.sendFullStackNew({
            to: email,
            details: {
              hrName,
              companyName,
              jobTitle,
            },
          });
        }

        row[4] = "Sent ✅"; // Update the status
        successRows.push(row);
      } catch (error) {
        logger.error(
          `Failed to send email to ${email} at row ${i + 1}: ${error.message}`
        );
        row[4] = "Failed ❌"; // Update the status
        failRows.push(row);
      }

      // Only keep processed rows in remainingRows
      if (row[4] !== "Sent ✅" && row[4] !== "Failed ❌") {
        remainingRows.push(row);
      }
    }

    // Batch update success and fail rows
    if (successRows.length > 0) {
      await googleSheetService.appendSheetData(
        spreadsheetId,
        successSheet,
        successRows
      );
    }

    if (failRows.length > 0) {
      await googleSheetService.appendSheetData(
        spreadsheetId,
        failSheet,
        failRows
      );
    }

    // If any rows remain unprocessed, update the sheet with them
    if (remainingRows.length > 1) {
      await googleSheetService.updateSheetData(
        spreadsheetId,
        sourceSheet,
        remainingRows
      );
    } else {
      // If all emails processed, clear the sheet but keep headers
      await googleSheetService.clearAndSetHeaders(
        spreadsheetId,
        sourceSheet,
        data[0]
      );
    }

    res.status(200).json(
      createNewApiResponse({
        success: true,
        message: "Emails processed and moved successfully",
        data: {
          successCount: successRows.length,
          failCount: failRows.length,
        },
        statusCode: 200,
      })
    );
  } catch (error) {
    console.error("Error in sendEmailsAndUpdateSheet:", error.message);
    res
      .status(500)
      .json(createNewApiError({ statusCode: 500, message: error.message }));
  }
});
