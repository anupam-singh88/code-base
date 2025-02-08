import { serverUrl } from "@/config";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  reviews: [],
  message: "",
};

export const addReview = createAsyncThunk(
  "/order/addReview",
  async (formdata, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${serverUrl}/api/shop/review/add`,
        formdata
      );
      return response.data;
    } catch (error) {
      // Return the error response from the API if available
      return rejectWithValue(error.response.data);
    }
  }
);


export const getReviews = createAsyncThunk("/order/getReviews", async (id) => {
  const response = await axios.get(
    `${serverUrl}/api/shop/review/${id}`
  );

  return response.data;
});

const reviewSlice = createSlice({
  name: "reviewSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getReviews.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getReviews.fulfilled, (state, action) => {
        state.isLoading = false;
        state.reviews = action.payload.data;
      })
      .addCase(getReviews.rejected, (state) => {
        state.isLoading = false;
        state.reviews = [];
      }).addCase(addReview.pending, (state) => {
        state.isLoading = true;
      }).addCase(addReview.fulfilled, (state, action) => {
        state.isLoading = false;
      }).addCase(addReview.rejected, (state, action) => {
        state.isLoading = false;
      });
  },
});

export default reviewSlice.reducer;
