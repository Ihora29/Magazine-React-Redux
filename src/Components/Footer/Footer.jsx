import { useState } from "react";
import styles from "../../styles/Footer.module.css"
import { NavLink } from "react-router-dom";



function Footer() {






    return (
        <div className={styles.footer}>

            <div className={styles.lastFoot}>
                <div className={styles.footAboutUs}>
                    <a href="#"> <img src="https://monosushi.com.ua/wp-content/uploads/2021/06/logo.svg" alt="" /></a>
                    <NavLink to="actions" href="#">Акції</NavLink >
                    <a href="#">Про нас</a>
                    <a href="#">Оферта</a>
                    <p className={styles.footDelivery}><b>Точки самовивозу</b>
                        <br />
                        вул. Володимира Великого, 10в
                        вул. Чорновола, 95
                        вул. Зелена 204б</p>
                    <p className={styles.footOrder}>Оформити замовлення
                        <br />
                        +380978780837</p>
                    <p className={styles.footWorkTime}>Працюємо з 11:00-23:00</p>
                </div>
                <div className={styles.siteFoot}>

                    <div><p>2024 Monosushi</p></div>

                    <div>
                        <img className={styles.payCards} src="https://monosushi.com.ua/wp-content/uploads/2020/10/pay-card-img-1.svg" alt="" />
                        <img className={styles.payCards} src="https://monosushi.com.ua/wp-content/uploads/2020/10/pay-card-img-2.svg" alt="" />
                        <img className={styles.payCards} src="https://monosushi.com.ua/wp-content/uploads/2020/10/pay-card-img-3.svg" alt="" />
                    </div>

                    <div className={styles.followUsFoot}>
                        <p className={styles.followText}>Follow us</p>
                        <a href="#" className={styles.foolowLink}>
                            <img className={styles.followImg} src="https://monosushi.com.ua/wp-content/uploads/2020/10/facebook-icon.svg" alt="" />
                        </a>
                        <a className={styles.foolowLink} href="#">
                            <img className={styles.followImg} src="https://monosushi.com.ua/wp-content/uploads/2020/10/instagram-icon.svg" alt="" />
                        </a>
                    </div>

                </div>
            </div>

        </div>
    )
}

export default Footer;