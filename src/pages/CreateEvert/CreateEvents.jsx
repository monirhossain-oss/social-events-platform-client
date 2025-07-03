import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router";
import useAuth from "../../hookes/useAuth/useAuth";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hookes/useAxiosSecure";

const eventTypes = ["Cleanup", "Plantation", "Donation", "Food Distribution", "Blood Donation"];

const CreateEvent = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();

    const { register, handleSubmit, control, formState: { errors } } = useForm();


    const onSubmit = async (data) => {
        const eventData = {
            ...data,
            eventDate: data.eventDate.toISOString(),
            createdBy: user.email,
        };
        console.log(eventData)

        // Show SweetAlert for confirmation
        Swal.fire({
            title: "Confirm Event Submission",
            text: "Do you want to submit this event now?",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Confirm",
            cancelButtonText: "Edit",
        }).then(async (result) => {
            if (result.isConfirmed) {
                // User confirmed, post data to DB
                try {
                    const res = await axiosSecure.post('/events', eventData)
                    // console.log(eventData)
                    if (res.data.insertedId) {
                        Swal.fire({
                            icon: "success",
                            title: "Event Created Successfully!",
                            showConfirmButton: false,
                            timer: 1500,
                        });
                        navigate("/upcoming-events");

                    }
                } catch (error) {
                    console.error(error);
                    Swal.fire({
                        icon: "error",
                        title: "Error Creating Event",
                        text: error.message,
                    });
                }
            } else {
                // User clicked Edit, allow editing the form
                Swal.fire({
                    icon: "info",
                    title: "You can now edit your event",
                    timer: 1200,
                    showConfirmButton: false,
                });
            }
        });
    };


    return (
        <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow mt-8">
            <h2 className="text-2xl font-bold mb-6 text-center">Create New Event</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

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
                    <label className="block mb-1 font-semibold">Thumbnail Image URL</label>
                    <input
                        {...register("thumbnail", { required: "Thumbnail URL is required" })}
                        placeholder="Enter thumbnail image URL"
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

                <button type="submit" className="btn btn-primary w-full">Create Event</button>
            </form>
        </div>
    );
};

export default CreateEvent;
