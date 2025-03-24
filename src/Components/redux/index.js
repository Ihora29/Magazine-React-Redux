import { configureStore } from '@reduxjs/toolkit';
import sliceProducts from './getProductsSlice';
import basketSlice from './basketSlice';
import authSlice from './authSlice';
export const store = configureStore({
    reducer: {
        products: sliceProducts,
        basketItems: basketSlice,
        auth: authSlice,
    },
});