import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router';
import { FcGoogle } from 'react-icons/fc';
import useAuth from '../../hookes/useAuth/useAuth';
import Swal from 'sweetalert2';
import loginImg from '../../assets/Screenshot 2025-08-10 192952.png'

const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { createUser, googleSignIn } = useAuth();

    const onSubmit = data => {
        createUser(data.email, data.password)
            .then(res => {
                if (res) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Registration Successful!',
                        text: 'Welcome back!',
                        timer: 2000,
                        showConfirmButton: false,
                    });
                }
            })
            .catch(error => {
                console.log(error);
            });
    };

    const handleGoogleSignIn = () => {
        googleSignIn()
            .then(result => {
                if (result) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Login Successful!',
                        text: 'Welcome back!',
                        timer: 2000,
                        showConfirmButton: false,
                    });
                }
            })
            .catch(error => {
                console.log(error);
            });
    };

    return (
        <div className="flex flex-col md:flex-row items-stretch justify-center min-h-[80vh] max-w-6xl mx-auto my-8 gap-8 px-4">
            {/* Registration Form Card */}
            <div className="card bg-base-100 w-full max-w-md shadow-2xl p-6">
                <h2 className="text-2xl font-bold mb-6">Please Register</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* Name */}
                    <div>
                        <label className="label font-semibold text-lg">Name</label>
                        <input
                            type="text"
                            {...register('name', { required: 'Name is required' })}
                            className="input input-bordered w-full"
                            placeholder="Your Name"
                        />
                        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                    </div>

                    {/* Email */}
                    <div>
                        <label className="label font-semibold text-lg">Email</label>
                        <input
                            type="email"
                            {...register('email', { required: 'Email is required' })}
                            className="input input-bordered w-full"
                            placeholder="Email"
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                    </div>

                    {/* Photo URL */}
                    <div>
                        <label className="label font-semibold text-lg">Photo URL</label>
                        <input
                            type="text"
                            {...register('photoURL', {
                                required: 'Photo URL is required',
                                pattern: {
                                    value: /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg|webp))$/i,
                                    message: 'Enter a valid image URL',
                                },
                            })}
                            className="input input-bordered w-full"
                            placeholder="https://example.com/photo.jpg"
                        />
                        {errors.photoURL && <p className="text-red-500 text-sm mt-1">{errors.photoURL.message}</p>}
                    </div>

                    {/* Password */}
                    <div>
                        <label className="label font-semibold text-lg">Password</label>
                        <input
                            type="password"
                            {...register('password', {
                                required: 'Please type your Password',
                                minLength: {
                                    value: 6,
                                    message: 'Password must be at least 6 characters long',
                                },
                                validate: {
                                    hasUppercase: (value) =>
                                        /[A-Z]/.test(value) || 'Password must contain at least one uppercase letter',
                                    hasLowercase: (value) =>
                                        /[a-z]/.test(value) || 'Password must contain at least one lowercase letter',
                                },
                            })}
                            className="input input-bordered w-full"
                            placeholder="Password"
                        />
                        {errors.password && (
                            <div className="text-red-500 text-sm mt-1 space-y-1">
                                {errors.password.types ? (
                                    <>
                                        {errors.password.types.minLength && <p>{errors.password.types.minLength}</p>}
                                        {errors.password.types.hasUppercase && <p>{errors.password.types.hasUppercase}</p>}
                                        {errors.password.types.hasLowercase && <p>{errors.password.types.hasLowercase}</p>}
                                    </>
                                ) : (
                                    <p>{errors.password.message}</p>
                                )}
                            </div>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="hover:bg-[#CAEB66] border-2 p-2 rounded-lg hover:border-[#CAEB66] cursor-pointer hover:text-red-500 font-bold w-full mt-4"
                    >
                        Register
                    </button>
                </form>

                <p className="mt-4 text-center">
                    Already Have An Account?{' '}
                    <Link to="/login" className="text-red-500 font-bold btn-link">
                        Sign In
                    </Link>
                </p>

                <button
                    onClick={handleGoogleSignIn}
                    className="flex cursor-pointer items-center mt-6 justify-center gap-3 w-full py-2 border-2 border-green-500 rounded-md shadow-sm hover:bg-green-500 transition"
                >
                    <FcGoogle size={22} />
                    <span className="text-gray-800 font-bold hover:text-black">Login with Google</span>
                </button>
            </div>

            {/* Image */}
            <div className="hidden md:block md:w-1/2 max-w-lg">
                <img
                    src={loginImg}
                    alt="Registration Illustration"
                    className="w-full h-full rounded-lg shadow-lg object-cover"
                />
            </div>
        </div>
    );
};

export default Register;
