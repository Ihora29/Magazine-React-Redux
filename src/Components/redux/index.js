import { configureStore } from '@reduxjs/toolkit';
import sliceProducts from './getProductsSlice';


export const store = configureStore({
    reducer: {
        products: sliceProducts,
    },
});