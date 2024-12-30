import React, { useEffect, useState, useContext } from 'react'
import { NavLink, useLocation, Outlet } from "react-router-dom";
import styles from "../../styles/UserCabinet.module.css"
import { useMask } from '@react-input/mask';
import { useForm } from "react-hook-form";
import { useOutletContext } from 'react-router-dom';
import axios from 'axios';



export const ChangeUserName = () => {

    const location = useLocation();
    const { state } = location || {};
    // const { userEdit, setUserEdit, } = useState({});
    const [usersList, setUsersList] = useState([]);
    // const [userEdit, setUserEdit] = useState({});
    useEffect(() => {
        //setUserEdit(state)
        // axios.get('http://localhost:3001/users-login')
        //     .then(response => {

        //         setUsersList(response.data);
        //     });


        // if (usersList && usersList.length > 0 && state) {
        //     usersList.find((user) => user.email === state.email && user.phone === state.phone ? setUserEdit(state) : null)
        // }
        console.log('render UserName');
        console.log(state);

        //   console.log(userEdit);
    }, []);

    const inputRef = useMask({
        mask: '+38 (0__) ___ __ __',
        showMask: false,
        replacement: { _: /\d/ },


    });

    const handleMusk = () => {
        inputRef.showMask = true;

    }

    const { register,
        handleSubmit, formState: { errors } } = useForm();


    //  console.log(userEdit);

    const onSubmit = (data) => {
        const phoneNew = inputRef?.current.value;
        //  console.log(userLogin);

        // axios.patch(`http://localhost:3001/users-login/${userLogin.id}`, {
        //     firstName: data.firstName,
        //     secondName: data.secondName,
        //     email: data.email,
        //     phone: phoneNew,
        // })
        //     .then(response => console.log(response.data))

        ///   return setUserLogin({ ...data, id: userLogin.id, phone: phoneNew });
    }





    return (
        <div className={styles.changeNameBlock}>

            <div className={styles.userDataContainer}>
                <h1>Особисті дані</h1>
                <form className={styles.blockForm} onSubmit={handleSubmit(onSubmit)}>
                    <div className={styles.nameUserContainer}>
                        <input type="text" className={styles.inputNameParams} placeholder="Ваше ім'я" defaultValue={''}
                            {...register('firstName', {
                                pattern: {
                                    value: /^[a-zA-Zа-яА-Я]{2,20}$/,
                                    message: 'Введіть ім*я коректно'
                                }, required: true
                            })} required
                        />
                        <p>{errors.firstName?.message}</p>
                        <p>{errors.secondName?.message}</p>
                        <input type="text" className={styles.inputNameParams} placeholder="Ваше прізвище"
                            {...register('secondName', {
                                pattern: {
                                    value: /^[a-zA-Zа-яА-Я]{2,20}$/,
                                    message: 'Введіть прізвище коректно'
                                }, required: true
                            })} required
                        />
                    </div>
                    <input ref={inputRef} className={styles.inputParms} onChange={() => handleMusk} required placeholder='Ваш номер телефону' />

                    <input type="email" className={styles.inputParms} placeholder='Email' id=""
                        {...register('email', {
                            pattern: {

                                value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                                message: 'Введіть адресу коректно'
                            }, required: true
                        })
                        } required
                    />
                    <p>{errors.email?.message}</p>
                    <span style={{ margin: '0 auto' }}>Ваше день народження?</span>
                    <input type="date" className={styles.birthdayInput}{...register('birthdayUser')} name="" id="" />
                    <h2 style={{ margin: '10px auto 0' }}>Адреси</h2>
                    <div className={styles.adressContainer}>
                        <ul className={styles.adressListBlock}>
                            <li>Adress1</li>
                        </ul>
                        <div className={styles.saveButtonsGroup}>
                            <button className={styles.buttonsParamsStyle}>Додати адресу</button>
                            <input type='submit' value='Зберегти зміни' className={styles.buttonsParamsStyle} />
                        </div>
                    </div>
                </form>

            </div>


        </div>


    )
}
