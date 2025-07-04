import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router';
import useAuth from '../../hookes/useAuth/useAuth';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import { FaUserCircle } from 'react-icons/fa';

const Navbar = () => {
    const { user, logOut } = useAuth();
    const navigate = useNavigate();

    const handleLogOut = () => {
        logOut()
            .then(() => {
                navigate('/login');
            })
            .catch(error => console.log(error));
    };

    const navLinks = (
        <>
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/upcoming-events">Upcoming Events</NavLink></li>
            {
                user && <>
                    <li><NavLink to="/create-event">Create Event</NavLink></li>
                    <li><NavLink to="/joined-events">Joined Events</NavLink></li>
                    <li><NavLink to="/my-events">My Events</NavLink></li>
                </>
            }
        </>
    );

    const profileMenu = (
        <ul tabIndex={0} className="dropdown-content menu shadow bg-base-100 rounded-box w-52 z-50 mt-3">
            <li><NavLink to="/create-event">Create Event</NavLink></li>
            <li><NavLink to="/joined-events">Joined Events</NavLink></li>
            <li><NavLink to="/my-events">My Events</NavLink></li>
            <li>
                <button onClick={handleLogOut} className="text-left">Logout</button>
            </li>
        </ul>
    );

    return (
        <div className="navbar bg-gradient-to-r from-gray-400 via-gray-600 to-purple-400 opacity-80 rounded-b-xl px-4 sticky top-0 z-40">
            <div className="navbar-start">
                <div className="dropdown lg:hidden">
                    <div tabIndex={0} role="button" className="btn btn-ghost">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        {navLinks}
                    </ul>
                </div>
                <div>
                    <Link to='/' className="bg-gradient-to-r from-red-600 via-red-500 to-red-400 bg-clip-text text-2xl font-bold hidden md:block text-transparent ">Socail Events</Link>
                </div>
            </div>

            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 gap-2">
                    {navLinks}
                </ul>
            </div>

            <div className="navbar-end flex items-center gap-3">
                <ThemeToggle />
                {user ? (
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar tooltip tooltip-bottom"
                            data-tip={user.displayName || "Profile"}>
                            {user.photoURL ? (
                                <div className="w-10 rounded-full">
                                    <img src={user.photoURL} alt="profile" />
                                </div>
                            ) : (
                                <FaUserCircle className="text-3xl" />
                            )}
                        </div>
                        {profileMenu}
                    </div>
                ) : (
                    <Link to="/login" className="btn btn-sm bg-green-500 text-white hover:bg-green-600 rounded-md">Sign In</Link>
                )}
            </div>
        </div>
    );
};

export default Navbar;
