import { createSlice } from "@reduxjs/toolkit";

const loginSlicer = createSlice({
    name: "login",
    initialState:{
        isLogin:false,
        isRegistered:false,
        isError:false,
    },
    reducers: {
        setLogin(state, action) {
            state.isLogin= action.payload;
        },
        setRegistered(state,action){
            state.isRegistered= action.payload;  
        },
        setError(state,action){
            state.isError=action.payload;
        }
    },
});

export default loginSlicer.reducer;
export const {setLogin,setRegistered,setError } = loginSlicer.actions;
