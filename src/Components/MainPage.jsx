import React from 'react'
import CardCarousel from './CardCarousel'
import Delivery from './Delivery'
import MenuNav from './MenuNav'
import AllProductsCard from './ProductsCard/AllProductsCard'
import { Outlet } from 'react-router-dom'
import { useState } from 'react'
import About from './Footer/About'

function MainPage() {


    const [cartItems, setCartItems] = useState([]);
    const handleAddToCart = (product) => {
        setCartItems((prevItems) => [...prevItems, product]);
    };

    return (
        <>
            <CardCarousel />
            <Delivery />
            <MenuNav />
            <AllProductsCard
                onAddToCart={handleAddToCart}
            />
            <About />
        </>
    )
}

export default MainPage