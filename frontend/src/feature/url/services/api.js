import axios from "axios";

const apiInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const urlCreate = async ({ url }) => {
  try {
    const res = await apiInstance.post("/api/url/create", { url });
    return res.data;
  } catch (error) {
    console.log("something went wrong from service urlCreate", error);
    throw error;
  }
};

export const getShortUrl = async ({ shortId }) => {
  try {
    const res = await apiInstance.get(`/api/url/${shortId}`);
    return res.data;
  } catch (error) {
    console.log("something went wrong from service getShortUrl", error);
    throw error;
  }
};

export const getAnalytics = async ({ shortId }) => {
  try {
    const res = await apiInstance.get(`/api/url/get-analytics/${shortId}`);
    return res.data;
  } catch (error) {
    console.log("something went wrong from services getAnalytics", error);

    throw error;
  }
};
