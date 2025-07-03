import React, { useEffect, useState } from 'react';
import useAuth from '../../hookes/useAuth/useAuth';
import useAxiosSecure from '../../hookes/useAxiosSecure';
import Swal from 'sweetalert2';

const JoinEvents = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [joinedEvents, setJoinedEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user?.email) return;

        setLoading(true);

        axiosSecure.get(`/joined-events?userEmail=${user.email}`)
            .then(res => {
                setJoinedEvents(res.data);
                setLoading(false);
            })
            .catch(err => {
                setLoading(false);
                Swal.fire('Error', 'Failed to fetch joined events', 'error');
                console.error(err);
            });
    }, [user, axiosSecure]);

    if (loading) return <p className="text-center mt-10">Loading joined events...</p>;

    if (!joinedEvents.length) {
        return (
            <p className="text-center mt-10 text-gray-600 dark:text-gray-400">
                You have not joined any events yet.
            </p>
        );
    }

    return (
        <section className="max-w-5xl my-8 mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-green-400 text-center">Your Joined Events</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {joinedEvents.map(event => (
                    <div key={event._id} className="bg-gray-50 dark:bg-gray-900 rounded-lg shadow hover:shadow-lg transition p-5 flex flex-col">
                        <img
                            src={event.thumbnail}
                            alt={event.title}
                            className="rounded-md mb-4 h-40 object-cover"
                        />
                        <h3 className="text-xl font-semibold mb-1 text-gray-800 dark:text-white">{event.title}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                            <strong>Location:</strong> {event.location}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                            <strong>Type:</strong> {event.type}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                            <strong>Date:</strong> {new Date(event.eventDate).toLocaleDateString()}
                        </p>
                        <p className="text-gray-700 dark:text-gray-300 flex-grow">{event.description?.slice(0, 100)}...</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default JoinEvents;
