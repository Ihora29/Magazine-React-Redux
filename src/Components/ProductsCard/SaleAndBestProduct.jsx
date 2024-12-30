import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/getProductsSlice";


const SaleAndBestProduct = () => {

    const productsData = useSelector((state) => state.products.products); //


    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);



    return (
        <> <h1>Акційні пропозиції</h1>

        </>
    )
}


export default SaleAndBestProduct