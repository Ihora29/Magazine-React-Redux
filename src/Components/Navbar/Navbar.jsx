import styles from "../../styles/Navbar.module.css"
import { BrowserRouter as Link } from "react-router-dom";
import React, { useState } from 'react';
import Hamburger from 'hamburger-react'


function NavbarComp() {
    const [isOpen, setOpen] = useState(false)

    function showInfo() {
        setOpen(!isOpen)

    }

    return (
        <div className={styles.headerPanel}>
            <div className={styles.brand}>
                <Link><img src="https://monosushi.com.ua/wp-content/uploads/2021/06/logo.svg" alt="" /></Link>
            </div>
            <div className={styles.productsPanel} >
                <Link to="#"><img src="https://monosushi.com.ua/wp-content/uploads/2020/10/nav-img-rolls.svg" alt="" /></Link>
                <Link to="#"><img src="https://monosushi.com.ua/wp-content/uploads/2024/04/moti.svg" alt="" /></Link>
                <Link to="#"><img src="https://monosushi.com.ua/wp-content/uploads/2020/10/nav-img-sets.svg" alt="" /></Link>
                <Link to="#"><img src="https://monosushi.com.ua/wp-content/uploads/2020/10/nav-img-drinks.svg" alt="" /></Link>
            </div>

            <div className={styles.hamburger}>
                <Hamburger onToggle={showInfo} />
                {isOpen ? <div className={styles.aboutUs}>Show Content</div> : null}
            </div>

            <div className={styles.phoneContact}>
                <div className={styles.blockPhone}>
                    
                    <img className={styles.phoneImg} src="https://monosushi.com.ua/wp-content/uploads/2020/10/phone.svg" alt="" data-pagespeed-url-hash="3217005976" onload="pagespeed.CriticalImages.checkImageForCriticality(this);" oncontextmenu="return false"></img>
                    <span className={styles.weCall}>МИ ЗАТЕЛЕФОНУЄМО</span>
                </div>
            </div>

            <div className={styles.workTime}>
                <h3>+380978780837</h3>
                <span>Працюємо з </span> <span>11:00-23:00</span>
            </div>

            <div className={styles.userLogin}>
                <img className={styles.userLogo} src="https://monosushi.com.ua/wp-content/themes/monosushi/img/user.svg" alt="" data-pagespeed-url-hash="1440881552" onload="pagespeed.CriticalImages.checkImageForCriticality(this);" oncontextmenu="return false"></img>
            </div>

            <div className={styles.packageBuy}>
                <img className={styles.packageLogo} src="https://monosushi.com.ua/wp-content/themes/monosushi/img/basket.svg" alt="basket" data-pagespeed-url-hash="1577746355" onload="pagespeed.CriticalImages.checkImageForCriticality(this);" oncontextmenu="return false"></img>
                <span className={styles.totalPrice}>0 hrn.</span>
                <span className={styles.buyCount}>0</span>
            </div>

        </div>

    );
}

export default NavbarComp;
