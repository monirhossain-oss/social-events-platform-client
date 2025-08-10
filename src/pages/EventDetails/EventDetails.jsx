import React, { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router";
import Swal from "sweetalert2";
import useAuth from "../../hookes/useAuth/useAuth";
import useAxiosSecure from "../../hookes/useAxiosSecure";


const EventDetails = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const axiosSecure = useAxiosSecure();
    const [joined, setJoined] = useState(false);
    // console.log(event)

    useEffect(() => {
        axiosSecure.get(`/events/${id}`)
            .then(res => {
                setEvent(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, [id]);


    const handleJoinEvent = () => {
        if (!user) {
            Swal.fire("Error", "Please login to join this event", "error");
            Navigate('/login')
            return;
        }

        Swal.fire({
            title: `Join Event?`,
            text: `Do you want to join "${event.title}"?`,
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Yes, Join",
            cancelButtonText: "Cancel"
        }).then(result => {
            if (result.isConfirmed) {
                const joinData = {
                    eventId: event?._id,
                    userEmail: user?.email,
                    userName: user?.displayName,
                };


                axiosSecure.post('/join-event', joinData)
                    .then(res => {
                        if (res.data.joined) {
                            Swal.fire("Info", "You have already joined this event.", "info");
                            setJoined(true);
                        } else {
                            Swal.fire("Joined!", "You have successfully joined the event.", "success");
                            setJoined(true);
                        }
                    })
                    .catch(() => {
                        Swal.fire("Error", "Failed to join the event.", "error");
                    });

            }
        });
    };


    if (loading) return (
        <div className="flex justify-center items-center min-h-[300px]">
            <span className="loading loading-bars loading-xl"></span>
        </div>
    );
    if (!event) return <p className="text-center mt-8">Event not found</p>;

    return (
        <div className="container mx-auto my-8 p-6 max-w-3xl bg-gradient-to-br from-white/70 via-white/60 to-white/50 dark:from-gray-900/80 dark:via-gray-900/60 dark:to-gray-900/40 backdrop-blur-lg border border-gray-200 dark:border-gray-700 rounded-2xl shadow-xl">
            <h1 className="text-4xl font-extrabold mb-6 text-gray-800 dark:text-green-500 text-center">
                {event.title}
            </h1>
            <img
                src={event.thumbnail}
                alt={event.title}
                className="w-full max-h-[450px] object-cover rounded-xl shadow-md mb-6 border border-gray-300 dark:border-gray-700"
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 text-center">
                <div className="bg-white/50 dark:bg-gray-800/50 rounded-xl p-4 shadow hover:scale-105 transition">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Location</p>
                    <p className="font-semibold text-gray-700 dark:text-gray-200">{event.location}</p>
                </div>
                <div className="bg-white/50 dark:bg-gray-800/50 rounded-xl p-4 shadow hover:scale-105 transition">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Event Type</p>
                    <p className="font-semibold text-gray-700 dark:text-gray-200">{event.type}</p>
                </div>
                <div className="bg-white/50 dark:bg-gray-800/50 rounded-xl p-4 shadow hover:scale-105 transition">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Date</p>
                    <p className="font-semibold text-gray-700 dark:text-gray-200">
                        {new Date(event.eventDate).toDateString()}
                    </p>
                </div>
            </div>
            <p className="mb-8 text-gray-700 dark:text-gray-300 text-center max-w-prose mx-auto">
                {event.description}
            </p>
            <div className="text-center">
                <button
                    onClick={handleJoinEvent}
                    disabled={joined}
                    className={`px-6 py-3 rounded-full cursor-pointer font-semibold shadow-md transition
                    ${joined ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:scale-105 hover:shadow-lg'}
                `}
                >
                    {joined ? "Already Joined" : "Join Event"}
                </button>
            </div>
        </div>

    );
};

export default EventDetails;
