import React from 'react';

import { createBrowserRouter } from "react-router";
import MainLayout from '../layouts/MainLayout/MainLayout';
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';
import Home from '../pages/Home/Home/Home';
import UpcomingEvents from '../pages/UpcomingEvents/UpcomingEvents';

export const router = createBrowserRouter([
    {
        path: "/",
        Component: MainLayout,
        children: [
            {
                index:true,
                Component:Home
            },
            {
                path: '/upcoming-events',
                Component: UpcomingEvents
            },
            {
                path:'login',
                Component: Login
            },
            {
                path: 'register',
                Component: Register,
            }
        ]
    },
]);
