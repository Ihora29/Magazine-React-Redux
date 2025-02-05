
import React, { hasOwnProperty, useState } from 'react';
import styles from "../../styles/Card.module.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, loadCartFromStorage } from "../redux/getProductsSlice";
import { NavLink } from "react-router-dom";
import { useCounts } from "../../logicFiles/useCounts";
import { useEffect } from 'react';
import { addToBasket } from '../redux/basketSlice';


export const SaleItems = () => {

  const productsData = useSelector((state) => state.products.products);

  const allProducts = productsData
    .filter((item) => item)
    .reduce((acc, curr) => acc.concat(curr), []);

  const itemsWithOption = allProducts.filter(item => item.hasOwnProperty('option'));

  const [saleItems, setSaleItems] = useState([]);

  const handleIncrese = (e, item_id) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setSaleItems(
      saleItems.map(item => {
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
    setSaleItems(
      saleItems.map(item => {
        if (item_id === item.id) {
          return { ...item, totalCount: item.totalCount - (item.totalCount > 1 ? 1 : 0) }
        }
        else {
          return item
        }
      })
    )
  }


  const handleAddBasket = (e, item) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    dispatch(addToBasket(item))
  };


  useEffect(() => {
    if (allProducts) {
      setSaleItems(itemsWithOption)
    }
    //console.log('sales');

  }, [productsData]);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);



  return (
    <>
      <h1 className={styles.nameOfBestItems}>Акційні товари</h1>
      <div className={styles.card}>
        {productsData && productsData.length > 0 ? (
          saleItems.map((item) => {

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
                    {item.price * item.totalCount} грн.
                  </span>
                  <div className={styles.orderCount}>
                    <button
                      className={styles.btnOrder}
                      onClick={(e) => handleDecrese(e, item.id)}
                    >
                      -
                    </button>
                    <span className={styles.count}>{item.totalCount}</span>
                    <button
                      className={styles.btnOrder}
                      onClick={(e) => handleIncrese(e, item.id)}
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={(e) => handleAddBasket(e, item)}
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
