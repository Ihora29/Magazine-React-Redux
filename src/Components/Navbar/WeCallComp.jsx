import React, { useState } from 'react'
import styles from "../../styles/WeCall.module.css"
import img from "../../images/close-ellipse-svgrepo-com.svg"



export default function WeCallComp({ onClose }) {



    // function closeWeCallCont() {

    //     setShowWeCall(!showWeCall)
    // }


    return (
        <div className={styles.mainContainer}
        //    style={{ display: showWeCall ? "flex" : "none" }}
        >
            <p><b>МИ ЗАТЕЛЕФОНУЄМО</b><br />
                Залиште номер телефону і наші менеджери зв’яжуться з вами</p>
            <input className={styles.inputContact} type="text" placeholder='Ваше ім*я' />
            <input className={styles.inputContact} type="text" placeholder='Ваш номер телефону' />
            <button className={styles.closeBtn} onClick={onClose}>
                <img className={styles.closeImg} src={img} alt="" />
            </button>
            <button className={styles.btnContact}>Зв’яжіться</button>
        </div>
    )
}
