import { createSlice } from "@reduxjs/toolkit";

export const productcategoriesSlice = createSlice({
    name:"productcategories",
    initialState:[],
    reducers:{
        setProductCategories:(state,action)=>{
            state.splice(0,state.length);
            action.payload.forEach(element => {
                state.push(element);
            });
        }
    },
})
export const { setProductCategories } = productcategoriesSlice.actions;
export default productcategoriesSlice.reducer;