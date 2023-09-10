import { createSlice } from "@reduxjs/toolkit";

const GetAllReportSlice = createSlice({
    name: "reports",
    initialState: {
        showAllData: false,
        createNewData:false,
    },
    reducers: {
        setShowReport(state, action) {
            state.showAllData = action.payload;
        },
        setCreateData(state,action){
           state.createNewData=action.payload;
        }
    },
});

export default GetAllReportSlice.reducer;
export const { setShowReport , setCreateData} = GetAllReportSlice.actions;