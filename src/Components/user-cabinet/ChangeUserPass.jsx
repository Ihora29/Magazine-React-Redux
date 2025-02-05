import React, { useEffect, useState } from 'react'
import { NavLink, useLocation, Link } from "react-router-dom";
import styles from "../../styles/UserCabinet.module.css"
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useParams } from 'react-router-dom';
export const ChangeUserPass = () => {
    //   const location = useLocation();
    //  const { state } = location || {};
    const { id } = useParams();
    const navigate = useNavigate();
    const [userPass, setUserPass] = useState({
        id: id,
        firstName: '',
        secondName: '',
        email: '',
        phone: '',
        password: '',
        passwordAgain: ''
    })
    useEffect(() => {
        //  console.log(id);

        axios.get('http://localhost:3001/users-login?id=' + id)
            .then(response => {
                //  console.log(response.data[0]);
                const dataValue = response.data[0];
                setUserPass({
                    ...userPass, password: dataValue.password, firstName: dataValue.firstName, secondName: dataValue.secondName,
                    email: dataValue.email, phone: dataValue.phone, passwordAgain: dataValue.password
                });
            })
            .catch(errors => console.log(errors)
            )
    }, [])
    // console.log('userPass', userPass);

    const { register, reset, watch,
        handleSubmit, formState: { errors } } = useForm(
            {
                defaultValues: {
                    password: userPass?.password || '',

                },
            }
        );

    const [passIdentError, setPassIdentError] = useState(false);
    const onSubmit = (data) => {
        if (data.passwordNew == data.passwordAgain) {
            setPassIdentError(false)
            axios.patch(`http://localhost:3001/users-login/${id}`, {
                id: id,
                firstName: userPass.firstName,
                secondName: userPass.secondName,
                phone: userPass.phone,
                email: userPass.email,
                type: "login-user",
                password: data.passwordAgain,
                passwordAgain: data.passwordAgain
            }
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

            navigate(`/`, { state: { userPass } })
        } else {
            setPassIdentError(true)
        }
        console.log(userPass);

    }
    const handleChange = (e) => {
        if (e.target.value != userPass.passwordNew) {
            setPassIdentError(true)
        }

    }

    useEffect(() => {
        console.log('render UserName');
        if (userPass?.password) {
            reset({
                password: userPass.password,
                // secondName: userEdit.secondName,
                // email: userEdit.email,
                // phone: userEdit.phone,
            });
        }
    }, [userPass, reset])




    return (
        <div className={styles.mainContainer}>


            <div className={styles.passContainer}>
                <h1 style={{ textAlign: 'center' }}>Зміна паролю </h1>
                <form className={styles.ChangePassForm} onSubmit={handleSubmit(onSubmit)}>
                    <input type="text" className={styles.inputNameParams}
                        {...register('password', {
                            pattern: {
                                // value: /^[a-zA-Zа-яА-Я]{2,20}$/,
                                message: 'Введіть пароль коректно'
                            }, required: true
                        })} required
                        placeholder='Ваш пароль' />
                    <input type="text"
                        {...register('passwordNew', {
                            pattern: {
                                // value: /^[a-zA-Zа-яА-Я]{2,20}$/,
                                message: 'Введіть пароль коректно'
                            }, required: true
                        })} required
                        className={styles.inputNameParams} placeholder='Новий пароль*' />

                    <input type="text" className={styles.inputNameParams}
                        {...register('passwordAgain', {
                            pattern: {
                                // value: /^[a-zA-Zа-яА-Я]{2,20}$/,
                                message: 'Введіть пароль коректно'
                            }, required: true
                        })} required
                        onChange={handleChange}
                        placeholder='Повторіть пароль*' />
                    {passIdentError ? <h6>coorectNewPass</h6> : null}
                    <div className={styles.saveButtonsGroup}>
                        <button className={styles.buttonsParamsStyle}>Скасувати</button>
                        <input type="submit" value='Зберегти зміни' className={styles.buttonsParamsStyle} />
                    </div>
                </form>


            </div>


        </div>
    )
}
