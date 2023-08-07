import { configureStore } from '@reduxjs/toolkit'
import productsReducer from './products/productsSlice';
import companiesReducer from './products/companiesSlice';
import productcategoriesReducer from './products/productcategoriesSlice';
import dealersReducer from './products/dealerslice';

export default configureStore({
  reducer: {
    products:productsReducer,
    companies:companiesReducer,
    productcategories:productcategoriesReducer,
    dealers:dealersReducer
  },
})