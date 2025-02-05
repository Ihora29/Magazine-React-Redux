import React, { useEffect, useState, createContext } from 'react'
import { NavLink, useLocation, Outlet } from "react-router-dom";
import styles from "../../styles/UserCabinet.module.css"
import { useMask } from '@react-input/mask';
import { set, useForm } from "react-hook-form";
import { Link } from 'react-router-dom';
import { ChangeUserName } from "../user-cabinet/ChangeUserName"
import axios from 'axios';
export const userData = createContext(null);

export const UserCabinet = () => {

    const location = useLocation();
    const { state } = location || {};

    const [usersList, setUsersList] = useState([]);
    const [userEdit, setUserEdit] = useState(state);

    useEffect(() => {
        //     axios.get('http://localhost:3001/users-login')
        //         .then(response => {
        //             const data = response.data
        //             setUsersList(data);
        //         });


        //     // if (usersList && usersList.length > 0) {
        //     //     usersList.find((user) => user.email === state.email && user.phone === state.phone ? setUserEdit(state) : null)
        //     // }
        //     // setUserEdit(state)

        //   console.log('render Cabinet');
    }, []);

    return (
        <>

            <div className={styles.mainContainer}>
                <div className={styles.navSideRoutes}>
                    <ul className={styles.navList}>
                        <li><NavLink to='' className={styles.linkInCabinet}>Особисті дані</NavLink></li>
                        <li><NavLink to="orderhistory" className={styles.linkInCabinet}>Історія замовлень</NavLink></li>
                        <li><NavLink to='changepass' className={styles.linkInCabinet}>Зміна паролю</NavLink></li>
                    </ul>
                </div>

                <div className={styles.userDataContainer}>

                    <Outlet context={{ userEdit, setUserEdit }} />
                </div>

            </div>


        </ >
    )
}
