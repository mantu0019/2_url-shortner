import { createSlice } from "@reduxjs/toolkit";
import { getAnalyticsUser, getShortUrlUser, urlCreateUser } from "./urlAction";
 
const urlSlice  = createSlice({
    name:"URL",
    initialState:{
        urlData:null,
          analyticsData: null,

        isLoading:false,
        error:null
    },
    extraReducers:(builder)=>{

   // url create user start here.....

    builder.addCase(urlCreateUser.pending,(state,action)=>{
         state.isLoading = true,
         state.error = null
    }).addCase(urlCreateUser.fulfilled,(state,action)=>{
        state.isLoading = false,
        state.urlData = action?.payload
    }).addCase(urlCreateUser.rejected,(state,action)=>{
        state.isLoading = false,
        state.error = action?.payload || "something went wrong"
    })
        //  getShortUrlUser start here...
    
    
    .addCase(getShortUrlUser.pending,(state,action)=>{
         
        state.isLoading = true,
        state.error = null
    }).addCase(getShortUrlUser.fulfilled,(state,action)=>{
        state.isLoading = false,
        state.error = null
    }).addCase(getShortUrlUser.rejected,(state,action)=>{
        state.isLoading  = false,
        state.error   = action?.payload ||"something went wrong"
    })

     // getAnalyticsUser start here.....
       .addCase(getAnalyticsUser.pending,(state,action)=>{
        state.isLoading = true,
        state.error = null
       }).addCase(getAnalyticsUser.fulfilled,(state,action)=>{
        state.isLoading = false
        state.analyticsData= action?.payload
 
       }).addCase(getAnalyticsUser.rejected,(state,action)=>{
        state.isLoading = false,
        state.error = action?.payload || "something went wrong"
       })


    }
})

export default urlSlice.reducer;