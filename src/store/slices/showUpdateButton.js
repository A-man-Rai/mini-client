import { createSlice } from "@reduxjs/toolkit";

const showUpdateButton=createSlice({
name:"updateButton",
initialState:{
    updateButton:false,
    updateId:" "
},
reducers:{
    setUpdateButton(state,action){
        state.updateButton=action.payload;
    },
    setUpdateId(state,action){
    state.updateId=action.payload
     }
}
})

export const { setUpdateButton ,setUpdateId} = showUpdateButton.actions;

export default showUpdateButton.reducer;