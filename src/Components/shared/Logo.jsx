import React from 'react';
import { Link } from 'react-router';
import logo from '../../assets/logo-navbar.png'

const Logo = () => {
    return (
        <div>
            <Link to='/'><img className=" btn hidden md:block rounded-full " src={logo} alt="" /></Link>
        </div>
    );
};

export default Logo;