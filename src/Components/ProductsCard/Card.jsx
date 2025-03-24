import React from 'react'
import NavbarComp from '../Navbar/NavbarComp'
import { NavLink, Outlet, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import styles from "../../styles/Item.module.css"
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

import { CardFooter } from '../Footer/CardFooter';
import { useState } from 'react';
import { useEffect } from 'react';
import { addToBasket } from '../redux/basketSlice';
import { useDispatch } from 'react-redux';
import axios from 'axios';

export default function Card() {

    const { id } = useParams();


    const dispatch = useDispatch();



    // const productsData = useSelector((state) => state.products.products);
    // console.log(productsData);

    const [productsArr, setProductsArr] = useState([]);
    const [drinkCount, setDrinkCount] = useState([]);
    const [arrayWithoutDrinks, setArrayWithoutDrinks] = useState([]);

    const [localItem, setLocalItem] = useState({
        totalCount: 1
    });


    useEffect(() => {
        axios.get('http://localhost:3001/products').then((resp) => {
            const data = resp.data;
            setProductsArr(data);
        });

    }, [id]);

    const allProducts = productsArr?.filter((item) => item)
        .reduce((acc, curr) => acc.concat(curr), []);

    const item = allProducts?.find((item) => item.id === parseInt(id));

    useEffect(() => {
        const drinkArray = productsArr[2]?.slice(0, 2);
        const productsWithotDrinks = allProducts?.slice(0, 5);
        setLocalItem(item);
        setDrinkCount(drinkArray);
        setArrayWithoutDrinks(productsWithotDrinks);
    }, [productsArr]);


    const handleDecrement = (id, e) => {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }

        setArrayWithoutDrinks((arrayWithoutDrinks) => arrayWithoutDrinks.map((item) =>
            id === item.id ? { ...item, totalCount: item.totalCount - (item.totalCount > 1 ? 1 : 0) } : item
        )
        );

        setDrinkCount((drinkCount) => drinkCount.map((item) =>
            id === item.id ? { ...item, totalCount: item.totalCount - (item.totalCount > 1 ? 1 : 0) } : item
        )
        );
        // console.log(arrayWithoutDrinks);

    }

    const handleIncrement = (id, e) => {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        setArrayWithoutDrinks((arrayWithoutDrinks) => arrayWithoutDrinks.map((item) =>
            id === item.id ? { ...item, totalCount: item.totalCount + 1 } : item
        )
        );

        setDrinkCount((drinkCount) => drinkCount.map((item) =>
            id === item.id ? { ...item, totalCount: item.totalCount + 1 } : item
        )
        );
    };


    const localIncrese = () => {
        setLocalItem(prevCount => ({ ...prevCount, totalCount: prevCount.totalCount + 1 }))
        //   console.log(localItem);
    }

    const localDecrese = () => {
        setLocalItem(prevCount => ({ ...prevCount, totalCount: prevCount.totalCount - (prevCount.totalCount > 1 ? 1 : 0) }))

    };

    const handleAddBasket = (e, item) => {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        dispatch(addToBasket(item))
    };


    // if (!item) {
    //     return <h1>Товар не знайдено</h1>;
    // }

    const responsive = {
        superLargeDesktop: {

            breakpoint: { max: 4000, min: 3000 },
            items: 4,
            partialVisibilityGutter: 40
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 4
        },
        tablet: {
            breakpoint: { max: 1024, min: 768 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 768, min: 0 },
            items: 2
        }
    }


    return (
        <>
            <div className={styles.mainContainer}>
                <div className={styles.container}>
                    <img className={styles.itemIcon} src={localItem?.imgSrc} alt='prodName' />
                    <div className={styles.itemInfo}>
                        <h1 className={styles.localItemName}>{localItem?.name}</h1>
                        <span className={styles.itemDetails}>Склад:</span>   <span>{localItem?.details}</span>
                        <div className={styles.detailsContainer}><span className={styles.itemDetails} ><b>Вага:</b> </span>
                            <span style={{ fontSize: '20px' }} className={styles.localItemWeight}><b>{localItem?.weight}</b></span>
                        </div>
                        <div className={styles.footContainer}>
                            <span className={styles.itemPrice}>{localItem?.price} грн.</span>
                            <div className={styles.orderCount}>
                                <button className={styles.btnOrder}
                                    onClick={() => localDecrese()}
                                >-</button>
                                <span className={styles.count}>{localItem?.totalCount}</span>
                                <button className={styles.btnOrder}
                                    onClick={() => localIncrese()}
                                >+</button>
                            </div>
                            <button className={styles.btnBuy}
                                onClick={(e) => handleAddBasket(e, localItem)}
                            >ЗАМОВИТИ</button>
                        </div>
                    </div>
                </div>
            </div>

            <h1 className={styles.textAlso}>Спробуйте також</h1>
            <Carousel className={styles.Carousel} swipeable={true}
                draggable={false}
                showDots={true}
                responsive={responsive}
                ssr={true}
                infinite={true}
                autoPlay={true}
                autoPlaySpeed={4000}
                keyBoardControl={true}
                customTransition="all 1s"
                transitionDuration={1000}
                shouldBlockScroll={false}
                containerClass={styles.carouselContainer}
                removeArrowOnDeviceType={["tablet", "mobile", "desktop", "superLargeDesktop"]}
                dotListClass={styles.custom}
                itemClass={styles.carouselPadding}
            >
                {arrayWithoutDrinks?.map((item) => {
                    return (
                        <NavLink to={`/product/${item.id}`} key={item.id} className={styles.carouselItem}>
                            <img src={item.imgSrc} className={styles.itemImg} alt="" />
                            <h2 className={styles.nameProduct}>{item.name}</h2>
                            <div className={styles.itemOption}>{item.option}</div>
                            <div className={styles.aboutProduct}>
                                <p className={styles.itemProd}>{item.details}</p>
                                <span className={styles.weightProduct}> <b>Вага:</b>{item.weight}</span>
                            </div>
                            <div className={styles.footItem}>
                                <span className={styles.prodPrice}>{item.price * item.totalCount} грн.</span>
                                <div className={styles.orderCount}>
                                    <button className={styles.btnOrder}
                                        onClick={(e) => handleDecrement(item.id, e)}
                                    >-</button>
                                    <span className={styles.count}>{item.totalCount}</span>
                                    <button className={styles.btnOrder} onClick={(e) => handleIncrement(item.id, e)}>+</button>
                                </div>
                                <button
                                    onClick={(e) => handleAddBasket(e, item)}
                                    className={styles.btnBuyMini}>ЗАМОВИТИ</button>
                            </div>
                        </NavLink>
                    );
                })}
            </Carousel>


            <h1 className={styles.textAlso}>Смакує разом</h1>
            <div className={styles.drinksContainer}>
                {productsArr && productsArr.length > 0 ? (
                    drinkCount?.map((item) => {
                        return (
                            <NavLink to={`/product/${item.id}`} key={item.id} className={styles.drink_Item}>
                                <img src={item.imgSrc} className={styles.drinkImg} alt="" />
                                <h2 className={styles.nameDrink}>{item.name}</h2>
                                <div className={styles.aboutProduct}>
                                    <p className={styles.itemProd}>{item.details}</p>
                                    <span className={styles.weightProduct}> Вага:{item.weight}</span>
                                </div>
                                <div className={styles.footDrink}>
                                    <span className={styles.drinkPrice}>{item.price} грн.</span>
                                    <div className={styles.orderDrink}>
                                        <button className={styles.btnOrder}
                                            onClick={(e) => handleDecrement(item.id, e)}
                                        >-</button>
                                        <span className={styles.count}>{item.totalCount}</span>
                                        <button className={styles.btnOrder}
                                            onClick={(e) => handleIncrement(item.id, e)}
                                        >+</button>
                                    </div>
                                    <button
                                        onClick={(e) => handleAddBasket(e, item)}
                                        className={styles.btnBuyDrink}>ЗАМОВИТИ</button>
                                </div>
                            </NavLink>

                        )
                    }
                    )) : (<h1>No products available</h1>)}

            </div>

            <CardFooter />
        </>

    );

}
