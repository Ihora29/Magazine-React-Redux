import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import styles from '../../styles/ErrorPage.module.css'

export const OrderHistory = () => {
    const isUserAuth = localStorage.getItem('isUserAuth');
    const [orderItems, setOrderItems] = useState([])
    useEffect(() => {
        axios.get(`http://localhost:3001/users-login/${JSON.parse(isUserAuth).id}`)
            .then(response => {
                console.log(response.data);
                if (response.data.buyers) {
                    setOrderItems(response.data.buyers);
                }

            });


    }, [])

    console.log(orderItems);
    return (
        <>
            {orderItems.length > 0 ? <div className={styles.buyingContainer}>{orderItems.map((item, index) => (
                <li className={styles.buyedItemsLi} key={index}>
                    <div className={styles.buyedItemsName}>{item.name}</div> <span style={{ marginRight: '20px', fontWeight: 'bold', fontSize: '21px' }}>{item.totalCount}</span>
                </li>
            ))}</div> : <h2>У Вас ще не має замовлень, перейти до <NavLink to='/'><b>каталогу</b></NavLink> </h2>
            }
        </>
    )
}
