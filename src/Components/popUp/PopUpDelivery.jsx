import React from 'react'
import { useMask } from '@react-input/mask';
import { useForm } from "react-hook-form";
import styles from '../../styles/MakeOrderPage.module.css'
import img from '../../images/close-ellipse-svgrepo-com.svg'
import { useState } from 'react';
export const PopUpDelivery = ({ handleCloseMessage, setShowHelpMessage }) => {

    const { register,
        handleSubmit,
        formState: { errors } } = useForm();

    const inputRef = useMask({
        mask: '+38 (0__) ___ __ __',
        showMask: false,
        replacement: { _: /\d/ },
    });

    const handleMusk = () => {
        inputRef.showMask = true;
    }



    const onSubmit = (data) => {
        const phoneValue = inputRef.current?.value;
        //   setUserCall({ ...data, phone: phoneValue });
        //console.log(userCall);

        if (data && phoneValue) {
            setShowHelpMessage(true)
            const mustHelp = { ...data, phone: phoneValue }
            console.log(mustHelp);

        } else {
            alert("Будь ласка, заповніть  поля!");
        }
    };


    return (
        <>
            <div className={styles.canHelpContainer}>
                <h6 className={styles.namePopUp}>У Вас виникли проблеми з замовленням?<br />
                    Ми можемо перетелефонувати
                </h6>
                <form className={styles.formBlock} onSubmit={handleSubmit(onSubmit)}>
                    <input className={styles.inputContact} type="text" placeholder='Ваше ім*я'
                        {...register('name', {
                            pattern: {
                                value: /^[a-zA-Zа-яА-Я]{2,20}$/,
                                message: 'Введіть ім*я коректно'
                            },
                            require: true
                        })} required
                    />
                    <p>{errors.name?.message}</p>
                    <input
                        ref={inputRef}
                        className={styles.inputContact}
                        onChange={() => handleMusk}
                        required placeholder='Ваш номер телефону'

                    />

                    <input type='submit' className={styles.btnContact} />
                </form>
                <img src={img} onClick={handleCloseMessage} className={styles.closeImg} alt="close" /></div>
        </>
    )
}
