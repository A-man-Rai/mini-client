import {configureStore} from "@reduxjs/toolkit";
import homeReducer from "./slices/HomeSlice.js";
import loginReducer from "./slices/LoginSlice.js"
import responseReducer from "./slices/responseDataSlice.js"
import getAllReportDataReducer from "./slices/GetAllReportSlice.js"
const store=configureStore({
    reducer:{
        home:homeReducer,
        login:loginReducer,
        responseData:responseReducer,
        getAllReportData:getAllReportDataReducer
    }
})

export default store;