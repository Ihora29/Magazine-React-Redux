import React from 'react'
import { NavLink } from 'react-router-dom';



export const OrderHistory = () => {
    return (
        <div>
            <h2>У Вас ще не має замовлень, перейти до <NavLink to='/'><b>каталогу</b></NavLink> </h2>
        </div>
    )
}
