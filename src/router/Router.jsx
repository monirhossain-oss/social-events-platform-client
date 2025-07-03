import React from 'react';

import { createBrowserRouter } from "react-router";
import MainLayout from '../layouts/MainLayout/MainLayout';
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';
import Home from '../pages/Home/Home/Home';
import UpcomingEvents from '../pages/UpcomingEvents/UpcomingEvents';
import CreateEvent from '../pages/CreateEvert/CreateEvents';
import PrivetRoutes from '../routes/Routes/PrivetRoutes';
import EventDetails from '../pages/EventDetails/EventDetails';
import JoinedEvents from '../pages/JoinedEvents/JoinedEvents';
import ManageEvents from '../pages/ManageEvents/ManageEvents';
import UpdateEvent from '../pages/UpdateEvent/UpdateEvent';

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
            },
            {
                path:'create-event',
                element:<PrivetRoutes><CreateEvent></CreateEvent></PrivetRoutes>
            },
            {
                path:'/events/:id',
                element:<PrivetRoutes><EventDetails></EventDetails></PrivetRoutes>
            },
            {
                path:'joined-events',
                element:<PrivetRoutes><JoinedEvents></JoinedEvents></PrivetRoutes>
            },
            {
                path: '/my-events',
                element: <PrivetRoutes><ManageEvents></ManageEvents></PrivetRoutes>
            },
            {
                path:'/update-event/:id',
                element:<PrivetRoutes><UpdateEvent></UpdateEvent></PrivetRoutes>
            }
        ]
    },
]);
