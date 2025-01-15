import { configureStore } from '@reduxjs/toolkit';
import sliceProducts from './getProductsSlice';
import basketSlice from './basketSlice';

export const store = configureStore({
    reducer: {
        products: sliceProducts,
        basketItems: basketSlice,
    },
});