import React, { useEffect, useState } from 'react';
import NavbarComp from "./Navbar/NavbarComp";
import CardCarousel from "./CardCarousel";
import Delivery from "./Delivery";
import MenuNav from "./MenuNav";
import Footer from "./Footer/Footer";
import CardSets from "./ProductsCard/CardSets";
import { Routes, Route } from 'react-router-dom';
import CardSushi from "./ProductsCard/CardSushi";
import AllProductsCard from "./ProductsCard/AllProductsCard";
import LoginComp from "./LoginComponents/LoginComp";
import EmterComp from "./LoginComponents/EnterComp";
import CardDrinks from "./ProductsCard/CardDrinks";
import Card from './ProductsCard/Card';
import CardMoti from "./ProductsCard/CardMoti";
import { Outlet } from 'react-router-dom';


function AppLayout() {



    return (
        <>

            <>
                <NavbarComp />
                <Outlet />
                <Footer />
            </>
            {/* 
            <NavbarComp cartItems={cartItems} />
            <CardCarousel />
            <Delivery />
           
            <AllProductsCard onAddToCart={handleAddToCart} />
            <Routes>
                <Route path="/product/:id" element={<Card />} />
            
            </Routes>
            <Footer /> */}
        </>
    )
}

export default AppLayout;