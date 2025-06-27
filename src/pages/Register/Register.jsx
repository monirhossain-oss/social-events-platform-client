import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router';
import { FcGoogle } from 'react-icons/fc';
import useAuth from '../../hookes/useAuth/useAuth';
import Swal from 'sweetalert2';

const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { createUser, googleSignIn } = useAuth();
    const onSubmit = data => {
        console.log(data)
        createUser(data.email, data.password)
            .then(res => {
                console.log(res.user)
                if (res) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Registation Successful!',
                        text: 'Welcome back!',
                        timer: 2000,
                        showConfirmButton: false,
                    });

                }
            })
            .catch(error => {
                console.log(error)
            })
    }

    const handleGoogleSignIn = () => {
        googleSignIn()
            .then(result => {
                console.log(result.user)
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
                console.log(error)
            })
    }

    return (
        <div className="card bg-base-100 w-full mx-auto mt-8 max-w-sm shrink-0 shadow-2xl">
            <div className="card-body">
                <h2 className="text-2xl  font-bold">Please Register</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <fieldset className="fieldset">
                        {/* name field  */}
                        <label className='label font-semibold text-lg'>Name</label>
                        <input type="text" {...register('name', { required: true, })} className="input" placeholder='Your Name' />
                        {/* email field  */}
                        <label className="label font-semibold text-lg">Email</label>
                        <input type="email" {...register('email', { required: true, })} className="input" placeholder="Email" />
                        {
                            errors.email?.type === 'required' && <p className='text-red-500'>Email is required </p>
                        }
                        {/* photoURL field */}
                        <label>Photo URL</label>
                        <input
                            {...register('photoURL', {
                                required: 'Photo URL is required',
                                pattern: { value: /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg|webp))$/i, message: 'Enter a valid image URL' }
                            })}
                            type="text"
                            placeholder="https://example.com/photo.jpg"
                            className="input input-bordered w-full"
                        />
                        {errors.photoURL && <p className="text-red-600">{errors.photoURL.message}</p>}
                        {/* password field  */}
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

                    </fieldset>
                    <button className="hover:bg-[#CAEB66] border-2 p-2 rounded-lg hover:border-[#CAEB66] cursor-pointer hover:text-red-500 font-bold w-full mt-4">Register</button>
                    <p className='mt-2'>Already Have An Account? <Link to='/login' className='text-red-500 font-bold btn-link'>Sing In</Link></p>
                </form>
                <button
                    onClick={handleGoogleSignIn}
                    className="flex cursor-pointer items-center mt-4 justify-center gap-3 w-full py-2 border-2 border-green-500 rounded-md shadow-sm  hover:bg-green-500 transition"
                >
                    <FcGoogle size={22} />
                    <span className="text-gray-800 font-bold hover:text-black  ">Login with Google</span>
                </button>
            </div>
        </div>
    );
};

export default Register;