import React, { useEffect } from 'react'
import styles from "../styles/WeCall.module.css";

export const ThankYouPage = () => {
    useEffect(() => {
        console.log('hello Im ThankPage');

    })
    return (
        <>
            <div className={styles.thankYouContainer}>

                <h1 className={styles.thankYouH1Text}>Дякуємо за ваше повідомлення!</h1>
                <h6 className={styles.thankYouH6Text}>Ваше повідомлення успішно відправлено. Наші менеджери обов’язково зв’яжуться з вами</h6>
            </div>

        </>
    )
}
