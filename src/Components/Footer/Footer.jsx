import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-green-700 text-white mt-8 py-10">
            <div className="container mx-auto px-6 md:flex md:justify-between md:items-start">
                {/* Logo and description */}
                <div className="mb-8 md:mb-0 md:w-1/3">
                    <h2 className="text-3xl font-bold mb-2">SocialEvents</h2>
                    <p className="text-gray-300 max-w-sm">
                        A community-driven platform to create, join, and manage social development events in your area.
                    </p>
                </div>

                {/* Quick Links */}
                <div className="mb-8 md:mb-0 md:w-1/3">
                    <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
                    <ul>
                        <li><a href="/" className="hover:underline">Home</a></li>
                        <li><a href="/upcoming-events" className="hover:underline">Upcoming Events</a></li>
                        <li><a href="/create-event" className="hover:underline">Create Event</a></li>
                        <li><a href="/joined-events" className="hover:underline">Joined Events</a></li>
                        <li><a href="/my-events" className="hover:underline">My Events</a></li>
                    </ul>
                </div>

                {/* Contact & Social */}
                <div className="md:w-1/3">
                    <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
                    <p>Email: support@socialevents.com</p>
                    <p>Phone: +880 1234 567890</p>
                    <div className="flex space-x-4 mt-4 text-lg">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-gray-300">
                            <FaFacebookF />
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="hover:text-gray-300">
                            <FaTwitter />
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-gray-300">
                            <FaInstagram />
                        </a>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-gray-300">
                            <FaLinkedinIn />
                        </a>
                    </div>
                </div>
            </div>

            <div className="text-center text-gray-300 mt-10 text-sm">
                &copy; {new Date().getFullYear()} SocialEvents. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
