import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate, useParams } from "react-router";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hookes/useAxiosSecure";

const UpdateEventForm = () => {
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const { register, handleSubmit, control, setValue, formState: { errors } } = useForm();

    useEffect(() => {
        axiosSecure.get(`/events/${id}`)
            .then(res => {
                const eventData = res.data;
                setValue("title", eventData.title);
                setValue("description", eventData.description);
                setValue("type", eventData.type);
                setValue("thumbnail", eventData.thumbnail);
                setValue("location", eventData.location);
                setValue("eventDate", new Date(eventData.eventDate));
            })
            .catch(err => {
                console.error(err);
                Swal.fire("Error", "Failed to load event data", "error");
            });
    }, [id, axiosSecure, setValue]);

    const onSubmit = async (data) => {
        try {
            const updatedData = {
                ...data,
                eventDate: data.eventDate.toISOString(),
            };

            const res = await axiosSecure.patch(`/events/${id}`, updatedData);

            if (res.data.modifiedCount > 0) {
                Swal.fire("Updated!", "Your event has been updated.", "success");
                navigate("/my-events");
            } else {
                Swal.fire("No Change", "No changes were made.", "info");
            }
        } catch (error) {
            console.error(error);
            Swal.fire("Error", "Failed to update event", "error");
        }
    };

    const eventTypes = ["Cleanup", "Plantation", "Donation", "Food Distribution", "Blood Donation"];

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-lg mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow">

            {/* Title */}
            <div>
                <input
                    {...register("title", { required: "Title is required" })}
                    placeholder="Event Title"
                    className={`input input-bordered w-full ${errors.title ? "input-error" : ""}`}
                />
                {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
            </div>

            {/* Description */}
            <div>
                <textarea
                    {...register("description", { required: "Description is required" })}
                    placeholder="Event Description"
                    className={`textarea textarea-bordered w-full ${errors.description ? "textarea-error" : ""}`}
                    rows={4}
                />
                {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
            </div>

            {/* Event Type */}
            <div>
                <select
                    {...register("type", { required: "Event type is required" })}
                    className={`select select-bordered w-full ${errors.type ? "select-error" : ""}`}
                    defaultValue=""
                >
                    <option value="" disabled>Select Event Type</option>
                    {eventTypes.map((type) => (
                        <option key={type} value={type}>{type}</option>
                    ))}
                </select>
                {errors.type && <p className="text-red-500 text-sm mt-1">{errors.type.message}</p>}
            </div>

            {/* Thumbnail URL */}
            <div>
                <input
                    {...register("thumbnail", { required: "Thumbnail URL is required" })}
                    placeholder="Thumbnail Image URL"
                    className={`input input-bordered w-full ${errors.thumbnail ? "input-error" : ""}`}
                />
                {errors.thumbnail && <p className="text-red-500 text-sm mt-1">{errors.thumbnail.message}</p>}
            </div>

            {/* Location */}
            <div>
                <input
                    {...register("location", { required: "Location is required" })}
                    placeholder="Event Location"
                    className={`input input-bordered w-full ${errors.location ? "input-error" : ""}`}
                />
                {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location.message}</p>}
            </div>

            {/* Event Date */}
            <div>
                <Controller
                    control={control}
                    name="eventDate"
                    rules={{ required: "Event date is required" }}
                    render={({ field }) => (
                        <DatePicker
                            placeholderText="Select Event Date"
                            selected={field.value}
                            onChange={field.onChange}
                            minDate={new Date()}
                            className={`input input-bordered w-full ${errors.eventDate ? "input-error" : ""}`}
                            dateFormat="MMMM d, yyyy"
                        />
                    )}
                />
                {errors.eventDate && <p className="text-red-500 text-sm mt-1">{errors.eventDate.message}</p>}
            </div>

            <button type="submit" className="btn btn-primary w-full">Update Event</button>
        </form>
    );
};

export default UpdateEventForm;
