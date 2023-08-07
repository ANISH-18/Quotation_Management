import { createSlice } from "@reduxjs/toolkit";

export const productsSlice = createSlice({
    name:"products",
    initialState:[],
    reducers:{
        setProducts:(state,action)=>{
            state.splice(0,state.length);
            action.payload.forEach(element => {
                state.push(element);
            });
        }
    },
})
export const { setProducts } = productsSlice.actions;
export default productsSlice.reducer;