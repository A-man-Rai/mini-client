import { createSlice } from "@reduxjs/toolkit";

const loginSlicer = createSlice({
    name: "login",
    initialState:{
        isLogin:false,
        isRegistered:false,
        isError:false,
        isNotify:false,
        latitude:"",
        longitude:""
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
        },
        setNotify(state,action){
            state.isNotify=action.payload;
        },
        setLatitude(state,action){
            state.latitude=action.payload;
       },
       setLongitude(state,action){
          state.longitude=action.payload;
       }
    },
});

export default loginSlicer.reducer;
export const {setLogin,setRegistered,setError ,setNotify,setLatitude,setLongitude} = loginSlicer.actions;
