import React, { useEffect, useState } from 'react'
import styles from "../../styles/Navbar.module.css";
import { NavLink } from 'react-router-dom';
import { useLocation } from 'react-router-dom';





export const PopUpCabinet = ({ setShowCabinet }) => {

    const isAuthUser = localStorage.getItem('isUserAuth');

    useEffect(() => {

        console.log('popUpRender',);
    }, []);

    const handleLogOut = () => {

        localStorage.removeItem('isUserAuth')
        setShowCabinet(false);
    }

    const handleQuitIcon = () => {
        setShowCabinet(false);
    }

    return (
        <div className={styles.cabinetContainer}>
            <ul className={styles.ul_cabinet_list}>

                <li className={styles.itemListCabinet} onClick={handleQuitIcon}><NavLink
                    to={`/user-cabinet/${JSON.parse(isAuthUser).id}`}
                    className={styles.listLinkItem}>Особистий кабінет</NavLink></li>
                <li className={styles.itemListCabinet} onClick={handleQuitIcon}><NavLink
                    to={`/user-cabinet/${JSON.parse(isAuthUser).id}/orderhistory`}

                    className={styles.listLinkItem}>Історія покупок</NavLink></li>
                <li className={styles.itemListCabinet} onClick={handleQuitIcon}><NavLink
                    to={`/user-cabinet/${JSON.parse(isAuthUser).id}/changepass`}
                    className={styles.listLinkItem}>Змінити пароль</NavLink></li>
                <li className={styles.itemListCabinet}><button
                    onClick={handleLogOut}
                    className={styles.logOutBtn}>Вийти</button></li>
            </ul>
        </div>
    )
}
