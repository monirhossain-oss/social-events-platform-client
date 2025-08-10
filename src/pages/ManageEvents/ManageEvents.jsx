import React, { useEffect, useState } from 'react';
import useAuth from '../../hookes/useAuth/useAuth';
import useAxiosSecure from '../../hookes/useAxiosSecure';
import Swal from 'sweetalert2';
import { Navigate, useNavigate } from 'react-router';

const ManageEvents = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user?.email) return;

        setLoading(true);
        axiosSecure.get(`/my-events?email=${user.email}`)
            .then(res => {
                setEvents(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
                Swal.fire("Error", "Failed to fetch your events.", "error");
            });
    }, [user, axiosSecure]);

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "This action cannot be undone.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "Cancel",
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/events/${id}`)
                    .then(res => {
                        if (res.data.message === "Event deleted successfully") {
                            Swal.fire("Deleted!", "Your event has been deleted.", "success");
                            // Update UI without reload:
                            setEvents(prevEvents => prevEvents.filter(event => event._id !== id));
                        }
                    })
                    .catch(err => {
                        console.error(err);
                        Swal.fire("Error", "Failed to delete the event.", "error");
                    });
            }
        });
    };


    if (loading) return <p className="text-center mt-10"><span className="loading loading-bars loading-xl"></span></p>;
    if (!events.length) {
        return (
            <p className="text-center mt-10 text-gray-600 dark:text-gray-400">
                You have not created any events yet.
            </p>
        );
    }

    return (
        <section className="max-w-6xl mx-auto p-6">
            <h2 className="text-3xl font-bold mb-6 text-center text-gray-900 dark:text-green-400">Manage Your Events</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {events.map(event => (
                    <div key={event._id} className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
                        <img src={event.thumbnail} alt={event.title} className="rounded mb-3 h-40 w-full object-cover" />
                        <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{event.title}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Location: {event.location}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Type: {event.type}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                            Date: {new Date(event.eventDate).toLocaleDateString()}
                        </p>
                        <div className="flex justify-between mt-4">
                            <button
                                onClick={() => navigate(`/update-event/${event._id}`)}
                                className="px-4 py-2 rounded bg-yellow-500 text-white hover:bg-yellow-600 transition"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDelete(event._id)}
                                className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600 transition"
                            >
                                Delete
                            </button>

                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ManageEvents;
