import React, { useEffect, useState } from "react";
import useAuth from "../../hookes/useAuth/useAuth";
import useAxiosSecure from "../../hookes/useAxiosSecure";
import { motion } from 'framer-motion';

const JoinedEvents = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [joinedEvents, setJoinedEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user?.email) {
            axiosSecure.get(`/joined-events?userEmail=${user.email}`)
                .then(res => {
                    // Sort by eventDate (ascending)
                    const sortedEvents = res.data.sort((a, b) => new Date(a.eventDate) - new Date(b.eventDate));
                    setJoinedEvents(sortedEvents);
                    setLoading(false);
                })
                .catch(err => {
                    console.error("Error fetching joined events:", err);
                    setLoading(false);
                });
        }
    }, [user?.email, axiosSecure]);

    if (loading) return <p className="text-center text-lg font-semibold mt-10">Loading your joined events...</p>;
    if (!joinedEvents.length) return <p className="text-center text-lg font-semibold mt-10">You have not joined any events yet.</p>;

    return (
        <section className="container mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-green-400">Your Joined Events</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {joinedEvents.map(event => (
                    <motion.div
                        key={event._id}
                        whileHover={{ scale: 1.03 }}
                        className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow hover:shadow-lg transition duration-300 flex flex-col"
                    >
                        <img
                            src={event.thumbnail}
                            alt={event.title}
                            className="w-full h-48 object-cover rounded-t-xl"
                        />
                        <div className="p-4 flex flex-col justify-between flex-grow">
                            <div>
                                <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">{event.title}</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-300 mb-1"><strong>Location:</strong> {event.location}</p>
                                <p className="text-sm text-gray-600 dark:text-gray-300 mb-1"><strong>Type:</strong> {event.type}</p>
                                <p className="text-sm text-gray-600 dark:text-gray-300"><strong>Date:</strong> {new Date(event.eventDate).toDateString()}</p>
                            </div>
                            <div className="mt-4">
                                <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100">
                                    Joined on {new Date(event.joinedAt).toLocaleDateString()}
                                </span>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default JoinedEvents;
