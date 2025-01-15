import React, { useEffect } from 'react'
import CardCarousel from './CardCarousel'
import Delivery from './Delivery'
import MenuNav from './MenuNav'
import AllProductsCard from './ProductsCard/AllProductsCard'
import { Outlet } from 'react-router-dom'
import { useState } from 'react'
import About from './Footer/About'
import { CircularProgress } from '@mui/material'
import { Backdrop } from '@mui/material'
import styles from "../styles/ErrorPage.module.css";
import closeImg from "../images/close-ellipse-svgrepo-com.svg";

function MainPage() {

    const [loadingProgress, setLoadingProgress] = useState(false);
    const [workingTime, setWorkingTime] = useState(false);

    const date = new Date();

    const [showWorkPopUp, setShowWorkPopUp] = useState(false);

    const handleClosePopUp = (e) => {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        setShowWorkPopUp(false)
        console.log('work');
    }

    useEffect(() => {

        setTimeout(() => {
            setLoadingProgress(true)
        }, 2000);

        if (18 > date.getHours() < 11) {
            setWorkingTime(true)
        }
        //   console.log(date.getHours());

    },)


    return (
        <>
            <>
                <Backdrop sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
                    open={showWorkPopUp ? true : false} >

                    <div className={styles.workPopUp} style={showWorkPopUp ? { display: 'flex' } : { display: 'none' }}>
                        <img src={closeImg} className={styles.closePopUpPic} alt="" onClick={(e) => handleClosePopUp(e)} />
                        <img className={styles.popUpPic} src="https://monosushi.com.ua/wp-content/themes/monosushi/img/error-monosushi.svg" alt="" />
                        <h6 className={styles.popuph5}>Вибачте, але замовлення не доступні</h6>
                        <p><strong>Чекаємо</strong> на Вас щодня з <strong>11:00</strong> <strong>23:00</strong></p>
                    </div>
                </Backdrop>

                <h1 style={loadingProgress ? { display: 'flex', margin: '100px auto' } : { display: 'none' }}>Lox</h1>
            </>
            :
            <>
                <CardCarousel />
                <Delivery />
                <MenuNav />
                <AllProductsCard />
                <About />
            </>

        </>
    )

}

export default MainPage