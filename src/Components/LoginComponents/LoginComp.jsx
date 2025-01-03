import React, { useState } from "react";
import styles from "../../styles/Login.module.css"
import img from "../../images/close-ellipse-svgrepo-com.svg"
import { useMask } from '@react-input/mask';
import { useForm } from "react-hook-form";


function LoginComp({ onClose }) {

    const [closeLogin, setCloseLogin] = useState(true);

    function closeLoginComp() {
        setCloseLogin(!closeLogin)
    };

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

    const onSubmit = (data) => {
        const userPhone = inputRef?.current.value;
        console.log(data);

    }

    return (
        <div className={styles.loginCard} style={{ display: closeLogin ? "flex" : "none" }}>
            <div className={styles.headRegistrCont}>
                <button onClick={onClose} aria-hidden={false} className={styles.closeBtn}>
                    <img className={styles.closeImg} src={img} alt="" />
                </button>
                <span className={styles.textRegister}>Створіть кабінет</span>
            </div>
            <form className={styles.loginForm} onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.nameBlok}>
                    <input type="text" className={styles.inputName} aria-hidden={false} id="firstName" placeholder="Ваше ім'я "
                        {...register('firstName', {
                            pattern: {
                                value: /^[a-zA-Zа-яА-Я]{2,20}$/,
                                message: 'Введіть ім*я коректно'
                            }, required: true
                        })} required
                    />
                    <input type="text" className={styles.inputName} aria-hidden={false} id="secondName" placeholder="Ваше прізвище"
                        {...register('secondName', {
                            pattern: {
                                value: /^[a-zA-Zа-яА-Я]{2,20}$/,
                                message: 'Введіть прізвище коректно'
                            }, required: true
                        })} required
                    />
                </div>
                <p>{errors.firstName?.message}</p>
                <p>{errors.secondName?.message}</p>
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
                <p>{errors.email?.message}</p>
                <div className={styles.nameBlok}>
                    <input type="password" className={styles.inputPassword} aria-hidden={false} name="" placeholder="Пароль"
                        {...register('password', {

                            pattern: {

                                value: /^[^A-Za-z0-9]{6,}$/,
                                message: 'Введіть пароль не менше 6 символів',
                            }, required: true
                        })
                        } required
                    />

                    <input type="password" className={styles.inputPassword} aria-hidden={false} placeholder="Пароль знову"
                        {...register('passwordAgain', {

                            pattern: {

                                value: /^[^A-Za-z0-9]{6,}$/,
                                message: 'Повторіть пароль не менше 6 символів',
                            }, required: true
                        })
                        } required
                    />
                </div>
                <p>{errors.password?.message}</p>
                <p>{errors.passwordAgain?.message}</p>

                <div className={styles.rulesContainer}>
                    <input type="checkbox" aria-hidden={false} name="" id="checkRules" required />

                    <label htmlFor="checkRules" style={{ marginLeft: '10px' }} className={styles.agreeRules}>Я погоджуюсь з умовами та правилами</label>
                </div>
                <input className={styles.registerBtn} aria-hidden={false} type="submit" value='зареєструватися' />
            </form>


        </div>
    )
}

export default LoginComp;