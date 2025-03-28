import styles from "../../styles/Navbar.module.css"
import { Link } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import Hamburger from 'hamburger-react'
import EnterComp from "../LoginComponents/EnterComp.jsx"
import Basket from "./Basket.jsx";
import Backdrop from '@mui/material/Backdrop';
import WeCallComp from "./WeCallComp.jsx";
import zIndex from "@mui/material/styles/zIndex.js";
import { useCounts } from "../../logicFiles/useCounts.js";
// import zIndex from "@mui/material/styles/zIndex.js";


function NavbarComp({ cartItems = [] }) {
    const [isOpen, setOpen] = useState(false)

    const [openEnter, setOpenEnter] = useState(false)

    const handleClick = (e) => {
        e.stopPropagation()
        setOpenEnter(!openEnter);
    }

    function closeBackDrop() {
        setOpenEnter(false)
        setShowBasket(false)
        setShowPhoneComp(false)
    }


    const { orderPrice, setOrderPrice } = useCounts()

    const totalSum = cartItems.reduce((accumulator, item) => accumulator + item.price, 0);

    const [showBasket, setShowBasket] = useState(false);

    const checkBasket = () => {
        setShowBasket(!showBasket)
    }

    const [totalCount, setTotalCount] = useState(0)


    useEffect(() => {
        //   const totalCount = basketItems.reduce((accumulator, item) => accumulator + item.count, 0);
    })

    const [showPhoneComp, setShowPhoneComp] = useState(false)

    const openContact = () => {
        setShowPhoneComp(!showPhoneComp)

    }

    return (
        <>


            <div className={styles.headerPanel} style={{ zIndex: showBasket ? 9999 : null }}>

                <div className={styles.brand}>
                    <Link to="/"><img src="https://monosushi.com.ua/wp-content/uploads/2021/06/logo.svg" alt="" /></Link>
                </div>

                <div className={styles.productsPanel} >
                    <Link className={styles.productIcon} to="actions"><img src="https://monosushi.com.ua/wp-content/uploads/2020/10/nav-img-gift.svg" alt="" />
                        <span className={styles.nameIcon}>акції</span>
                    </Link>
                    <Link to="sushi" className={styles.productIcon} ><img src="https://monosushi.com.ua/wp-content/uploads/2020/10/nav-img-rolls.svg" alt="" />
                        <span className={styles.nameIcon}>роли</span>
                    </Link>
                    <Link to="moti" className={styles.productIcon} ><img src="https://monosushi.com.ua/wp-content/uploads/2024/04/moti.svg" alt="" />
                        <span className={styles.nameIcon}>моті</span>
                    </Link>
                    <Link to="sets" className={styles.productIcon} ><img src="https://monosushi.com.ua/wp-content/uploads/2020/10/nav-img-sets.svg" alt="" />
                        <span className={styles.nameIcon}>сети</span>
                    </Link>
                    <Link to="drinks" className={styles.productIcon} ><img src="https://monosushi.com.ua/wp-content/uploads/2020/10/nav-img-drinks.svg" alt="" />
                        <span className={styles.nameIcon}>напої</span>
                    </Link>
                </div>

                <div className={styles.hamburger}>
                    <Hamburger
                        toggled={isOpen} toggle={setOpen}
                    />
                    {isOpen ? <div className={styles.aboutUs}>
                        <div className={styles.infoAboutUs}>Оплата і доставка</div>
                        <div className={styles.infoAboutUs} id={styles.infoAboutUsID}>Про нас</div>
                    </div> : null}
                </div>

                {showPhoneComp ? <Backdrop sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
                    open={true}

                >
                    <WeCallComp onClose={closeBackDrop} />
                </Backdrop> : null}

                <div onClick={openContact} className={styles.phoneContact}>
                    <div className={styles.blockPhone}>
                        <img className={styles.phoneImg} src="https://monosushi.com.ua/wp-content/uploads/2020/10/phone.svg" alt="" ></img>
                        <span className={styles.weCall}>МИ ЗАТЕЛЕФОНУЄМО</span>
                    </div>
                </div>

                <div className={styles.workTime}>
                    <div><b>+380978780837</b></div>
                    <span>Працюємо з </span> <span>11:00-23:00</span>
                </div>

                <div onClick={handleClick} className={styles.userLogin}>
                    <img className={styles.userLogo} src="https://monosushi.com.ua/wp-content/themes/monosushi/img/user.svg" alt="" ></img>
                </div>

                {
                    openEnter ? <Backdrop
                        sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
                        open={true}
                    //onClick={closeBackDrop}
                    >
                        <EnterComp onClose={closeBackDrop} />
                    </Backdrop> : null
                }


                <div className={styles.basketContainer}>


                    <div onClick={checkBasket} style={showBasket ? { backgroundColor: "transparent" } : null} className={styles.packageBuy}>
                        <img className={styles.packageLogo} src="https://monosushi.com.ua/wp-content/themes/monosushi/img/basket.svg" alt="basket" ></img>
                        <span className={styles.totalPrice}>{orderPrice}hrn.</span>
                        <span className={styles.buyCount}>{orderPrice}</span>
                    </div>

                    <div style={showBasket ? { display: "block" } : { display: "none" }} className={styles.baketOpenCheck}></div>
                </div>

            </div>

            {
                showBasket ? (

                    <>
                        <Backdrop
                            sx={{ color: '#fff', zIndex: 999 }}
                            open={true}
                            onClick={closeBackDrop}
                        >
                            <Basket
                            // totalCount={totalCount} totalSum={totalSum}
                            />
                        </Backdrop>

                    </>

                ) : null
            }
        </>
    );
}

export default NavbarComp;
