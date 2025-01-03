import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/getProductsSlice";


const SaleAndBestProduct = () => {

    const productsData = useSelector((state) => state.products.products);
    const allProducts = productsData
        .filter((item) => item)
        .reduce((acc, curr) => acc.concat(curr), []);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    useEffect(() => {
        console.log(allProducts);

    }, [])

    return (
        <> <h1 style={{ marginTop: '200px' }}>Акційні пропозиції</h1>

        </>
    )
}


export default SaleAndBestProduct