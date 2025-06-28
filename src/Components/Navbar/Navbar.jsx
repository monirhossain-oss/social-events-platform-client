import React from 'react';
import { Link, NavLink } from 'react-router';
import Logo from '../shared/Logo';
import useAuth from '../../hookes/useAuth/useAuth';
// import { LogOut } from "lucide-react";


const Navbar = () => {
    const { user, logOut } = useAuth();
    const links = <>
        <li><NavLink to='/'>Home</NavLink></li>
        <li><NavLink to='/upcoming-events'>Upcomming Events</NavLink></li>
        {
            user && <>
                <li><NavLink to='/create-event'>Create Event</NavLink></li>
                <li><NavLink to='/joined-events'>My Events</NavLink></li>
            </>
        }
    </>

    const handleLogOut = () => {
        logOut()
            .then(result => {
                console.log(result)
            })
            .catch(error => {
                console.log(error)
            })
    }

    return (
        <div className="navbar bg-base-100 shadow-sm">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        {
                            links
                        }
                    </ul>
                </div>
                <Logo></Logo>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {
                        links
                    }
                </ul>
            </div>
            <div className="navbar-end">
                {
                    user ? <>
                        <button
                            onClick={handleLogOut}
                            className="flex items-center gap-2 px-4 py-2 bg-red-400 hover:bg-red-600 cursor-pointer text-white font-semibold rounded-xl shadow-md transition duration-300 ease-in-out"
                        >

                            Logout
                        </button>
                    </> :
                        <>
                            <Link to='/login'>Sing In</Link>
                        </>
                }
            </div>
        </div>
    );
};

export default Navbar;