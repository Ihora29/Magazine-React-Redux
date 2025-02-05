import React, { useEffect, useState } from 'react';
import NavbarComp from "./Navbar/NavbarComp";
import CardCarousel from "./CardCarousel";
import Delivery from "./Delivery";
import MenuNav from "./MenuNav";
import Footer from "./Footer/Footer";
import CardSets from "./ProductsCard/CardSets";
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
    const [isUserAuth, setIsUserAuth] = useState(false);
    useEffect(() => {
        console.log('Applayout');

    }, [])


    return (
        <>
            {/* <Backdrop sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
                open={showWorkPopUp ? true : false} >

                <div className={styles.workPopUp} style={showWorkPopUp ? { display: 'flex' } : { display: 'none' }}>
                    <img src={closeImg} className={styles.closePopUpPic} alt="" onClick={(e) => handleClosePopUp(e)} />
                    <img className={styles.popUpPic} src="https://monosushi.com.ua/wp-content/themes/monosushi/img/error-monosushi.svg" alt="" />
                    <h6 className={styles.popuph5}>Вибачте, але замовлення не доступні</h6>
                    <p><strong>Чекаємо</strong> на Вас щодня з <strong>11:00</strong> <strong>23:00</strong></p>
                </div>
            </Backdrop> */}
            <>
                <NavbarComp />
                <Outlet />
                <Footer />
            </>

        </>
    )
}

export default AppLayout;