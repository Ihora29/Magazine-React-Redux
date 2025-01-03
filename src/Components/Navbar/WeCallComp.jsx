import React, { useState } from 'react'
import styles from "../../styles/WeCall.module.css"
import img from "../../images/close-ellipse-svgrepo-com.svg"
import { useMask } from '@react-input/mask';
import { useForm } from "react-hook-form";


export default function WeCallComp({ onClose }) {

    const inputRef = useMask({
        mask: '+38 (0__) ___ __ __',
        showMask: false,
        replacement: { _: /\d/ },
    });

    const handleMusk = () => {
        inputRef.showMask = true;
    };

    const { register,
        handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        const phoneNew = inputRef?.current.value;
        const clientCall = { ...data, phone: phoneNew }
        console.log(clientCall);

    }



    return (
        <div className={styles.mainContainer}
        //    style={{ display: showWeCall ? "flex" : "none" }}
        >
            <p><b>МИ ЗАТЕЛЕФОНУЄМО</b><br />
                Залиште номер телефону і наші менеджери зв’яжуться з вами</p>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.weCallForm}>

                <input className={styles.inputContact} type="text" placeholder="Ваше ім'я"
                    {...register('firstName', {
                        pattern: {
                            value: /^[a-zA-Zа-яА-Я]{2,20}$/,
                            message: 'Введіть ім*я коректно'
                        }, required: true
                    })} required
                />
                <input className={styles.inputContact}
                    ref={inputRef}
                    onChange={() => handleMusk}
                    required type="text" placeholder='Ваш номер телефону' />
                <input className={styles.btnContact} type="submit" value='Зв’яжіться' />
            </form>

            <button className={styles.closeBtn} aria-hidden={false} onClick={onClose}>
                <img className={styles.closeImg} src={img} alt="" />
            </button>

        </div>
    )
}
