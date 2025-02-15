import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ItineraryState, ItineraryRequest } from "../types/ItineraryTypes";

const API_URL = "http://127.0.0.1:8000/generate-itinerary/";

export const fetchItinerary = createAsyncThunk(
  "itinerary/fetchItinerary",
  async ({ city, interests }: ItineraryRequest) => {
    const response = await axios.post(API_URL, { city, interests });
    return response.data;
  }
);

const initialState: ItineraryState = {
  city: "",
  interests: [],
  itinerary: "",
  status: "idle",
  error: null,
};

const itinerarySlice = createSlice({
  name: "itinerary",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchItinerary.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchItinerary.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.city = action.payload.city;
        state.interests = action.payload.interests;
        state.itinerary = action.payload.itinerary;
      })
      .addCase(fetchItinerary.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Something went wrong";
      });
  },
});

export default itinerarySlice.reducer;
