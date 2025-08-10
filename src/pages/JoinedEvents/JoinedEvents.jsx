import React, { useEffect, useState } from 'react';
import useAuth from '../../hookes/useAuth/useAuth';
import useAxiosSecure from '../../hookes/useAxiosSecure';
import Swal from 'sweetalert2';

const JoinEvents = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [joinedEvents, setJoinedEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    // Modal States
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

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

    if (loading) return (
        <p className="text-center mt-10">
            <span className="loading loading-bars loading-xl"></span>
        </p>
    );

    if (!joinedEvents.length) {
        return (
            <p className="text-center mt-10 text-gray-600 dark:text-gray-400">
                You have not joined any events yet.
            </p>
        );
    }

    const openModal = (event) => {
        setSelectedEvent(event);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedEvent(null);
        setIsModalOpen(false);
    };

    return (
        <section className="bg-gray-100 p-6 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-green-400 text-center">
                Your Joined Events
            </h2>

            <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-4">
                {joinedEvents.map(event => (
                    <div
                        key={event._id}
                        className="bg-white rounded-lg shadow hover:shadow-xl transition p-5 flex flex-col"
                    >
                        <img
                            src={event.thumbnail}
                            alt={event.title}
                            className="rounded-md mb-4 h-40 object-cover"
                        />
                        <h3 className="text-xl font-semibold mb-1 text-gray-800">{event.title}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                            <strong>Location:</strong> {event.location}
                        </p>
                        <button
                            onClick={() => openModal(event)}
                            className="btn btn-outline btn-success mt-auto transition duration-300"
                        >
                            View Details
                        </button>
                    </div>
                ))}
            </div>

            {/* Modal */}
            {isModalOpen && selectedEvent && (
                <dialog open className="modal modal-bottom sm:modal-middle">
                    <div className="modal-box max-w-3xl">
                        <img
                            src={selectedEvent.thumbnail}
                            alt={selectedEvent.title}
                            className="w-full h-64 object-cover rounded-md mb-4"
                        />
                        <h2 className="text-2xl font-bold mb-2">{selectedEvent.title}</h2>
                        <p className="text-sm text-gray-500 mb-4">
                            <span className="badge badge-outline">{selectedEvent.type}</span>
                        </p>

                        <div className="space-y-2">
                            <p>
                                <strong>📍 Location:</strong> {selectedEvent.location}
                            </p>
                            <p>
                                <strong>📅 Date:</strong>{" "}
                                {new Date(selectedEvent.eventDate).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </p>
                            <p>
                                <strong>👤 Created By:</strong> {selectedEvent.createdBy}
                            </p>
                            <p className="text-justify">
                                <strong>📝 Description:</strong> {selectedEvent.description}
                            </p>
                        </div>

                        <div className="modal-action">
                            <button
                                onClick={closeModal}
                                className="btn btn-error text-white"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </dialog>
            )}
        </section>
    );
};

export default JoinEvents;
