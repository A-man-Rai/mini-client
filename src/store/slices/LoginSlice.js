import { createSlice } from "@reduxjs/toolkit";

const loginSlicer = createSlice({
    name: "login",
    initialState:{
        isLogin:false,
        isRegistered:false,
    },
    reducers: {
        setLogin(state, action) {
            state.isLogin= action.payload;
        },
        setRegistered(state,action){
            state.isRegistered= action.payload;  
        }
    },
});

export default loginSlicer.reducer;
export const {setLogin,setRegistered } = loginSlicer.actions;
