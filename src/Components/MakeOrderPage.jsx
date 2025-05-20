
import React, { useEffect, useState } from 'react'
import styles from "../styles/MakeOrderPage.module.css";
import { json, NavLink } from 'react-router-dom';
import imgTrash from '../images/reshot-icon-trash-2ZNJ9PUBQL.svg';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from './redux/getProductsSlice';
import { useLocation } from 'react-router-dom';
import { removeFromBasket } from './redux/basketSlice';
import Map from './map/Map';
import { PopUpDelivery } from './popUp/PopUpDelivery';
import { useForm } from 'react-hook-form';
import { useMask } from '@react-input/mask';
import { CheckForBuy } from './popUp/CheckForBuy';
import { Backdrop } from '@mui/material';
export const MakeOrderPage = () => {

    const basket = useSelector((state) => state.basketItems.basketItems);
    const isUserAuth = localStorage.getItem('isUserAuth');
    const [address, setAddress] = useState('Львів, Україна');


    const [clientDelivery, setClientDelivery] = useState({});
    const [showCheck, setShowCheck] = useState(false);
    // const navigate = useNavigate()

    const onSubmit = async (data) => {
        const phoneValue = inputRef.current?.value;
        const userDeliver = { ...data, phone: phoneValue }
        setClientDelivery(userDeliver)
        if (orderItem.length > 0) {
            setShowCheck(true);
            try {
                const response = await fetch(`http://localhost:3001/users-login/${JSON.parse(isUserAuth).id}`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ buyers: orderItem }),
                });
            }
            catch (error) {
                console.error("Помилка:", error);
            }
        }



        //navigate('/client-check')

    };

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    const productsData = useSelector((state) => state.products.products);

    const [showHelpMessage, setShowHelpMessage] = useState(true);

    const handleCloseMessage = () => {
        setShowHelpMessage(false);


    };

    const { register,
        handleSubmit,
        watch } = useForm();

    const inputRef = useMask({
        mask: '+38 (0__) ___ __ __',
        showMask: false,
        replacement: { _: /\d/ },
    });

    const handleMusk = () => {
        inputRef.showMask = true;
    }

    // const location = useLocation();
    // const { state } = location;

    const handleDelete = (e, item) => {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        dispatch(removeFromBasket(item))

    };

    const [orderItem, setOrderItem] = useState([]);

    useEffect(() => {
        setOrderItem(basket)

    }, [basket]);

    const [totalSum, setTotalSum] = useState(0);

    useEffect(() => {
        const totalSumRes = orderItem.reduce((accumulator, item) => accumulator + item.price * item.totalCount, 0);
        setTotalSum(totalSumRes);
        if (orderItem.length == 0) {
            setTotalSum(0)
        };


    }, [orderItem]);

    const handleIncrese = (e, item_id) => {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        setOrderItem(
            orderItem.map(item => {
                if (item_id === item.id) {
                    return { ...item, totalCount: item.totalCount + 1 }
                }
                else {
                    return item
                }
            })
        )
    };

    const handleDecrese = (e, item_id) => {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        setOrderItem(
            orderItem.map(item => {
                if (item_id === item.id) {
                    return { ...item, totalCount: item.totalCount - (item.totalCount > 1 ? 1 : 0) }
                }
                else {
                    return item
                }
            })

        )
    };



    return (

        <>

            <div>
                {Array.isArray(basket) && basket.length > 0 && showHelpMessage ?
                    <> <PopUpDelivery handleCloseMessage={handleCloseMessage} setShowHelpMessage={setShowHelpMessage} /></>
                    : null
                }
                <div className={styles.makeOrderContainer}>
                    <h1 className={styles.MakeOrdertext}>Оформити замовлення</h1>
                    <div className={styles.itemsContainer}>
                        {basket.length > 0 ? orderItem.map((item) => {

                            return (<li key={item.id} className={styles.itemContainer}>
                                <img className={styles.orderPictire} src={item.imgSrc} alt="item name" />
                                <div className={styles.orderName}>{item.name}</div>
                                <span className={styles.trashAndCounContainer}>
                                    <img className={styles.trashOrder} src={imgTrash} onClick={(e) => handleDelete(e, item)} alt="trash" />
                                    <div className={styles.orderCount} >
                                        <button className={styles.btnOrder} aria-hidden='false'
                                            onClick={(e) => handleDecrese(e, item.id)}
                                        >-</button>
                                        <span className={styles.count}
                                        >{item.totalCount}</span>
                                        <button className={styles.btnOrder} aria-hidden='false'
                                            onClick={(e) => handleIncrese(e, item.id)}
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
                        <div style={orderItem.length > 0 ? { display: 'flex' } : { display: 'none' }} className={styles.totalContainer}>
                            <span className={styles.totalTextSum}>Загальна сума: </span> <span
                                style={{ paddingBottom: '3px', fontSize: '23px' }}><b>{totalSum}</b> </span> <span style={{ paddingTop: '3px' }}>грн.</span>
                        </div>
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

                        <div className={styles.formOrderPromo} >

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

                            <form onSubmit={handleSubmit(onSubmit)} action="" className={styles.formOrder}>
                                <div style={{ display: 'flex', margin: '20px  0 0 10px' }}>
                                    <div className={styles.numberBox}><b>2.</b></div> <span className={styles.choosePribory}>Спосіб оплати</span>
                                </div>

                                <div className={styles.checkBoxesContainer}>
                                    <div className={styles.checkContainer}>
                                        <input   {...register("payCash")}


                                            type="checkbox" /> <span style={{ fontSize: '18px' }}><b>Оплата готівкою</b></span>
                                    </div>
                                    <div className={styles.checkContainer}>
                                        <input type="checkbox"   {...register("payPall")}


                                        /> <span style={{ fontSize: '18px' }}><b>Оплата карткою</b></span>
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
                                        <input type="checkbox" {...register('deliverySamov ')} /> <span style={{ fontSize: '18px', marginLeft: '5px' }}><b>Самовивіз</b></span>
                                    </div>
                                    <div className={styles.checkDeliveryContainer}>
                                        <input type="checkbox" {...register('deliveryZazd ')} /> <span style={{ fontSize: '18px', marginLeft: '5px' }}><b>Заздалегідь</b></span>
                                    </div>
                                </div>

                                <div className={styles.homeContainer}>

                                    <div className={styles.deliveryPlaceContainer}>
                                        <input className={styles.homeInput} type="text" {...register('name')} required placeholder='Ваше ім*я' />
                                        <input className={styles.homeInput} type="text" {...register('street')} required placeholder='Вулиця' />
                                        <input className={styles.homeInput} type="text" {...register('entrance', {
                                            pattern: {
                                                value: /^\d+$/,
                                            }
                                        }
                                        )} placeholder='Під*їзд' />
                                    </div>

                                    <div className={styles.deliveryPlaceContainer}>
                                        <input className={styles.homeInput} type="text" ref={inputRef}
                                            onChange={() => handleMusk} placeholder='Ваш номер телефону' required />
                                        <input className={styles.homeInput} type="text" {...register('house', {
                                            pattern: {
                                                value: /^\d+$/,
                                            }
                                        })} required placeholder='Номер будинку' />
                                        <input className={styles.homeInput} type="text" {...register('apartment', {
                                            pattern: {
                                                value: /^\d+$/,
                                            }
                                        })} placeholder='Квартира' />
                                    </div>
                                </div>

                                <div style={{ margin: '20px auto' }}>
                                    <input style={{ marginRight: '10px' }} type="checkbox" /><span style={{ fontSize: '18px' }}><b>Домофон не працює</b></span>
                                </div>


                                <div className={styles.mapContainer}>
                                    <Map address={address} setAddress={setAddress} />
                                </div>

                                <div className={styles.detailsContainer}>
                                    <div>
                                        <input style={{ marginRight: '10px' }} type="checkbox" required /><span style={{ fontSize: '18px' }}>Зателефонуйте мені для уточнення деталей</span>
                                    </div>
                                    <div>
                                        <input style={{ marginRight: '10px' }} {...register('addComment')} type="checkbox" /><span style={{ fontSize: '18px' }}>Додати коментар</span>
                                    </div>
                                </div>


                                <input className={styles.orderMadeBtn} value='Оформити замовлення' type="submit" />

                            </form>
                        </div>

                    </div>
                    {showCheck && <Backdrop sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
                        open={true}>
                        <CheckForBuy orderItem={orderItem} address={address} totalSum={totalSum} clientDelivery={clientDelivery} />
                    </Backdrop>}
                </div>
            </div>


        </>

    )
}
