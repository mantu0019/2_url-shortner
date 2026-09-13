import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAnalytics, getShortUrl, urlCreate } from "../services/api";

export const urlCreateUser = createAsyncThunk(
  "api/url/create",
  async (userData, thunkAPI) => {
    try {
      const res = await urlCreate(userData);
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || "something went wrong",
      );
    }
  },
);



export const getShortUrlUser = createAsyncThunk("/api/url/getShort",async(userData,thunkAPI)=>{
    try {
        const res  = await getShortUrl(userData);
        return res;
    } catch (error) {
        return thunkAPI.rejectWithValue(error?.response?.data?.message||"something went wrong")
    }
});



export const getAnalyticsUser = createAsyncThunk("/api/url/getAnalytics",async(userData,thunkAPI)=>{
    try {
         const res  = await getAnalytics(userData);
         return res
    } catch (error) {
    return thunkAPI.rejectWithValue(error?.response?.data?.message||"something went wrong")
    }
})


