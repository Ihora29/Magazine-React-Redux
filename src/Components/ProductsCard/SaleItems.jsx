
import React, { hasOwnProperty } from 'react';
import styles from "../../styles/Card.module.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, loadCartFromStorage } from "../redux/getProductsSlice";
import { NavLink } from "react-router-dom";
import { useCounts } from "../../logicFiles/useCounts";
import { useEffect } from 'react';

export const SaleItems = () => {

  const productsData = useSelector((state) => state.products.products);

  const allProducts = productsData
    .filter((item) => item)
    .reduce((acc, curr) => acc.concat(curr), []);

  const itemsWithOption = allProducts.filter(item => item.hasOwnProperty('option'));

  const { counts, increment, decrement, setCounts, addToCart, cartItems } = useCounts()

  useEffect(() => {
    const initialCounts = cartItems.map((item) => ({
      id: item.id,
      totalCount: 1,
    }));
    setCounts(initialCounts);
  }, [cartItems]);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);



  return (
    <>
      <h1 className={styles.nameOfBestItems}>Sale & Best</h1>
      <div className={styles.card}>
        {productsData && productsData.length > 0 ? (
          itemsWithOption.map((item) => {
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
                  <span className={styles.prodPrice}>
                    {item.price * currentItem.totalCount} hrn.
                  </span>
                  <div className={styles.orderCount}>
                    <button
                      className={styles.btnOrder}
                      onClick={(e) => decrement(item.id, e)}
                    >
                      -
                    </button>
                    <span className={styles.count}>{currentItem.totalCount}</span>
                    <button
                      className={styles.btnOrder}
                      onClick={(e) => increment(item.id, e)}
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={(e) => addToCart(item, currentItem.totalCount, e)}
                    className={styles.btnBuy}
                  >
                    ЗАМОВИТИ
                  </button>
                </div>
              </NavLink>
            );
          })
        ) : (
          <h1>No products available</h1>
        )}
      </div>
    </>
  )
}
