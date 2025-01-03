import React, { useState } from "react";
import styles from "../../styles/EnterComp.module.css"
import LoginComp from "./LoginComp";
import img from "../../images/close-ellipse-svgrepo-com.svg"

function EnterComp({ onClose }) {

    const [showLogin, setShowLogin] = useState(false);
    const [showEnter, setShowEnter] = useState(true);

    // function closeEnterCont() {

    //     setShowEnter(!showEnter)
    // }

    const showLoginComp = (e) => {
        e.stopPropagation()
        setShowLogin(!showLogin)
    }

    return (
        <>
            {showLogin ? <LoginComp onClose={onClose} /> : (<>
                <div className={styles.container} style={{ display: showEnter ? "flex" : "none" }}>

                    <div className={styles.headEnterCont}>
                        <span className={styles.nameContainer}>Увійти</span>
                        <button className={styles.closeBtn} onClick={onClose}>
                            <img className={styles.closeImg} src={img} alt="" />
                        </button>
                    </div>

                    <input className={styles.loginInput} type="email" id="" placeholder="Email" />
                    <input className={styles.loginInput} type="password" id="" placeholder="Password" />
                    <button className={styles.enterBtn}>Увійти</button>
                    <div className={styles.footContainer}>
                        <span className={styles.textForgot}>Forgot password?</span>
                        <span onClick={showLoginComp} className={styles.textLogin}>Login</span>
                    </div></div>
            </>
            )}

        </>



    )
}

export default EnterComp;