'use client';
import React, { FC, useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import toast from 'react-hot-toast';
import { useForgotPasswordUpdateMutation, useGetOTPVerifyMutation, useUserExistMutation } from '@/app/redux/features/user/userApi';
import Loader from '../Loader/Loader';
import dynamic from 'next/dynamic';
import { IoArrowBackCircle, IoCheckmarkDoneCircleSharp } from 'react-icons/io5';


type Props = {
    setRoute: (route: string) => void;

}
const VerifyPop = dynamic(() => import('./VerifyPop'), {
    loading: () => <Loader message='Loading ...' />,
});



const ChangePassword: FC<Props> = ({ setRoute }: Props) => {

    const { theme } = useTheme();
    const [email, setEmail] = useState("")

    const [getOTPVerify, { isSuccess: otpSent, error: otpError, isLoading: sendingOTP }] = useGetOTPVerifyMutation();
    const [userExist] = useUserExistMutation();
    const [forgotPasswordUpdate, { isSuccess,isError }] = useForgotPasswordUpdateMutation();
    const [verifyPop, setVerifyPop] = useState(false)
    const [otp, setOtp] = useState("")
    const [mailVerified, setMailVerified] = useState(false)
    const [userId, setUserId] = useState("")
    const handleSubmit = async () => {
        try {
            const user = await userExist(email).unwrap()
            console.log(user);
            if (user) {
                const userName = user.user.name
                setUserId(user.user._id)
                handleOtpSubmit(userName)
            } else {
                toast.error('User Not Found');
            }

        } catch {
            toast.error('Failed to send OTP. Please try again.');
        }
    };
    const handleOtpSubmit = async (userName: string) => {
        try {
            const response: any = await getOTPVerify({ userEmail: email, userName }).unwrap();
            if (response?.otp) {
                setOtp(response.otp)
                setVerifyPop(true)
            } else {
                console.log("No OTP returned in the response.");
            }
        } catch {
            toast.error('Failed to send OTP. Please try again.');
        }

    };
    useEffect(() => {
        if (otpSent) {
            toast.success('OTP sent to your email.');
        }
        if (otpError) {
            toast.error('Failed to send OTP.');
        }
    }, [otpSent, otpError]);

    const handleVerifySuccess = async () => {
        try {
            await forgotPasswordUpdate({ userId }).unwrap()
            setMailVerified(true)
            if (isSuccess) {
                setRoute('Login')
                toast.success("New password has been sent to your email.")
            }
            if(isError){
                toast.error('Failed to update OTP.');
            }
        } catch {
            console.log('Failed to send new Password. Please try again.');
        }

    };


    const containerClass = theme === 'dark' ? 'text-white' : 'text-gray-900';
    const buttonClass = theme === 'dark' ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-indigo-500 hover:bg-indigo-600';

    return (
        <div className={`flex flex-col  items-center justify-center ${containerClass}`}>
            <button
                className="absolute start-8 top-6 mb-4 focus:outline-none"
                onClick={() => setRoute('Login')}
                aria-label="Go back to Login"
            >
                <IoArrowBackCircle size={25} />
            </button>


            {
                mailVerified ? (
                    <>
                        <IoCheckmarkDoneCircleSharp size={50} color='green' />New Password sent to your email.

                    </>

                ) : (
                    <>
                        {
                            verifyPop ? (
                                <>

                                    <VerifyPop email={email} onVerifySuccess={handleVerifySuccess} otp={otp} setMailVerified={setMailVerified} />
                                </>
                            ) : (
                                <form
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        handleSubmit()

                                    }}
                                    className={`p-8 rounded-lg shadow-lg w-full max-w-md ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}
                                >
                                    <h2 className="text-2xl font-bold text-center mb-6">Verify Your Email</h2>
                                    <div className="mb-4">
                                        <label htmlFor="email" className="block mb-2 font-medium">Email</label>
                                        <input
                                            id="email"
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="w-full px-3 py-2 mt-1 text-gray-500 bg-gray-200 border border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:text-gray-400 focus:outline-none"
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className={`w-full p-3 text-white font-semibold rounded-md ${buttonClass} `}
                                        disabled={sendingOTP}
                                    >
                                        {
                                            sendingOTP ? (
                                                <div> SENDING...</div>
                                            ) : (
                                                <div> Send OTP</div>
                                            )
                                        }
                                    </button>
                                </form>

                            )
                        }
                    </>

                )
            }


        </div >

    );
};

export default ChangePassword;
