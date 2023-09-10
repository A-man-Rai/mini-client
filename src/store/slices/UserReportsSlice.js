import { createSlice } from "@reduxjs/toolkit";

const UserReportsSlice=createSlice({
name:"userReports",
initialState:[],
reducers:{
    setArray(state,action){
        return action.payload;
    },
    setDeleteElement(state,action){
        const idToDelete = action.payload;
        return state.filter(report => report._id !== idToDelete);
    },
    updateReport(state, action) {
        const index = state.findIndex(report => report._id === action.payload._id);
        if (index !== -1) {
            state[index] = action.payload;
        }
    }

}
})

export const { setArray ,setDeleteElement,updateReport} = UserReportsSlice.actions;

export default UserReportsSlice.reducer;