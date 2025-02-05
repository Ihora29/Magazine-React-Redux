import styles from "../styles/CardCarousel.module.css";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

function CardCarousel() {
    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 2
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 2
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };


    return (<div className={styles.saleContainer}>

        <Carousel className={styles.Carousel} swipeable={true}
            draggable={false}
            showDots={true}
            responsive={responsive}
            ssr={true} // means to render carousel on server-side.
            infinite={true}
            autoPlay={true}
            autoPlaySpeed={3000}
            keyBoardControl={true}
            customTransition="all 1s"
            transitionDuration={1000}
            containerClass={styles.carouselContainer}
            removeArrowOnDeviceType={["tablet", "mobile", "desktop", "superLargeDesktop"]}
            dotListClass={styles.custom}

            itemClass="carousel-item-padding-40-px">

            <NavLink to="roll-of-week"><img className={styles.img} aria-hidden='false' src="https://monosushi.com.ua/wp-content/uploads/2022/12/rol-tyzhnya.jpg" alt="" /></NavLink>

            <NavLink to="3in5">  <img className={styles.img} aria-hidden='false' src="https://monosushi.com.ua/wp-content/uploads/2022/12/5-tyj-v-podarunok-.jpg" alt="" /></NavLink>

            <NavLink to="best&sale_products"><img className={styles.img} aria-hidden='false' src="https://monosushi.com.ua/wp-content/uploads/2024/08/monosushi_montazhnaya-oblast-1-kopyya.jpg" alt="" /></NavLink>

            <NavLink to="take-yourself"><img className={styles.img} aria-hidden='false' src="https://monosushi.com.ua/wp-content/uploads/2022/12/samovyviz.jpg" alt="" /></NavLink>

            <NavLink to="happy-birthday"> <img className={styles.img} aria-hidden='false' src="https://monosushi.com.ua/wp-content/uploads/2022/12/den-narodzhennya-.jpg" alt="" /></NavLink>

            <NavLink to="moti"> <img className={styles.img} aria-hidden='false' src="https://monosushi.com.ua/wp-content/uploads/2024/04/852h400_2_montazhnaya-oblast-1.jpg" alt="" /></NavLink>

        </Carousel>

    </div>);
}

export default CardCarousel;