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
import SaleAndBestProduct from "../Components/ProductsCard/SaleAndBestProduct";
import Actions from "../Components/Actions&Sale/Actions";
import { HBAction } from "../Components/Actions&Sale/HBAction";
import { ActionItemOfWeek } from "../Components/Actions&Sale/ActionItemOfWeek";
import { Action3in5 } from "../Components/Actions&Sale/Action3in5";
import { ActionTakeYourself } from "../Components/Actions&Sale/ActionTakeYourself";
import About from "../Components/Footer/About";
import { OfertaPage } from "../Components/Footer/OfertaPage";
import { AboutUsPage } from "../Components/Footer/AboutUsPage";



export const router = createBrowserRouter([
    {
        path: "/*",
        element: <AppLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/*",
                element: <MainPage />,
                // children: [
                //     {
                //         path: "/*/sale",
                //         element: <SaleAndBestProduct />
                //     }
                // ]
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
                path: "sale",
                element: <SaleAndBestProduct />,
            },
            {
                path: "oferta",
                element: <OfertaPage />,
            },
            {
                path: "about-us",
                element: <AboutUsPage />,
            },


        ]
    }
]);