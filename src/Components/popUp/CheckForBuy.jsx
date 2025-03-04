import React, { useEffect } from 'react'
import styles from '../../styles/ErrorPage.module.css'
import { NavLink } from 'react-router-dom';



export const CheckForBuy = ({ orderItem, address, totalSum, clientDelivery }) => {
    useEffect(() => {
        console.log('totalSum', totalSum);
        console.log('orderItem', orderItem);
        console.log('address', address);
        console.log('clientDelivery', clientDelivery);


    }, [])

    return (
        <>
            <div className={styles.checkWrapper}>

                <h1 style={{ color: 'black' }}>Дякуємо за замовлення!</h1>
                <section className={styles.checkBody}>

                    {orderItem.map((item, index) => (

                        <li key={index} className={styles.buyingItem}><div className={styles.itemName}>{item.name}</div><div className={styles.itemCounts}><span style={{ marginLeft: '5px' }}>{item.totalCount}</span><span>{item.price * item.totalCount}<span style={{ fontSize: '12px' }}>грн</span></span></div></li>


                    ))}
                    <div className={styles.totalSumCont}>{totalSum} <span>грн.</span></div>

                </section>
                <div className={styles.iconCheck}>
                    <img src="https://monosushi.com.ua/wp-content/uploads/2020/10/mn-delivery-img.svg" className={styles.iconDeliver} alt="" />
                    <h6 className={styles.footerCheckH6}> Очікуйте на дзвінок.Кур'єр прямує до Вас!</h6>
                    <NavLink className={styles.checkBtn} to='/'>На головну</NavLink>
                </div>
            </div>
        </>
    )
}
