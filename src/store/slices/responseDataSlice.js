import { createSlice } from "@reduxjs/toolkit";

const responseDataSlice = createSlice({
    name: "responseData",
    initialState: {
        user: {
            id: " ",
            email: ' ',
            userName: ' '
        },
        token: " ",
        message: " ",
    },
    reducers: {
        setUserId(state, action) {
            state.user.id = action.payload;
        },
        setUserName(state, action) {
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
        }
    },
});

// Assuming you will export the actions and reducer
export const { setUserId, setUserName, setEmail, setToken, setMessage } = responseDataSlice.actions;
export default responseDataSlice.reducer;
