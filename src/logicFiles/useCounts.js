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


    const addToCart = (item, count, e) => {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        };
        const newCartItem = {
            id: item.id,
            name: item.name,
            pic: item.imgSrc,
            price: item.price,
            count: count || localCount
        };

        setCartItems(prevCartItems => {
            const existingItem = prevCartItems.find(cartItem => cartItem.id === item.id);
            cartItems.push(existingItem)
            if (existingItem) {

                // localStorage.setItem(`item ${item.id}`, JSON.stringify(newCartItem));
                //  cartItems.push(newCartItem)
                return prevCartItems.map(cartItem =>
                    cartItem.id === item.id
                        ? { ...cartItem, count: cartItem.count + count }
                        : cartItem
                );
            }

            //else {

            //    localStorage.setItem(`item ${item.id}`, JSON.stringify(newCartItem))

            //return [...prevCartItems, newCartItem,];
            //     }
        });
        console.log(cartItems);

        // setOrderPrice(cartItems.map(item => (item.price * item.count)))
        // //  const orderPrice = 
    };

    useEffect(() => {
        //  console.log('cartItems was updated in useCount:', cartItems);
    }, [cartItems]);




    return { counts, increment, decrement, setCounts, cartItems, setCartItems, addToCart, localCount, setLocalCount, orderPrice, setOrderPrice };
}
