import { useState, useEffect, useContext } from 'react';


export function useCounts() {


    const [orderPrice, setOrderPrice] = useState(1)
    const [counts, setCounts] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [localCount, setLocalCount] = useState(1)

    const increment = (id, e) => {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }

        setCounts((prevCounts) =>
            prevCounts.map((item) =>
                item.id === id ? { ...item, totalCount: item.totalCount + 1 } : item
            )
        );

        setLocalCount((prevCount) => prevCount + 1);



        // setCarouselCount((prevCarouselCount) =>
        //     prevCarouselCount.map((item) =>
        //         item.id === id ? { ...item, totalCount: item.totalCount + 1 } : item
        //     )
        // );

    };

    const decrement = (id, e) => {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        setCounts((prevCounts) =>
            prevCounts.map((item) =>
                item.id === id && item.totalCount > 0
                    ? { ...item, totalCount: item.totalCount - 1 }
                    : item
            )
        );
        if (localCount > 1) {
            setLocalCount((prevCount) => prevCount - 1);

        }
    };





    return { counts, increment, decrement, setCounts, cartItems, setCartItems, localCount, setLocalCount, orderPrice, setOrderPrice };
}
