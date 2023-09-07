import {configureStore} from "@reduxjs/toolkit";
import homeReducer from "./slices/HomeSlice.js";

const store=configureStore({
    reducer:{
        home:homeReducer,
    }
})

export default store;