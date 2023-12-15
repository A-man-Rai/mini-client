import { createSlice } from "@reduxjs/toolkit";

const homeSlice = createSlice({
    name: "home",
    initialState: {
        isMapVisible: true,
        isInfoVisible: false,
        isLogged: false,
        getDataById:{}
    },
    reducers: {
        setMapStatus(state, action) {
            state.isMapVisible = action.payload;
        },
        setInfoStatus(state, action) {
            state.isInfoVisible = action.payload;
        },
        setLoggedStatus(state, action) {
            state.isLogged = action.payload;
        },
        setData(state,action){
            state.getDataById=action.payload;
        }
    },
});

export default homeSlice.reducer;
export const { setMapStatus, setInfoStatus, setLoggedStatus,setData } = homeSlice.actions;
