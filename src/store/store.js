import {configureStore} from "@reduxjs/toolkit";
import homeReducer from "./slices/HomeSlice.js";
import loginReducer from "./slices/LoginSlice.js"
const store=configureStore({
    reducer:{
        home:homeReducer,
        login:loginReducer
    }
})

export default store;