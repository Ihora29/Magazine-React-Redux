import React, { useEffect, useState } from 'react';
import NavbarComp from "./Navbar/NavbarComp";
import CardCarousel from "./CardCarousel";
import Delivery from "./Delivery";
import MenuNav from "./MenuNav";
import Footer from "./Footer/Footer";
import axios from 'axios';
import { Routes, Route } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Card from './ProductsCard/Card';
import CardMoti from "./ProductsCard/CardMoti";
import { Outlet } from 'react-router-dom';
import { Backdrop } from '@mui/material';
import styles from "../styles/ErrorPage.module.css";
import closeImg from "../images/close-ellipse-svgrepo-com.svg";

function AppLayout() {
    // console.log('Layout');
    const location = useLocation();
    const { state } = location || {};


    return (


        <>
            <NavbarComp />
            <Outlet />
            <Footer />
        </>

    )
}

export default AppLayout;