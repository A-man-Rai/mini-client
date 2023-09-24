import { createSlice } from "@reduxjs/toolkit";

const adminLoginSlice = createSlice({
    name: "adminLogin",
    initialState: {
        user: {
            id: " ",
            email: ' ',
            userName: ' '
        },
        token:" ",
        message:" ",
        isLogin:false,
        data:[],
        showMapData:true,
        showUsersData:false,
        showReportsData:false,
    },
    reducers: {
        setAdminId(state, action) {
            state.user.id = action.payload;
        },
        setAdminName(state, action) {
            state.user.userName = action.payload; 
        },
        setEmail(state, action) {
            state.user.email = action.payload; 
        },
        setToken(state, action) {
            state.token = action.payload; 
        },
        setMessage(state, action) {
            state.message = action.payload; 
        },
        setLogin(state,action){
           state.isLogin= action.payload;
        },
        setData(state,action){
            state.data= action.payload;
         },
         setShowMapData(state,action){
            state.showMapData= action.payload;
         },
         setShowUserData(state,action){
            state.showUsersData= action.payload;
         },
         setShowReportsData(state,action){
            state.showReportsData= action.payload;
         },
    },
});


export const { setShowReportsData,setShowUserData,setShowMapData,setAdminId, setAdminName, setEmail, setToken, setMessage,setLogin,setData } = adminLoginSlice.actions;
export default adminLoginSlice.reducer;
