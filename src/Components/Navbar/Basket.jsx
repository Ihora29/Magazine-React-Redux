import React, { useEffect, useState } from 'react'
import styles from "../../styles/Basket.module.css";
import { useCounts } from "../../logicFiles/useCounts.js";
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

export default function Basket() {

  const { cartItems, setCartItems } = useCounts()
  // useEffect(() => {
  //   console.log('cartItems was updated in Basket:', cartItems);
  //   console.log(localStorage);

  // }, [cartItems]);
  // const getStorage = () => {
  //   return localStorage
  // }


  //const [storageArray, setStorageArray] = useState([]);

  useEffect(() => {

    const basketItems = []
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      let value = localStorage.getItem(key);



      basketItems.push({ key, value })


    }
    const newBasketItems = basketItems.map(item => JSON.parse(item.value))

    setCartItems(newBasketItems)

    console.log(cartItems);


  }, []);
  //const { orderPrice } = useCounts()
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
  //const orderCount = cartItems.reduce((accumulator, item) => accumulator + item.count, 0);
  const totalSum = cartItems.reduce((accumulator, item) => accumulator + item.price, 0);

  const productsData = useSelector((state) => state.products.products);
  const productsDrinks = productsData[2];

  return (
    <div className={styles.basketContainer}>


      {cartItems && cartItems.length > 0 ? (
        cartItems.map((item, index) => (
          <li className={styles.orderItem} key={index}>
            <img className={styles.orderImg} src={item.pic} alt="" />
            <span className={styles.orderName}> {item.name}</span>

            <div className={styles.changeContainer}>
              <div className={styles.orderCount}>
                <button className={styles.btnOrder} >-</button>
                <span className={styles.count}>{item.count}</span>
                <button className={styles.btnOrder}  >+</button>

              </div>
              <span className={styles.itemsPrice}>{item.count * item.price}hrn.</span>
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
          const currentItem = productsDrinks.find((count) => count.id === item.id) || { totalCount: 1 };
          return (
            <NavLink to={`/product/${item.id}`} key={item.id} className={styles.carouselDrinks}>
              <img src={item.imgSrc} className={styles.drinkImg} alt="" />
              <h2 className={styles.drinkName}>{item.name}</h2>
              <div className={styles.itemOption}>{item.option}</div>
              <div className={styles.aboutProduct}>

                <span className={styles.weightProduct}> Вага:{item.weight}</span>
              </div>
              <div className={styles.footItem}>
                <span className={styles.prodPrice}>{item.price * item.totalCount} hrn.</span>

                <button
                  //onClick={(e) => addToCart(item, currentItem.totalCount, e)}
                  className={styles.btnBuyMini}>ЗАМОВИТИ</button>
              </div>
            </NavLink>
          );
        })}
      </Carousel>
      <span className={styles.total}></span>
      <button className={styles.makeOrderBtn} >Оформити замовлення</button>
    </div>
  )
}
