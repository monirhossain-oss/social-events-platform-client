import React from 'react';
import Navbar from '../../Components/Navbar/Navbar';
import { Outlet } from 'react-router'; // ✅ এখানে 'react-router' এর পরিবর্তে 'react-router-dom' দিতে হবে

const MainLayout = () => {
    return (
        <div className='max-w-6xl mx-auto'>
            <Navbar />
            <Outlet />
        </div>
    );
};

export default MainLayout;
