import React, { useEffect, useState } from "react";
import styles from "../../styles/Card.module.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/getProductsSlice";
import { useCounts } from "../../logicFiles/useCounts";
import { AboutSushi } from "../Footer/AboutSushi";
import { NavLink } from "react-router-dom";
function CardSushi() {

    const productsData = useSelector((state) => state.products.products); //
    const sushi = productsData[0]


    const { counts, increment, decrement, setCounts } = useCounts()

    useEffect(() => {
        if (sushi) {
            const initialCounts = sushi.map((item) => ({
                id: item.id,
                totalCount: 1,
            }));
            setCounts(initialCounts);
        }
    }, [sushi]);


    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    return (
        <>
            <h1 className={styles.nameCard}>Суші</h1>
            <div className={styles.card}>
                {productsData && productsData.length > 0 ? (
                    sushi.map((item) => {
                        const currentItem = counts.find((count) => count.id === item.id) || { totalCount: 0 };
                        return (
                            <NavLink to={`/product/${item.id}`} key={item.id} className={styles.productItem}>
                                <img src={item.imgSrc} className={styles.itemIcon} alt="" />
                                <h2 className={styles.nameProduct}>{item.name}</h2>
                                <div className={styles.itemOption}>{item.option}</div>
                                <div className={styles.aboutProduct}>
                                    <p className={styles.itemProd}>{item.details}</p>
                                    <span className={styles.weightProduct}> Вага: {item.weight}</span>
                                </div>

                                <div className={styles.footItem}>
                                    <span className={styles.prodPrice}>{item.price * currentItem.totalCount} грн.</span>
                                    <div className={styles.orderCount}>
                                        <button className={styles.btnOrder}
                                            onClick={(e) => decrement(item.id, e)}
                                        >-</button>
                                        <span className={styles.count}>{currentItem.totalCount}</span>
                                        <button className={styles.btnOrder}
                                            onClick={(e) => increment(item.id, e)}
                                        >+</button>
                                    </div>
                                    <button className={styles.btnBuy}>ЗАМОВИТИ</button>
                                </div>
                            </NavLink >
                        );
                    })
                ) : (
                    <h1>No products available</h1>
                )}
            </div>

            <AboutSushi />
        </>

    );
}

export default CardSushi;