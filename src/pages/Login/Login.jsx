import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router';
import { FcGoogle } from "react-icons/fc";
import useAuth from '../../hookes/useAuth/useAuth';
import Swal from 'sweetalert2';

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { signIn, googleSignIn } = useAuth();
    const [loginError, setLoginError] = useState('');
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from || '/';

    const onSubmit = (data) => {
        setLoginError(''); // reset previous error
        signIn(data.email, data.password)
            .then((res) => {
                if (res) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Login Successful!',
                        text: 'Welcome back!',
                        timer: 2000,
                        showConfirmButton: false,
                    });

                }
                navigate(from);
            })
            .catch(error => {
                console.error(error);
                if (error.code === 'auth/invalid-credential') {
                    setLoginError('Incorrect password. Please try again.');
                } else if (error.code === 'auth/user-not-found') {
                    setLoginError('No user found with this email.');
                } else if (error.code === 'auth/invalid-email') {
                    setLoginError('Invalid email address.');
                } else {
                    setLoginError(error.message);
                }
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
                console.log(result.user)
                navigate(from);
            })
            .catch(error => {
                console.log(error);
                setLoginError(error.message);
            });
    };

    return (
        <div className="card bg-base-100 w-full mx-auto mt-8 max-w-sm shrink-0 shadow-2xl">
            <div className="card-body">
                <h1 className="text-2xl font-bold">Please Login</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <fieldset className="fieldset">
                        {/* Email field */}
                        <label className="label font-semibold text-lg">Email</label>
                        <input
                            type="email"
                            {...register('email', { required: 'Email is required' })}
                            className="input input-bordered w-full"
                            placeholder="Email"
                        />
                        {errors.email && <p className="text-red-500">{errors.email.message}</p>}

                        {/* Password field */}
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
                                    hasUppercase: value =>
                                        /[A-Z]/.test(value) || 'Must contain at least one uppercase letter',
                                    hasLowercase: value =>
                                        /[a-z]/.test(value) || 'Must contain at least one lowercase letter',
                                },
                            })}
                            className="input input-bordered w-full"
                            placeholder="Password"
                        />
                        {errors.password && (
                            <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                        )}
                    </fieldset>

                    {/* Login error */}
                    {loginError && (
                        <p className="text-red-500 text-sm mt-2">{loginError}</p>
                    )}

                    <button type="submit" className="hover:bg-[#CAEB66] border-2 p-2 rounded-lg hover:border-[#CAEB66] cursor-pointer hover:text-red-500 font-bold w-full mt-4">
                        Sign In
                    </button>
                    <p className="mt-2">
                        Don't Have Any Account?{' '}
                        <Link to="/register" className="text-red-500 font-bold btn-link">Register</Link>
                    </p>
                </form>

                <button
                    onClick={handleGoogleSignIn}
                    className="flex cursor-pointer items-center mt-4 justify-center gap-3 w-full py-2 border-2 border-green-500 text-green-500 rounded-md shadow-sm hover:text-black hover:bg-green-500 transition"
                >
                    <FcGoogle size={22} />
                    <span className="font-semibold">Login with Google</span>
                </button>
            </div>
        </div>
    );
};

export default Login;
