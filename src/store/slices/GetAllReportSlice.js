import { createSlice } from "@reduxjs/toolkit";

const GetAllReportSlice = createSlice({
    name: "reports",
    initialState: {
        showAllData: false,
    },
    reducers: {
        setShowReport(state, action) {
            state.showAllData = action.payload;
        }
    },
});

export default GetAllReportSlice.reducer;
export const { setShowReport } = GetAllReportSlice.actions;