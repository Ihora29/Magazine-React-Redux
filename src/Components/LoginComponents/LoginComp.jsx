import React, { useState } from "react";
import styles from "../../styles/Login.module.css"
import img from "../../images/close-ellipse-svgrepo-com.svg"
import { useMask } from '@react-input/mask';
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { UserCabinet } from "../user-cabinet/UserCabinet";
import { useEffect } from "react";
import axios from "axios";

function LoginComp({ onClose }) {

    const [closeLogin, setCloseLogin] = useState(true);

    function closeLoginComp() {
        setCloseLogin(!closeLogin)
    };

    const inputRef = useMask({
        mask: '380_________',
        showMask: false,
        replacement: { _: /\d/ },
    });

    const handleMusk = () => {
        inputRef.showMask = true;
    };

    const { register,
        handleSubmit, formState: { errors } } = useForm();

    const navigate = useNavigate();

    const [usersList, setUsersList] = useState([]);
    useEffect(() => {
        //setUserEdit(state);
        axios.get('http://localhost:3001/users-login')
            .then(response => {

                setUsersList(response.data);
            });
    }, []);

    const [showPassError, setShowpassError] = useState(false);

    const onSubmit = async (data) => {
        const userPhone = inputRef?.current.value;

        if (data.password == data.passwordAgain) {
            const user = { ...data, id: parseInt(usersList.length + 1).toString(), type: "login-user", phone: userPhone }
            setShowpassError(false);

            axios.post('http://localhost:3001/users-login', user)
                .then(res => {
                    //console.log(res);
                    if (res.data) {
                        navigate(`user-cabinet/${user.id}`, { state: { user } });
                        console.log(res.data);

                    };

                });

            closeLoginComp()
            onClose()
        }
        else {
            setShowpassError(true);
        }


    }
    return (
        <div className={styles.loginCard} style={{ display: closeLogin ? "flex" : "none" }}>
            <div className={styles.headRegistrCont}>
                <button onClick={onClose} aria-hidden={false} className={styles.closeBtn}>
                    <img inert='true' className={styles.closeImg} src={img} alt="" />
                </button>
                <span inert='true' className={styles.textRegister}>Створіть кабінет</span>
            </div>

            <form className={styles.loginForm} onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.nameBlok}>
                    <input type="text" className={styles.inputName} aria-hidden={false} id="firstName" placeholder="Ваше ім'я "
                        {...register('firstName', {
                            pattern: {
                                value: /^[a-zA-Zа-яА-ЯёЁіІїЇєЄґҐ]{2,20}$/,
                                message: 'Введіть ім*я коректно'
                            }, required: true
                        })} required
                    />
                    <input type="text" className={styles.inputName} aria-hidden={false} id="secondName" placeholder="Ваше прізвище"
                        {...register('secondName', {
                            pattern: {
                                value: /^[a-zA-Zа-яА-ЯёЁіІїЇєЄґҐ]{2,20}$/,
                                message: 'Введіть прізвище коректно'
                            }, required: true
                        })} required
                    />
                </div>
                <p inert='true'>{errors.firstName?.message}</p>
                <p inert='true'>{errors.secondName?.message}</p>
                <input className={styles.inputContacts} aria-hidden={false} placeholder="Ваш номер телефону"
                    ref={inputRef} onChange={() => handleMusk} required />

                <input type="email" className={styles.inputContacts} aria-hidden={false} placeholder="Email"
                    {...register('email', {
                        pattern: {

                            value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                            message: 'Введіть адресу коректно'
                        }, required: true
                    })
                    } required />
                <p inert='true'>{errors.email?.message}</p>

                <div className={styles.nameBlok}>
                    <input type="password" className={styles.inputPassword} aria-hidden={false} placeholder="Пароль"
                        {...register('password', {
                            // minLength: 6,
                            pattern: {

                                value: /^[A-Za-z\d]{6,}$/,
                                message: 'Введіть пароль не менше 6 символів',
                            },
                            //required: true
                        })
                        }
                        required
                    />

                    <input type="password" className={styles.inputPassword} onChange={() => { setShowpassError(true) }} aria-hidden={false} placeholder="Пароль знову"
                        {...register('passwordAgain', {

                            pattern: {
                                value: /^[A-Za-z\d]{6,}$/,
                                message: 'Повторіть пароль не менше 6 символів',
                            },
                            //required: true
                        })

                        }
                        required
                    />

                </div>
                <p inert='true'>{errors.password?.message}</p>
                <p inert='true'>{errors.passwordAgain?.message}</p>
                {showPassError ? <p>Паролі не співпадають</p> : null}
                <p>{errors.password?.message}</p>
                <p>{errors.passwordAgain?.message}</p>

                <div className={styles.rulesContainer}>
                    <input type="checkbox" aria-hidden={false} name="" id="checkRules" required />

                    <label htmlFor="checkRules" iner="true" style={{ marginLeft: '10px' }} className={styles.agreeRules}>Я погоджуюсь з умовами та правилами</label>
                </div>
                <input className={styles.registerBtn} type="submit" value='зареєструватися' />
            </form>


        </div>
    )
}

export default LoginComp;