
import React, { useEffect, useState } from 'react'
import styles from "../styles/MakeOrderPage.module.css";
import { useCounts } from '../logicFiles/useCounts';
import img from "../images/close-ellipse-svgrepo-com.svg"
import { NavLink } from 'react-router-dom';
import imgTrash from '../images/reshot-icon-trash-2ZNJ9PUBQL.svg';
import { useMask } from '@react-input/mask';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from './redux/getProductsSlice';
import { useLocation } from 'react-router-dom';

export const MakeOrderPage = () => {

    const basket = useSelector((state) => state.basketItems.basketItems);

    const [canHelpPopUp, setCanHelpPopUp] = useState(false);

    const [showHelpMessage, setShowHelpMessage] = useState(false);

    const handleCloseMessage = () => {
        setShowHelpMessage(!showHelpMessage);
        console.log('+');

    }

    const handleDelete = (id, e) => {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }


    }

    const [showContainerDelivery, setShowContainerDelivery] = useState(false)
    const [checkSum, setCheckSum] = useState(0);

    useEffect(() => {



    }, [])

    const inputRef = useMask({
        mask: '+38 (0__) ___ __ __',
        showMask: false,
        replacement: { _: /\d/ },

    });

    const handleMusk = () => {
        inputRef.showMask = true;

    }

    const { register,
        handleSubmit,
        formState: { errors } } = useForm()

    const [userCall, setUserCall] = useState({ name: '', phone: '' });



    const onSubmit = (data) => {
        const phoneValue = inputRef.current?.value;
        //   setUserCall({ ...data, phone: phoneValue });
        //console.log(userCall);

        if (data && phoneValue) {
            setShowHelpMessage(true)
            const mustHelp = { ...data, phone: phoneValue }
            console.log(mustHelp);

        } else {
            alert("Будь ласка, заповніть  поля!");
        }
    }


    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    const productsData = useSelector((state) => state.products.products);



    return (

        <>


            {Array.isArray(basket) && basket.length > 0 ?
                <div style={showHelpMessage ? { display: 'none' }
                    : { display: 'flex' }} className={styles.canHelpContainer}>
                    <h6 className={styles.namePopUp}>У Вас виникли проблеми з замовленням?<br />
                        Ми можемо перетелефонувати
                    </h6>
                    <form className={styles.formBlock} onSubmit={handleSubmit(onSubmit)}>
                        <input className={styles.inputContact} type="text" placeholder='Ваше ім*я'
                            {...register('name', {
                                pattern: {
                                    value: /^[a-zA-Zа-яА-Я]{2,20}$/,
                                    message: 'Введіть ім*я коректно'
                                },
                                require: true
                            })} required
                        />
                        <p>{errors.name?.message}</p>
                        <input
                            ref={inputRef}
                            className={styles.inputContact}
                            onChange={() => handleMusk}
                            required placeholder='Ваш номер телефону'

                        />

                        <input type='submit' className={styles.btnContact} />
                    </form>
                    <img src={img} onClick={handleCloseMessage} className={styles.closeImg} alt="close" /></div>
                : null
            }
            <div className={styles.makeOrderContainer}>
                <h1 className={styles.MakeOrdertext}>Оформити замовлення</h1>
                <div className={styles.itemsContainer}>
                    {basket.length > 0 ? basket.map((item) => {

                        return (<li key={item.id} className={styles.itemContainer}>
                            <img className={styles.orderPictire} src={item.pic} alt="" />
                            <div className={styles.orderName}>{item.name}</div>
                            <span className={styles.trashAndCounContainer}>
                                <img className={styles.trashOrder} src={imgTrash} alt="trash" />
                                <div className={styles.orderCount} >
                                    <button className={styles.btnOrder} aria-hidden='false'
                                    // onClick={(e) => decrement(item.id, e)}
                                    >-</button>
                                    <span className={styles.count}
                                    >{item.totalCount}</span>
                                    <button className={styles.btnOrder} aria-hidden='false'
                                    // onClick={(e) => increment(item.id, e)}
                                    >+</button>
                                </div>
                            </span>

                        </li>
                        )

                    }) : <div className={styles.emptyContainer}>
                        <h5>Немає в корзині продуктів</h5>
                        <NavLink to='/' className={styles.menuLink}>  <img className={styles.emptyPicLink} src="https://monosushi.com.ua/wp-content/themes/monosushi/img/icons/cart-empty-img.svg" alt="" /> </NavLink>
                        <span className={styles.textClickOnMe}>Клікни на мене,щоб обрати <b>МЕНЮ</b>!</span>

                    </div>}

                </div>


                <h4>Може солоденького?</h4>

                <div style={{ margin: '20px auto' }}>

                    {productsData[3]?.map((item, index) => index < 1 ? <NavLink className={styles.motiContainer} to={`/product/${item.id}`} key={index}>
                        <img className={styles.motiPicture} src={item.imgSrc} alt="" />
                        <h4>{item.name}</h4>
                        <span className={styles.motiPrice}><b> {item.price}</b>  грн.</span>
                    </NavLink> : null)}

                </div>

                <div>

                    <div className={styles.formOrderPromo} style={showContainerDelivery ? { display: 'flex' } : { display: 'none' }}>

                        <div className={styles.salesContainer}>
                            <div className={styles.promoKode}>
                                <input className={styles.promoInput} type="text" placeholder='Введіть промокод' />
                                <button className={styles.promoButton}>Застосувати</button>
                            </div>
                            <select name="" className={styles.selectSale} id="">
                                <option value="#">Оберіть акцію</option>
                                <option value="3+1">3+1</option>
                                <option value="3+1">Рол тижня</option>
                                <option value="3+1">Самовивіз</option>
                                <option value="3+1">День Народження!</option>
                            </select>
                        </div>

                        <div style={{ display: 'flex', margin: '20px  0 0 10px' }}>
                            <div className={styles.numberBox}><b>1.</b></div> <span className={styles.choosePribory}>Оберіть прибори</span>
                        </div>
                        <div className={styles.salesSelectsContainer}>
                            <select name="" className={styles.selectSales} id="">
                                <option value="#">Кількість приборів</option>
                                <option value="3+1">1</option>
                                <option value="3+1">3</option>
                                <option value="3+1">5</option>
                            </select>
                            <select name="" className={styles.selectSales} id="">
                                <option value="#">Навчальні тримачі</option>
                                <option value="3+1">1</option>
                                <option value="3+1">2</option>
                            </select>
                        </div>

                        <form action="" className={styles.formOrder}>
                            <div style={{ display: 'flex', margin: '20px  0 0 10px' }}>
                                <div className={styles.numberBox}><b>2.</b></div> <span className={styles.choosePribory}>Спосіб оплати</span>
                            </div>

                            <div className={styles.checkBoxesContainer}>
                                <div className={styles.checkContainer}>
                                    <input type="checkbox" /> <span style={{ fontSize: '18px' }}><b>Оплата готівкою</b></span>
                                </div>
                                <div className={styles.checkContainer}>
                                    <input type="checkbox" /> <span style={{ fontSize: '18px' }}><b>Оплата карткою</b></span>
                                </div>
                            </div>

                            <div style={{ display: 'flex', margin: '20px  0 0 10px' }}>
                                <div className={styles.numberBox}><b>3.</b></div> <span className={styles.choosePribory}>Спосіб доставки</span>
                            </div>
                            <div className={styles.checkBoxesContainer}>
                                <div >
                                    <input type="checkbox" /> <span style={{ fontSize: '18px' }}>Доставка (У зв’язку із відключенням світла, якщо ліфт не працює кур’єр піднімається тільки до п’ятого поверху. Дякуємо за розуміння)</span>
                                </div>

                            </div>

                            <div className={styles.deliveryBoxesContainer}>
                                <div className={styles.checkDeliveryContainer}>
                                    <input type="checkbox" /> <span style={{ fontSize: '18px', marginLeft: '5px' }}><b>Самовивіз</b></span>
                                </div>
                                <div className={styles.checkDeliveryContainer}>
                                    <input type="checkbox" /> <span style={{ fontSize: '18px', marginLeft: '5px' }}><b>Заздалегідь</b></span>
                                </div>
                            </div>

                            <div className={styles.homeContainer}>

                                <div className={styles.deliveryPlaceContainer}>
                                    <input className={styles.homeInput} type="text" placeholder='Ваше ім*я' />
                                    <input className={styles.homeInput} type="text" placeholder='Вулиця' />
                                    <input className={styles.homeInput} type="text" placeholder='Під*їзд' />
                                </div>

                                <div className={styles.deliveryPlaceContainer}>
                                    <input className={styles.homeInput} type="text" placeholder='Ваш номер телефону' />
                                    <input className={styles.homeInput} type="text" placeholder='Номер будинку' />
                                    <input className={styles.homeInput} type="text" placeholder='Квартира' />
                                </div>
                            </div>

                            <div style={{ margin: '20px auto' }}>
                                <input style={{ marginRight: '10px' }} type="checkbox" /><span style={{ fontSize: '18px' }}><b>Домофон не працює</b></span>
                            </div>


                            <div className={styles.mapContainer}>
                                <h5>Map</h5>
                            </div>

                            <div className={styles.detailsContainer}>
                                <div>
                                    <input style={{ marginRight: '10px' }} type="checkbox" /><span style={{ fontSize: '18px' }}>Зателефонуйте мені для уточнення деталей</span>
                                </div>
                                <div>
                                    <input style={{ marginRight: '10px' }} type="checkbox" /><span style={{ fontSize: '18px' }}>Додати коментар</span>
                                </div>
                            </div>

                            <NavLink to='#' className={styles.orderMadeBtn}>Оформити замовлення</NavLink>

                        </form>



                    </div>

                </div>

            </div>
        </>

    )
}
