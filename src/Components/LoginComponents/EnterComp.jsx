import React, { useEffect, useState } from "react";
import styles from "../../styles/EnterComp.module.css"
import LoginComp from "./LoginComp";
import img from "../../images/close-ellipse-svgrepo-com.svg"
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';



function EnterComp({ onClose }) {
    const dispatch = useDispatch();
    const [showLogin, setShowLogin] = useState(false);
    const [showEnter, setShowEnter] = useState(true);
    const [showErrorAuth, setShowErrorAuth] = useState(false)

    const [usersData, setUsersData] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001/users-login')
            .then(response => {
                setUsersData(response.data);
            });
    }, [])



    const { register, reset, watch,
        handleSubmit, formState: { errors } } = useForm();

    const showLoginComp = (e) => {
        e.stopPropagation()
        setShowLogin(!showLogin)
    };

    const navigate = useNavigate();

    const onSubmit = async (data) => {

        if (usersData) {
            const user = usersData.find(user => user.email === data.email && user.password === data.password);
            if (user) {
                localStorage.setItem('isUserAuth', JSON.stringify(user));
                navigate('/');
                onClose();
            }
            setShowErrorAuth(true);
        }


    };





    return (
        <>
            {showLogin ? <LoginComp onClose={onClose} /> : (<>
                <form className={styles.container}
                    onSubmit={handleSubmit(onSubmit)}
                    style={{ display: showEnter ? "flex" : "none" }}>

                    <div className={styles.headEnterCont}>
                        <span className={styles.nameContainer}>Увійти</span>
                        <button className={styles.closeBtn} onClick={onClose}>
                            <img className={styles.closeImg} src={img} alt="" />
                        </button>
                    </div>

                    <input className={styles.loginInput} type="email"
                        {...register('email', {
                            pattern: {

                                value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                                message: 'Введіть адресу коректно'
                            }, required: true
                        })
                        } required
                        id="" placeholder="Email" />
                    <p>{errors.email?.message}</p>
                    <input className={styles.loginInput} type="password" id=""
                        {...register('password', {
                            pattern: {
                                value: /^[A-Za-z\d]{6,}$/,
                                message: 'Введіть пароль не менше 6ти символів'
                            }, required: true
                        })} required
                        placeholder="Password" />
                    <p inert='true'>{errors.password?.message}</p>
                    {showErrorAuth ? <p>Ви не зареєстровані,зареєструватися?</p> : null}
                    <input type="submit" value='Увійти' className={styles.enterBtn} />
                    <div className={styles.footContainer}>

                        <span onClick={showLoginComp} className={styles.textLogin}>Login</span>
                    </div>

                </form>
            </>
            )}

        </>



    )
}

export default EnterComp;