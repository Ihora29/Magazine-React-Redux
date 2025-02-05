import React, { useEffect, useState, useContext } from 'react'
import { NavLink, useLocation, Outlet, useParams } from "react-router-dom";
import styles from "../../styles/UserCabinet.module.css"
import { InputMask, useMask } from '@react-input/mask';
import { useForm } from "react-hook-form";
import axios from 'axios';
import { userData } from './UserCabinet';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export const ChangeUserName = () => {

    const location = useLocation();
    const { state } = location || {};

    const { id } = useParams();
    const [userEdit, setUserEdit] = useState({
        id: id,
        firstName: '',
        secondName: '',
        email: '',
        phone: '',
        password: ''
    });
    useEffect(() => {
        //setUserEdit(state)
        // console.log(id);
        axios.get('http://localhost:3001/users-login?id=' + id)
            .then(response => {
                //console.log(response.data[0]);
                const dataValue = response.data[0];
                setUserEdit({ ...userEdit, firstName: dataValue.firstName, secondName: dataValue.secondName, email: dataValue.email, phone: dataValue.phone, password: dataValue.passwordAgain });
                //  console.log(dataValue.password);
            })
            .catch(errors => console.log(errors)
            )


    }, []);
    console.log('userName', userEdit);


    const { register, reset, watch,
        handleSubmit, formState: { errors } } = useForm(
            {
                defaultValues: {
                    firstName: userEdit?.firstName || '',
                    secondName: userEdit?.secondName || '',
                    email: userEdit?.email || '',
                    phone: userEdit?.phone || ''
                },
            }
        );
    //   console.log(`http://localhost:3001/users-login/${id}`);

    useEffect(() => {
        console.log('render UserName');
        if (userEdit?.firstName && userEdit?.secondName && userEdit?.email) {
            reset({
                firstName: userEdit.firstName,
                secondName: userEdit.secondName,
                email: userEdit.email,
                phone: userEdit.phone,
            });
        }
    }, [userEdit, reset]);

    const navigate = useNavigate();

    const onSubmit = (data) => {
        const userData = {
            id: id,
            firstName: data.firstName,
            secondName: data.secondName,
            email: data.email,
            phone: data.phone,
            type: "login-user",
            password: userEdit.password
        }


        axios.patch(`http://localhost:3001/users-login/${id}`, userData
        )
            .then(response => console.log(response.data))
            .catch(error => {
                if (error.response) {
                    console.error('Status:', error.response.status);
                    console.error('Data:', error.response.data);
                } else {
                    console.error('Error:', error.message);
                }
            });
        if (data) {
            setUserEdit(userData)
            navigate(`/`, { state: { userData } })
        }

    }

    return (
        <div className={styles.changeNameBlock}>

            <div className={styles.userDataContainer}>
                <h1>Особисті дані</h1>
                <form className={styles.blockForm} onSubmit={handleSubmit(onSubmit)}>
                    <div className={styles.nameUserContainer}>

                        <input type="text" className={styles.inputNameParams} placeholder="Ваше ім'я"
                            //value={userEdit?.firstName || ''}
                            // onChange={handleChange}

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
                    <input className={styles.inputParms}
                        {...register('phone', {
                            required: "Введіть номер телефону",
                            pattern: {
                                value: /^380\d{9}$/,
                                message: 'Введіть коректний номер телефону 380XXXXXXXXX'
                            }
                        })}
                        onInput={(e) => e.target.value = e.target.value.replace(/\D/g, '')}
                        required placeholder="380XXXXXXXXX" />
                    <p>{errors.phone?.message}</p>

                    <input type="email"
                        //   defaultValue={}
                        className={styles.inputParms} placeholder='Email' id=""
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
