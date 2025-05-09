'use client';
import React, { FC, useState, useEffect } from 'react';
import {  AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { useTheme } from 'next-themes';
import { useRegisterMutation } from '../../redux/features/auth/authApi';
import toast from 'react-hot-toast';
import { FcGoogle } from 'react-icons/fc';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { Checkbox } from '@mui/material';

const SignUp: FC<{ 
    setRoute: (route: string) => void;
    isResend:boolean;
    setIsResend:(isResend:boolean)=>void;
    submissionDataStore:any;
    setSubmissionDataStore:(submissionDataStore:any)=>void

 }> = ({ setRoute,isResend,submissionDataStore,setSubmissionDataStore }) => {
    const { theme } = useTheme();
    const [register, { data, isSuccess, error }] = useRegisterMutation();
    console.log("submissiondata",submissionDataStore)

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        contactnumber: '',
        gender: '',
        classes: '',
        stream: '',
        targetYear: '',
    });
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [showPassword, setShowPassword] = useState(false);
    const [selectedClass, setSelectedClass] = useState("");
    const [stream, setStream] = useState("");
    const [targetYear, setTargetYear] = useState("");
    const [isChecked, setIsChecked] = useState(false)
    // const [submissionDataStore,setSubmissionDataStore]=useState({})
    
console.log(isResend,"hjk")

    const handleClassChange = (e: any) => {
        setSelectedClass(e.target.value);
        setStream(""); // Reset stream on class change
        setTargetYear(""); // Reset target year on class change
    };

    const validate = () => {
        const newErrors: any = {};
        if (!formData.name) newErrors.name = 'Please enter your name';
        if (!formData.email) newErrors.email = 'Please enter your email';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email';
        if (!formData.password) newErrors.password = 'Please enter your password';
        else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters long';
        if (!formData.contactnumber) newErrors.contactnumber = 'Please enter your mobile number';
        else if (!/^\d{10}$/.test(formData.contactnumber)) newErrors.contactnumber = 'Use a valid 10-digit mobile number';
        if (!formData.gender) newErrors.gender = 'Please select your gender'; // Validate Classes
        if(!isChecked) newErrors.tnc = 'Please check the TnC'

        return newErrors;
    };

    useEffect(() => {
        if (isSuccess) {
            toast.success(data?.message || 'Registration successful');
            setRoute('Verification');
        }
        if(isResend){
            toast.success("yuppppp")

        }
        if (error && 'data' in error) {
            toast.error((error as any).data?.message || 'Registration failed');
        }
    }, [isSuccess, error, data, isResend, setRoute]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };


 

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        const submissionData = { ...formData, stream, targetYear, classes: selectedClass };
        setSubmissionDataStore(submissionData)
        await register(submissionData);
    };


    // const handleResend=async()=>{
    //     toast.success("resending   aefa")     
    //     console.log(submissionDataStore);

    // }


    const inputClass = theme === 'dark'
        ? 'border-gray-600 focus:border-indigo-500 bg-gray-700 text-gray-200'
        : 'border-gray-300 focus:border-indigo-500 bg-gray-50';
    const buttonClass = theme === 'dark'
        ? 'bg-indigo-600 hover:bg-indigo-700'
        : 'bg-indigo-500 hover:bg-indigo-600';
    const errorClass = 'text-red-500 text-sm mt-1';

    return (
        <div className={`flex flex-col items-center justify-center max-h-[85vh] xxs:w-[80vw] ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-200 text-gray-900'}`}>
            <form
                onSubmit={handleSubmit}
                className={`p-8 rounded-lg shadow-lg w-full max-h-[90vh] overflow-y-auto max-w-[80vw] ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}
            >
                <h2 className="text-2xl font-bold text-center mb-6">Welcome to EDU GRANTORS</h2>

                {/* Name */}
                <div className="mb-4">
                    <label htmlFor="name" className="block mb-2 font-medium">Name</label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        className={`w-full p-2 rounded-md border ${inputClass}`}
                        value={formData.name}
                        onChange={handleChange}
                    />
                    {errors['name'] && <p className={errorClass}>{errors['name']}</p>}
                </div>

                {/* Email */}
                <div className="mb-4">
                    <label htmlFor="email" className="block mb-2 font-medium">Email</label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        className={`w-full p-2 rounded-md border ${inputClass}`}
                        value={formData.email}
                        onChange={handleChange}
                    />
                    {errors['email'] && <p className={errorClass}>{errors['email']}</p>}
                </div>

                {/* Password */}
                <div className="mb-4">
                    <label htmlFor="password" className="block mb-2 font-medium">Password</label>
                    <div className="relative">
                        <input
                            id="password"
                            name="password"
                            type={showPassword ? 'text' : 'password'}
                            className={`w-full p-2 rounded-md border ${inputClass}`}
                            value={formData.password}
                            onChange={handleChange}
                        />
                        <div
                            className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
                        </div>
                    </div>
                    {errors['password'] && <p className={errorClass}>{errors['password']}</p>}
                </div>

                {/* Mobile Number */}
                <div className="mb-4">
                    <label htmlFor="contactnumber" className="block mb-2 font-medium">Mobile Number</label>
                    <input
                        id="contactnumber"
                        name="contactnumber"
                        type="text"
                        className={`w-full p-2 rounded-md border ${inputClass}`}
                        value={formData.contactnumber}
                        onChange={handleChange}
                        maxLength={10}
                        placeholder="Enter your mobile number"
                    />
                    {errors['contactnumber'] && <p className={errorClass}>{errors['contactnumber']}</p>}
                </div>

                {/* Gender */}
                <div className="mb-4">
                    <label className="block mb-2 font-medium">Gender</label>
                    <div className="flex gap-4">
                        {['Male', 'Female', 'Other'].map((gender) => (
                            <label key={gender}>
                                <input
                                    type="radio"
                                    name="gender"
                                    value={gender}
                                    checked={formData.gender === gender}
                                    onChange={handleChange}
                                    className="mr-2"
                                />
                                {gender}
                            </label>
                        ))}
                    </div>
                    {errors['gender'] && <p className={errorClass}>{errors['gender']}</p>}
                </div>

                {/* Class Selection */}
                <div className="mb-4">
                    <label htmlFor="classes" className="block mb-2 font-medium">Class</label>
                    <select
                        id="classes"
                        name="classes"
                        className="w-full p-2 rounded-md border"
                        value={selectedClass}
                        onChange={handleClassChange}
                    >
                        <option value="" disabled>Select your class</option>
                        {Array.from({ length: 8 }, (_, i) => (
                            <option key={i + 5} value={`Class ${i + 5}`}>
                                Class {i + 5}
                            </option>
                        ))}
                        <option value="JEE">JEE</option>
                        <option value="NEET">NEET</option>
                    </select>
                </div>

                {/* PCM/PCB Selection for Class 11/12 */}
                {(selectedClass === "Class 11" || selectedClass === "Class 12") && (
                    <div className="mb-4">
                        <label htmlFor="stream" className="block mb-2 font-medium">Stream</label>
                        <select
                            id="stream"
                            name="stream"
                            className="w-full p-2 rounded-md border"
                            value={stream}
                            onChange={(e) => setStream(e.target.value)}
                        >
                            <option value="" disabled>Select your stream</option>
                            <option value="PCM">PCM</option>
                            <option value="PCB">PCB</option>
                            <option value="Commerce">Commerce</option>
                            <option value="Arts">Arts</option>
                        </select>
                    </div>
                )}

                {/* Target Year Input for JEE/NEET */}
                {(selectedClass === "JEE" || selectedClass === "NEET") && (
                    <div className="mb-4">
                        <label htmlFor="targetYear" className="block mb-2 font-medium">Target Year</label>
                        <select
                            id="targetYear"
                            name="targetYear"
                            className="w-full p-2 rounded-md border"
                            value={targetYear}
                            onChange={(e) => setTargetYear(e.target.value)}
                        >
                            <option value="" disabled>Select your target year</option>
                            {Array.from({ length: 10 }, (_, i) => {
                                const year = new Date().getFullYear() + i; // Generate years from current year onwards
                                return (
                                    <option key={year} value={year}>
                                        {year}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                )}



                <div className="flex flex-col space-y-2">
                    <div className="flex items-center space-x-2">
                        <div onClick={()=>{setIsChecked(!isChecked)}}>

                        <Checkbox id="terms" checked={isChecked}  />
                        </div>
                        <label
                            htmlFor="terms"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            I agree to the{" "}
                            <Link href="/terms" className="text-primary hover:underline">
                                terms and services
                            </Link>
                        </label>
                    </div>
                    {errors['tnc'] && <p className={errorClass}>{errors['tnc']}</p>}

                    {/* {error && <p className="text-sm text-red-500">{error}</p>} */}
                </div>





                <button
                    type="submit"
                    className={`w-full p-3 mt-2 text-white font-semibold rounded-md ${buttonClass}`}
                >
                    Sign Up
                </button>




                {/* Social Auth Login Options */}
                <div className="mt-8 text-center">
                    <p className="text-gray-500">Or login with</p>
                    <div className="flex justify-center space-x-6 mt-4">
                        <button
                            type="button"
                            className="flex items-center justify-center p-3 bg-gray-200 rounded-md hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 transition duration-300"
                            onClick={() => signIn("google")}
                        >
                            <FcGoogle size={24} />
                        </button>
                    </div>
                </div>






                <p className="text-center mt-4">
                    Already have an account?{' '}
                    <span
                        className="text-blue-500 cursor-pointer"
                        onClick={() => setRoute('Login')}
                    >
                        Sign In
                    </span>
                </p>
            </form>
        </div>
    );
};

export default SignUp;
