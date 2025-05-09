'use client';
import React, { FC, useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { useLoginMutation } from '../../redux/features/auth/authApi';
import toast from 'react-hot-toast';
import { signIn } from 'next-auth/react';

type Props = {
    setRoute: (route: string) => void;
    setOpen: (open: boolean) => void; 
};

const schema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Please enter your email'),
    password: Yup.string().required('Please enter your password').min(6, 'Password must be at least 6 characters long'),
});

const Login: FC<Props> = ({ setRoute, setOpen }) => {
    const [show, setShow] = useState(false);
    const [login, { isSuccess, isError, error }] = useLoginMutation();
    
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: schema,
        onSubmit: async ({ email, password }) => {
            try {
                await login({ email, password }).unwrap();
            } catch (err) {
                setInvalidError(true);
            }
        },
    });
    
    const [, setInvalidError] = useState<boolean>(false);

    useEffect(() => {
        if (isSuccess) {
            toast.success("Login Successfully");
            setOpen(false);
        }
        if (isError) {
            if (error && "data" in error) {
                const errorData = error as any;
                toast.error(errorData.data.message);
                setInvalidError(true);
            }
        }
    }, [isSuccess, isError, error, setOpen]);

    const { errors, touched, handleChange, handleBlur, handleSubmit, values } = formik;

    return (
        <div className="flex flex-col items-center justify-center w-full md:w-[520px] xxs:w-[90vw] ">
            <form
                onSubmit={handleSubmit}
                className="p-6 sm:p-8 rounded-lg shadow-lg w-full max-h-[90vh] overflow-y-auto bg-white dark:bg-gray-800"
            >
                <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6">Welcome Back</h2>
                
                {/* Email Field */}
                <div className="mb-4">
                    <label htmlFor="email" className="block mb-2 font-medium text-sm sm:text-base">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        className="w-full xs:p-2 xxs:p-1 md:p-3 rounded-md text-sm sm:text-base border focus:ring focus:outline-none transition dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 border-gray-300 focus:border-indigo-500"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    {touched.email && errors.email && (
                        <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                    )}
                </div>

                {/* Password Field */}
                <div className="mb-4">
                    <label htmlFor="password" className="block mb-2 font-medium text-sm sm:text-base">Password</label>
                    <div className="relative">
                        <input
                            type={show ? "text" : "password"}
                            id="password"
                            name="password"
                            className="w-full xs:p-2 xxs:p-1 md:p-3 rounded-md text-sm sm:text-base border focus:ring focus:outline-none transition dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 border-gray-300 focus:border-indigo-500"
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <div
                            className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                            onClick={() => setShow(!show)}
                        >
                            {show ? (
                                <AiOutlineEyeInvisible className="text-gray-600 dark:text-gray-300" size={24} />
                            ) : (
                                <AiOutlineEye className="text-gray-600 dark:text-gray-300" size={24} />
                            )}
                        </div>
                    </div>
                    {touched.password && errors.password && (
                        <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                    )}
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full text-white xs:p-2 xxs:p-1 md:p-3 rounded-md font-semibold transition duration-300 bg-indigo-500 hover:bg-indigo-600 dark:bg-indigo-600 dark:hover:bg-indigo-700 text-sm sm:text-base"
                >
                    Sign In
                </button>

                <div
                    className="text-blue-500 pl-1 cursor-pointer mt-2 text-sm sm:text-base"
                    onClick={() => setRoute("forgot-password")}
                >
                    Forgot Password?    
                </div>

                {/* Social Auth Login Options */}
                <div className="mt-8 text-center">
                    <div className="flex xxs:flex-col justify-center items-center space-x-6 mt-4">
                        <p className="text-gray-400 text-sm sm:text-base">Or login with:</p>
                        <button
                            type="button"
                            className="flex items-center justify-center p-3 rounded-md hover:bg-gray-300 dark:hover:bg-gray-900 transition duration-300"
                            onClick={() => signIn("google")}
                        >
                            <FcGoogle size={24} />
                        </button>
                    </div>
                </div>

                <h5 className="text-center pt-4 font-medium text-sm sm:text-base">
                    Don't have an account?{" "}
                    <span
                        className="text-blue-500 pl-1 cursor-pointer"
                        onClick={() => setRoute("Sign-Up")}
                    >
                        Sign up
                    </span>
                </h5>
            </form>
        </div>
    );
};

export default Login;
