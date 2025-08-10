import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router";
import useAuth from "../../hookes/useAuth/useAuth";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hookes/useAxiosSecure";

const eventTypes = ["Cleanup", "Plantation", "Donation", "Food Distribution", "Blood Donation"];

// ⬅️ এখানে তোমার imgbb API key বসাবে
const imgbbAPIKey = "8c9ab2efa23e928fe7697d0e5fbcf781";

const CreateEvent = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();

    const { register, handleSubmit, control, formState: { errors } } = useForm();

    const uploadImageToImgbb = async (file) => {
        const formData = new FormData();
        formData.append("image", file);

        const res = await fetch(`https://api.imgbb.com/1/upload?key=${imgbbAPIKey}`, {
            method: "POST",
            body: formData,
        });
        const data = await res.json();
        return data.data.url;
    };

    const onSubmit = async (data) => {
        try {
            let imageUrl = "";
            if (data.thumbnail[0]) {
                imageUrl = await uploadImageToImgbb(data.thumbnail[0]);
            }
            console.log(imageUrl)

            const eventData = {
                title: data.title,
                type: data.type,
                thumbnail: imageUrl,
                location: data.location,
                description: data.description,
                eventDate: data.eventDate.toISOString(),
                createdBy: user.email,
            };

            Swal.fire({
                title: "Confirm Event Submission",
                text: "Do you want to submit this event now?",
                icon: "question",
                showCancelButton: true,
                confirmButtonText: "Confirm",
                cancelButtonText: "Edit",
            }).then(async (result) => {
                if (result.isConfirmed) {
                    const res = await axiosSecure.post("/events", eventData);
                    if (res.data.insertedId) {
                        Swal.fire({
                            icon: "success",
                            title: "Event Created Successfully!",
                            showConfirmButton: false,
                            timer: 1500,
                        });
                        navigate("/upcoming-events");
                    }
                }
            });
        } catch (error) {
            console.error(error);
            Swal.fire({
                icon: "error",
                title: "Error Creating Event",
                text: error.message,
            });
        }
    };

    return (
        <div className="dark:text-gray-500 rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-bold text-green-500 mb-8 text-center">
                Create New Event
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Title & Type */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block font-semibold mb-1">Event Title</label>
                        <input
                            {...register("title", { required: "Title is required" })}
                            placeholder="Enter event title"
                            className={`input input-bordered w-full ${errors.title ? "input-error" : ""}`}
                        />
                        {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
                    </div>
                    <div>
                        <label className="block font-semibold mb-1">Event Type</label>
                        <select
                            {...register("type", { required: "Event type is required" })}
                            className={`select select-bordered w-full ${errors.type ? "select-error" : ""}`}
                            defaultValue=""
                        >
                            <option value="" disabled>Select event type</option>
                            {eventTypes.map((type) => (
                                <option key={type} value={type}>{type}</option>
                            ))}
                        </select>
                        {errors.type && <p className="text-red-500 text-sm">{errors.type.message}</p>}
                    </div>
                </div>

                {/* File Upload & Location */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block font-semibold mb-1">Thumbnail Image</label>
                        <input
                            type="file"
                            accept="image/*"
                            {...register("thumbnail", { required: "Thumbnail image is required" })}
                            className="file-input file-input-bordered w-full"
                        />
                        {errors.thumbnail && <p className="text-red-500 text-sm">{errors.thumbnail.message}</p>}
                    </div>
                    <div>
                        <label className="block font-semibold mb-1">Location</label>
                        <input
                            {...register("location", { required: "Location is required" })}
                            placeholder="Enter event location"
                            className={`input input-bordered w-full ${errors.location ? "input-error" : ""}`}
                        />
                        {errors.location && <p className="text-red-500 text-sm">{errors.location.message}</p>}
                    </div>
                </div>

                {/* Description */}
                <div>
                    <label className="block font-semibold mb-1">Event Description</label>
                    <textarea
                        {...register("description", { required: "Description is required" })}
                        placeholder="Write a short description..."
                        className={`textarea textarea-bordered w-full min-h-[120px] ${errors.description ? "textarea-error" : ""}`}
                    />
                    {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
                </div>

                {/* Date */}
                <div>
                    <label className="block font-semibold mb-1">Event Date</label>
                    <Controller
                        control={control}
                        name="eventDate"
                        rules={{ required: "Event date is required" }}
                        render={({ field }) => (
                            <DatePicker
                                placeholderText="Select event date"
                                selected={field.value}
                                onChange={field.onChange}
                                minDate={new Date()}
                                className={`input input-bordered w-full ${errors.eventDate ? "input-error" : ""}`}
                                dateFormat="MMMM d, yyyy"
                            />
                        )}
                    />
                    {errors.eventDate && <p className="text-red-500 text-sm">{errors.eventDate.message}</p>}
                </div>

                {/* Submit */}
                <div className="text-center">
                    <button type="submit" className="btn btn-primary w-full px-8">
                        Create Event
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateEvent;
