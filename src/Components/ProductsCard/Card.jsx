import React from 'react'
import NavbarComp from '../Navbar/NavbarComp'
import { NavLink, Outlet, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import styles from "../../styles/Item.module.css"
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { useCounts } from "../../logicFiles/useCounts";
import { CardFooter } from '../Footer/CardFooter';
import { useState } from 'react';
import { useEffect } from 'react';
export default function Card() {

    const { id } = useParams();

    const productsData = useSelector((state) => state.products.products);

    // const [localCount, setLocalCount] = useState(1);
    const allProducts = productsData
        .filter((item) => item)
        .reduce((acc, curr) => acc.concat(curr), []);


    const productsWithotDrinks = allProducts?.slice(0, 5)

    const { counts, increment, decrement, setCounts, localCount, setLocalCount, addToCart } = useCounts()

    const item = allProducts.find((item) => item.id === parseInt(id));

    // useEffect(() => {
    //     if (productsWithotDrinks && productsWithotDrinks.length > 0) {
    //         const initialCounts = productsWithotDrinks.map((item) => ({
    //             id: item.id,
    //             totalCount: 1,
    //         }));
    //         setTotalCount(initialCounts);
    //     }
    // }, []);
    const [arrayWithoutDrinks, setArrayWithoutDrinks] = useState(productsWithotDrinks);

    const drinkArray = productsData[2]?.slice(0, 2);
    const [drinkCount, setDrinkCount] = useState(drinkArray)


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
    }


    if (!item) {
        return <h1>Товар не знайдено</h1>;
    }

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
            breakpoint: { max: 1024, min: 464 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    }


    return (
        <>
            <div className={styles.container}>
                <img className={styles.itemIcon} src={item.imgSrc} alt={item.name} />
                <div className={styles.itemInfo}>


                    <h1>{item.name}</h1>
                    <span className={styles.itemDetails}>Склад:</span>   <span>{item.details}</span>
                    <div className={styles.detailsContainer}><span className={styles.itemDetails} >Вага:</span>   <span> {item.weight} </span></div>
                    <div className={styles.footContainer}>
                        <span className={styles.itemPrice}>{item.price} hrn.</span>
                        <div className={styles.orderCount}>
                            <button className={styles.btnOrder}
                                onClick={(e) => decrement(e)}
                            >-</button>
                            <span className={styles.count}>{localCount}</span>
                            <button className={styles.btnOrder}
                                onClick={(e) => increment(e)}
                            >+</button>
                        </div>
                        <button className={styles.btnBuy}
                            onClick={(e) => addToCart(item, localCount, e)}
                        >ЗАМОВИТИ</button>
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
                containerClass={styles.carouselContainer}
                removeArrowOnDeviceType={["tablet", "mobile", "desktop", "superLargeDesktop"]}
                dotListClass={styles.custom}
                itemClass={styles.carouselPadding}
            >
                {arrayWithoutDrinks.map((item) => {
                    const currentItem = arrayWithoutDrinks.find((count) => count.id === item.id) || { totalCount: 1 };
                    return (
                        <NavLink to={`/product/${item.id}`} key={item.id} className={styles.carouselItem}>
                            <img src={item.imgSrc} className={styles.itemImg} alt="" />
                            <h2 className={styles.nameProduct}>{item.name}</h2>
                            <div className={styles.itemOption}>{item.option}</div>
                            <div className={styles.aboutProduct}>
                                <p className={styles.itemProd}>{item.details}</p>
                                <span className={styles.weightProduct}> Вага:{item.weight}</span>
                            </div>
                            <div className={styles.footItem}>
                                <span className={styles.prodPrice}>{item.price * item.totalCount} hrn.</span>
                                <div className={styles.orderCount}>
                                    <button className={styles.btnOrder}
                                        onClick={(e) => handleDecrement(item.id, e)}
                                    >-</button>
                                    <span className={styles.count}>{item.totalCount}</span>
                                    <button className={styles.btnOrder} onClick={(e) => handleIncrement(item.id, e)}>+</button>
                                </div>
                                <button
                                    onClick={(e) => addToCart(item, currentItem.totalCount, e)}
                                    className={styles.btnBuyMini}>ЗАМОВИТИ</button>
                            </div>
                        </NavLink>
                    );
                })}
            </Carousel>


            <h1 className={styles.textAlso}>Смакує разом</h1>
            <div className={styles.drinksContainer}>
                {drinkCount.map((item) => {
                    const currentDrink = drinkCount.find((count) => count.id === item.id) || { totalCount: 1 };
                    return (
                        <NavLink key={item.id} className={styles.drink_Item}>
                            <img src={item.imgSrc} className={styles.drinkImg} alt="" />
                            <h2 className={styles.nameDrink}>{item.name}</h2>
                            <div className={styles.aboutProduct}>
                                <p className={styles.itemProd}>{item.details}</p>
                                <span className={styles.weightProduct}> Вага:{item.weight}</span>
                            </div>
                            <div className={styles.footDrink}>
                                <span className={styles.drinkPrice}>{item.price} hrn.</span>
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
                                    onClick={(e) => addToCart(item, currentDrink.totalCount, e)}
                                    className={styles.btnBuyDrink}>ЗАМОВИТИ</button>
                            </div>
                        </NavLink>
                    )
                }
                )}

            </div>

            <CardFooter />
        </>

    );

}
