import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import styles from '../../styles/ErrorPage.module.css'

export const OrderHistory = () => {
    const isUserAuth = localStorage.getItem('isUserAuth') ? JSON.parse(localStorage.getItem('isUserAuth')) : null;

    const [orderItems, setOrderItems] = useState([])
    useEffect(() => {
        if (isUserAuth && isUserAuth.id) {
            axios.get(`http://localhost:3001/users-login/${isUserAuth.id}`)
                .then(response => {

                    if (response.data.buyers) {
                        setOrderItems(response.data.buyers);
                    }
                })
                .catch(error => console.error("Помилка завантаження історії замовлень:", error));
        }
    }, []);



    return (
        <>
            {orderItems && orderItems.length > 0 ? <div className={styles.buyingContainer}>{orderItems.map((item, index) => (
                <li className={styles.buyedItemsLi} key={index}>
                    <div className={styles.buyedItemsName}>{item.name}</div> <span style={{ marginRight: '20px', fontWeight: 'bold', fontSize: '21px' }}>{item.totalCount}</span>
                </li>
            ))}</div> : <h2>У Вас ще не має замовлень, перейти до <NavLink to='/'><b>каталогу</b></NavLink> </h2>
            }
        </>
    )
}
