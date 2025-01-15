import React, { useEffect, useState } from 'react'
import styles from "../../styles/Basket.module.css";
import { useCounts } from "../../logicFiles/useCounts.js";
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import basketImg from "./../../images/reshot-icon-trash-2ZNJ9PUBQL.svg"
import { removeFromBasket } from '../redux/basketSlice.js';
import { increseBasket } from '../redux/basketSlice.js';

export default function Basket() {

  const basket = useSelector((state) => state.basketItems.basketItems);

  const [totalSum, setTotalSum] = useState(0)
  useEffect(() => {
    if (basket && basket.length > 0) {
      //   const orderCount = cartItems.reduce((accumulator, item) => accumulator + item.count, 0);
      const totalSumRes = basket.reduce((accumulator, item) => accumulator + item.price, 0);
      setTotalSum(totalSumRes)
    } else if (basket.length === 0) {
      setTotalSum(0)
    }
    console.log(basket);


  }, [basket]);
  const dispatch = useDispatch()

  const handleDelete = (e, item) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    dispatch(removeFromBasket(item))
  }

  const basketIncrement = (e, item_id) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    dispatch(increseBasket(item_id))
  }

  useEffect(() => {
  }, []);

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

  const productsData = useSelector((state) => state.products.products);
  const productsDrinks = productsData[2];

  return (
    <div className={styles.basketContainer}>


      {basket.length > 0 ? (
        basket.map((item, index) => (
          <li className={styles.orderItem} key={index}>
            <img className={styles.orderImg} src={item.imgSrc} alt="" />
            <span className={styles.orderName}> {item.name}</span>
            <img className={styles.trashPic} src={basketImg} onClick={(e) => handleDelete(e, item)} alt="" />
            <div className={styles.changeContainer}>
              <div className={styles.orderCount}>
                <button className={styles.btnOrder} >-</button>
                <span className={styles.count}>{item.totalCount}</span>
                <button className={styles.btnOrder}
                  onClick={(e) => basketIncrement(e, item.id)}
                >+</button>
              </div>
              <span className={styles.itemsPrice}>{item.totalCount * item.price}грн.</span>
            </div>

          </li>
        ))
      ) : (<div>
        <img className={styles.emptyBasketPic} src="https://monosushi.com.ua/wp-content/themes/monosushi/img/icons/cart-empty-img.svg" alt="" />
        <h3 className={styles.emptyBasketText}>Кошик порожній</h3>
        <NavLink to='/' className={styles.emptyBasketBtn} >Перейти до каталогу</NavLink>

      </div>

      )}

      <h3 className={styles.textTryAlways}>Спробуйте також</h3>

      <Carousel className={styles.Carousel} swipeable={true}
        draggable={false}
        showDots={false}
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
        {productsDrinks.map((item) => {
          return (
            <NavLink to={`/product/${item.id}`} key={item.id} className={styles.carouselDrinks}>
              <img src={item.imgSrc} className={styles.drinkImg} alt="" />
              <h2 className={styles.drinkName}>{item.name}</h2>
              <div className={styles.itemOption}>{item.option}</div>
              <div className={styles.aboutProduct}>
                <span className={styles.weightProduct}> Вага:{item.weight}</span>
              </div>
              <div className={styles.footItem}>
                <span className={styles.prodPrice}>{item.price * item.totalCount} грн.</span>
                <button
                  className={styles.btnBuyMini}>ЗАМОВИТИ</button>

              </div>
            </NavLink>
          );
        })}
      </Carousel>
      <div className={styles.bottomBasketContainer}>
        <span className={styles.total}><b>{totalSum}</b> грн.</span>
        <NavLink className={styles.makeOrderBtn} to='create-order' >Оформити замовлення</NavLink>
      </div>
    </div>
  )
}
