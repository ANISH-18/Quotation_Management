import { createSlice } from "@reduxjs/toolkit";

export const dealerSlice = createSlice({
    name:"dealers",
    initialState:[],
    reducers:{
        setDealers:(state,action)=>{
            state.splice(0,state.length);
            action.payload.forEach(element => {
                state.push(element);
            });
        }
    },
})
export const { setDealers } = dealerSlice.actions;
export default dealerSlice.reducer;