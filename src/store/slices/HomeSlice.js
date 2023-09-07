import { createSlice } from "@reduxjs/toolkit";

const homeSlice = createSlice({
    name: "home",
    initialState: {
        isMapVisible: true,
        isInfoVisible: false,
        isLogged: false
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
        }
    },
});

export default homeSlice.reducer;
export const { setMapStatus, setInfoStatus, setLoggedStatus } = homeSlice.actions;
