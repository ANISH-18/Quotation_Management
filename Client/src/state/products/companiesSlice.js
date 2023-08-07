import { createSlice } from "@reduxjs/toolkit";

export const companiesSlice = createSlice({
    name:"companies",
    initialState:[],
    reducers:{
        setCompanies:(state,action)=>{
            state.splice(0,state.length);
            action.payload.forEach(element => {
                state.push(element);
            });
        }
    },
})
export const { setCompanies, getCompanies } = companiesSlice.actions;
export default companiesSlice.reducer;