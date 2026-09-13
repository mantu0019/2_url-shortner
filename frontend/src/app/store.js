import { configureStore } from "@reduxjs/toolkit";
import url from "../feature/url/state/UrlSlice"
export const store = configureStore({
    reducer:{
        URL:url
    }
})