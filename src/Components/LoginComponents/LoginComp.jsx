import React, { useState } from "react";
import style from "../../styles/Login.module.css"
import img from "../../images/close-ellipse-svgrepo-com.svg"



function LoginComp() {

    const [closeLogin, setCloseLogin] = useState(true);

    function closeLoginComp() {
        setCloseLogin(!closeLogin)
    }


    return (
        <div className={style.loginCard} style={{ display: closeLogin ? "flex" : "none" }}>
            <div className={style.headRegistrCont}>
                <button onClick={closeLoginComp} className={style.closeBtn}>
                    <img className={style.closeImg} src={img} alt="" />
                </button>
                <span className={style.textRegister}>Зареєструватися</span>
            </div>

            <div className={style.nameBlok}>
                <input type="text" name="name" className={style.inputName} id="firstName" placeholder="First Name" />
                <input type="text" name="name" className={style.inputName} id="secondName" placeholder="Second Name" />
            </div>

            <input type="number" className={style.inputContacts} id="" placeholder="Phone" />
            <input type="email" className={style.inputContacts} placeholder="Email" />
            <div className={style.nameBlok}>
                <input type="password" className={style.inputPassword} name="" placeholder="Password" />
                <input type="password" className={style.inputPassword} placeholder="Password again" />
            </div>
            <div className={style.rulesContainer}>
                <input type="checkbox" name="" id="checkRules" />

                <label htmlFor="checkRules" className={style.agreeRules}> I agree with rules</label>
            </div>
            <button className={style.registerBtn}>Register</button>
        </div>
    )
}

export default LoginComp;