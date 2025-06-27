import React, { useState, useEffect } from "react";
import { Link } from "react-router";
import useAxiosSecure from "../../hookes/useAxiosSecure";

const UpcomingEvents = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const axiosSecure = useAxiosSecure();  // Custom axios instance

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const res = await axiosSecure.get("/events");
                const today = new Date();
                const upcomingEvents = res.data.filter(
                    (event) => new Date(event.eventDate) >= today
                );
                setEvents(upcomingEvents);
            } catch (error) {
                console.error("Error fetching events:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, [axiosSecure]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <p className="text-lg font-semibold">Loading events...</p>
            </div>
        );
    }

    return (
        <section className="py-12 my-8 rounded-2xl bg-gray-50 dark:bg-gray-900">
            <div className="container mx-auto px-6">
                <h2 className="text-3xl font-bold mb-8 text-center text-gray-800 dark:text-green-400">
                    Upcoming Social Development Events
                </h2>

                {events.length === 0 ? (
                    <p className="text-center text-gray-600 dark:text-gray-400">
                        No upcoming events found.
                    </p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {events.map((event) => (
                            <div
                                key={event._id} // MongoDB id
                                className="bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition p-4 flex flex-col"
                            >
                                <img
                                    src={event.thumbnail}
                                    alt={event.title}
                                    className="h-48 w-full object-cover rounded"
                                />
                                <h3 className="mt-4 text-xl font-semibold text-gray-800 dark:text-white">
                                    {event.title}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300">📍 {event.location}</p>
                                <p className="text-gray-600 dark:text-gray-300">
                                    📅 {new Date(event.eventDate).toDateString()}
                                </p>
                                <Link
                                    to={`/events/${event._id}`}
                                    className="mx-auto bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded text-center block transition mt-4"
                                >
                                    View Event
                                </Link>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default UpcomingEvents;
