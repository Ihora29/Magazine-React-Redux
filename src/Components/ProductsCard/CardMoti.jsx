import React, { useEffect, useState } from "react";
import styles from "../../styles/Card.module.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/getProductsSlice";
import { useCounts } from "../../logicFiles/useCounts";
import AboutMoti from "../Footer/AboutMoti";
import { NavLink } from "react-router-dom";

function CardMoti() {

    const productsData = useSelector((state) => state.products.products); //
    const moti = productsData[3];

    const { counts, increment, decrement, setCounts } = useCounts()

    useEffect(() => {
        if (moti) {
            const initialCounts = moti.map((item) => ({
                id: item.id,
                totalCount: 1,
            }));
            setCounts(initialCounts);
        }
    }, [moti]);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    return (
        <>
            <h1 className={styles.nameCard}>Моті</h1>

            <div className={styles.card}>
                {productsData && productsData.length > 0 ? (
                    moti.map((item) => {
                        const currentItem = counts.find((count) => count.id === item.id) || { totalCount: 1 };
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
                                    <span className={styles.prodPrice}>{item.price * currentItem.totalCount} hrn.</span>
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
                            </NavLink>
                        );
                    })
                ) : (
                    <h1>No products available</h1>
                )}
            </div>

            <AboutMoti />
        </>

    );
}

export default CardMoti;