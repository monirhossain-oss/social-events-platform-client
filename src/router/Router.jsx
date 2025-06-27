import React from 'react';

import { createBrowserRouter } from "react-router";
import MainLayout from '../layouts/MainLayout/MainLayout';
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';

export const router = createBrowserRouter([
    {
        path: "/",
        Component: MainLayout,
        children: [
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
