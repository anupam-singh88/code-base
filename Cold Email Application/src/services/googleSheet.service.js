import { google } from "googleapis";
import dotenv from "dotenv";
import googleAuthData from "../googleAuth.js";

dotenv.config();

class GoogleSheetService {
  constructor() {
    this.auth = new google.auth.GoogleAuth({
      credentials: googleAuthData,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });
  }

  async init() {
    try {
      this.client = await this.auth.getClient();
      this.sheets = google.sheets({ version: "v4", auth: this.client });
    } catch (error) {
      console.error("Error initializing Google Sheets API client:", error);
      throw error;
    }
  }

  async getSheetData(spreadsheetId, range) {
    try {
      const response = await this.sheets.spreadsheets.values.get({
        spreadsheetId,
        range,
      });
      return response.data.values;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  }

  async appendSheetData(spreadsheetId, range, values) {
    try {
      const response = await this.sheets.spreadsheets.values.append({
        spreadsheetId,
        range,
        valueInputOption: "USER_ENTERED",
        resource: { values },
      });
      return response.data;
    } catch (error) {
      console.error("Error appending data:", error);
      throw error;
    }
  }

  async updateSheetData(spreadsheetId, range, values) {
    try {
      const response = await this.sheets.spreadsheets.values.update({
        spreadsheetId,
        range,
        valueInputOption: "RAW",
        resource: { values },
      });
      return response.data;
    } catch (error) {
      console.error("Error updating data:", error);
      throw error;
    }
  }

  async clearAndSetHeaders(spreadsheetId, sheetName, headers) {
    try {
      // Clear all data from the sheet
      await this.sheets.spreadsheets.values.clear({
        spreadsheetId,
        range: sheetName,
      });

      // Ensure headers are in the correct 2D array format
      const formattedHeaders = [headers]; // Wrap headers in an array to make it a 2D array

      // Re-add the headers
      await this.sheets.spreadsheets.values.update({
        spreadsheetId,
        range: sheetName,
        valueInputOption: "RAW",
        resource: { values: formattedHeaders },
      });

      return { success: true, message: "Sheet cleared and headers set" };
    } catch (error) {
      console.error("Error clearing and resetting headers:", error);
      throw error;
    }
  }
}

export default GoogleSheetService;
