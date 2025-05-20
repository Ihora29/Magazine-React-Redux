import * as React from "react";
import {
    createBrowserRouter, Outlet
} from "react-router-dom";
import AppLayout from "../Components/AppLayout";
import CardSushi from "../Components/ProductsCard/CardSushi";
import CardSets from "../Components/ProductsCard/CardSets";
import CardDrinks from "../Components/ProductsCard/CardDrinks";
import CardMoti from "../Components/ProductsCard/CardMoti";
import ErrorPage from "../Components/ErrorPage";
import Card from "../Components/ProductsCard/Card";
import MainPage from "../Components/MainPage";
import { ZoneDelivery } from "../Components/delivery/ZoneDilivery";
import Actions from "../../src/Components/Actions&Sale/Actions"
import { HBAction } from "../Components/Actions&Sale/HBAction";
import { ActionItemOfWeek } from "../Components/Actions&Sale/ActionItemOfWeek";
import { Action3in5 } from "../Components/Actions&Sale/Action3in5";
import { ActionTakeYourself } from "../Components/Actions&Sale/ActionTakeYourself";
import About from "../Components/Footer/About";
import { OfertaPage } from "../Components/Footer/OfertaPage";
import { AboutUsPage } from "../Components/Footer/AboutUsPage";
import { MakeOrderPage } from "../Components/MakeOrderPage";
import { SaleItems } from "../Components/ProductsCard/SaleItems";
import { UserCabinet } from "../Components/user-cabinet/UserCabinet";
import { ChangeUserName } from "../Components/user-cabinet/ChangeUserName";
import { ChangeUserPass } from "../Components/user-cabinet/ChangeUserPass"
import { OrderHistory } from "../Components/user-cabinet/OrderHistory";
import { CheckForBuy } from "../Components/popUp/CheckForBuy";



export const router = createBrowserRouter([
    {
        path: "/",
        element: <AppLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <MainPage />,

            },
            {
                path: "sushi",
                element: <CardSushi />,
            },
            {
                path: "sets",
                element: <CardSets />,
            },
            {
                path: "moti",
                element: <CardMoti />,
            },
            {
                path: "drinks",
                element: <CardDrinks />,

            },

            {
                path: "/*/product/:id",
                element: <Card />,

            },
            {
                path: "actions",
                element: <Actions />,

            },
            {
                path: "happy-birthday",
                element: <HBAction />,

            },
            {
                path: "roll-of-week",
                element: <ActionItemOfWeek />,

            },
            {
                path: "3in5",
                element: <Action3in5 />,

            },
            {
                path: "take-yourself",
                element: <ActionTakeYourself />,
            },

            {
                path: "oferta",
                element: <OfertaPage />,
            },
            {
                path: "about-us",
                element: <AboutUsPage />,
            },
            {
                path: "create-order",
                element: <MakeOrderPage />,
            },
            {
                path: "best&sale_products",
                element: <SaleItems />,
            },
            {
                path: "user-cabinet/:id",
                element: <UserCabinet />,
                children: [
                    {
                        path: "",
                        element: <ChangeUserName />
                    },
                    {
                        path: "changepass",
                        element: <ChangeUserPass />
                    },
                    {
                        path: "orderhistory",
                        element: <OrderHistory />
                    }
                ]
            },
            ,
            {
                path: "zone-delivery",
                element: <ZoneDelivery />
            },
            {
                path: "client-check",
                element: <CheckForBuy />
            }
        ]
    }
]);