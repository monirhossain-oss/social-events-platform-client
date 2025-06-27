import React from "react";
import { Link } from "react-router";

// Dummy data initially for layout
const events = [
    {
        id: "1",
        title: "Tree Plantation - Hossainpur",
        location: "Kishoreganj",
        eventType: "Plantation",
        eventDate: "2025-07-15",
        thumbnail:
            "https://images.pexels.com/photos/2962301/pexels-photo-2962301.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
    {
        id: "2",
        title: "Road Cleaning - Mirpur 10",
        location: "Dhaka",
        eventType: "Cleanup",
        eventDate: "2025-07-20",
        thumbnail:
            "https://images.pexels.com/photos/4207906/pexels-photo-4207906.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
];

const UpcomingEvents = () => {
    return (
        <section className="py-12 my-8 rounded-2xl bg-gray-50 dark:bg-gray-900">
            <div className="container mx-auto px-6">
                <h2 className="text-3xl font-bold mb-8 text-center text-gray-800 dark:text-green-400">
                    Upcoming Social Development Events
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {events.map((event) => (
                        <div
                            key={event.id}
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
                            <p className="text-gray-600 dark:text-gray-300">
                                📍 {event.location}
                            </p>
                            <p className="text-gray-600 dark:text-gray-300">
                                🏷️ {event.eventType}
                            </p>
                            <p className="text-gray-600 dark:text-gray-300">
                                📅 {new Date(event.eventDate).toDateString()}
                            </p>
                            <Link
                                to={`/events/${event.id}`}
                                className=" mx-auto bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded text-center block transition mt-4"
                            >
                                View Event
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default UpcomingEvents;
