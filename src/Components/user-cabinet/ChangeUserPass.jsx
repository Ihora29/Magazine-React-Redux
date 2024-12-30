import React, { useEffect, useState } from 'react'
import { NavLink, useLocation, Link } from "react-router-dom";
import styles from "../../styles/UserCabinet.module.css"
import { useForm } from "react-hook-form";
import { useOutletContext } from 'react-router-dom';

export const ChangeUserPass = () => {
    const location = useLocation();
    const { state } = location || {};
    /// const { userLogin, setUserLogin, usersEdit, setUsersEdit } = useOutletContext();
    useEffect(() => {
        console.log('chamgePass render');

    }, [])

    useEffect(() => {
        // usersEdit.find((item) => item.password == userLogin.password ? setUserLogin(item) : {})

    }, []);

    const [newPass, setNewPass] = useState('');


    return (
        <div className={styles.mainContainer}>


            <div className={styles.passContainer}>
                <h1 style={{ textAlign: 'center' }}>Зміна паролю </h1>
                <form className={styles.ChangePassForm}>
                    <input type="text" className={styles.inputNameParams} placeholder='Ваш пароль*' />
                    <input type="text" className={styles.inputNameParams} placeholder='Новий пароль*' />
                    <input type="text" className={styles.inputNameParams} placeholder='Повторіть пароль*' />
                    <div className={styles.saveButtonsGroup}>
                        <button className={styles.buttonsParamsStyle}>Скасувати</button>
                        <input type="submit" value='Зберегти зміни' className={styles.buttonsParamsStyle} />
                    </div>
                </form>


            </div>


        </div>
    )
}
