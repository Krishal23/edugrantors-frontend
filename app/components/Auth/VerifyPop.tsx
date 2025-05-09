'use client';

import React, { FC, useRef, useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import toast from 'react-hot-toast';

// Define the props for VerifyPop
interface VerifyPopProps {
    email: string;
    onVerifySuccess: () => void;
    otp:string;
    setMailVerified:any;
}
const inputRefs = Array.from({ length: 4 }, () => useRef<HTMLInputElement>(null));

const VerifyPop: FC<VerifyPopProps> = ({ email,otp,setMailVerified, onVerifySuccess }) => {
    const { theme } = useTheme();
    const [verifyCode, setVerifyCode] = useState<{ [key: number]: string }>({
        0: '',
        1: '',
        2: '',
        3: ''
    });
    const [resendAvailable, setResendAvailable] = useState(false);
    const [countdown, setCountdown] = useState(30);
    const [invalidError, setInvalidError] = useState(false);


    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (countdown > 0) {
            timer = setTimeout(() => setCountdown(countdown - 1), 1000);
        } else {
            setResendAvailable(true);
        }
        return () => clearTimeout(timer);
    }, [countdown]);

    const handleInputChange = (index: number, value: string) => {
        setInvalidError(false);
        setVerifyCode({ ...verifyCode, [index]: value });

        if (value === '' && index > 0) {
            const nextInput = inputRefs[index - 1];
            if (nextInput && nextInput.current) {
                nextInput.current.focus();
            }
        } else if (value.length === 1 && index < 3) {
            const nextInput = inputRefs[index + 1];
            if (nextInput && nextInput.current) {
                nextInput.current.focus();
            }
        }
    };

    const handleVerifySubmit = () => {
        const code = Object.values(verifyCode).join('');

        if (code.length !== 4) {
            setInvalidError(true);
            toast.error('Invalid code. Please try again.');
            return;
        }
        if(code===otp){
            toast.success('Verification successful!');
            setMailVerified(true)
            onVerifySuccess();
        } else{
            setVerifyCode({
                0: '',
                1: '',
                2: '',
                3: ''
            })
            toast.error('OTP not matched')
        }

    };

    const handleResend = () => {
        toast('OTP has been resent!');
        setResendAvailable(false);
        setCountdown(30);
    };

    const containerClass = theme === 'dark' ? 'text-white' : 'text-gray-900';
    const inputClass = theme === 'dark' ? 'border-gray-600 bg-gray-700 text-gray-200' : 'border-gray-300 bg-gray-50';
    const buttonClass = theme === 'dark' ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-indigo-500 hover:bg-indigo-600';
    const errorClass = 'text-red-500 text-sm mt-1';

    return (
        <div className={`p-6 rounded-lg shadow-lg w-full max-w-md ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
            <h2 className="text-2xl font-bold text-center mb-4">Enter Verification Code</h2>
            <p className="text-center mb-6">We sent a code to your email: <span className="font-semibold">{email}</span></p>
            <div className="flex justify-center space-x-4 mb-4">
                {Object.keys(verifyCode).map((_key, index) => (
                    <input
                        key={index}
                        ref={inputRefs[index]}
                        type="text"
                        maxLength={1}
                        value={verifyCode[index] || ''}
                        onChange={(e) => handleInputChange(index, e.target.value)}
                        className={`w-12 h-12 text-center text-2xl border rounded-md ${inputClass} ${invalidError ? 'border-red-500' : ''}`}
                    />
                ))}
            </div>
            {invalidError && <p className={errorClass}>Please enter a valid 4-digit code.</p>}

            <button
                onClick={handleVerifySubmit}
                className={`w-full py-3 mt-4 text-white font-semibold rounded-md ${buttonClass}`}
            >
                Verify
            </button>

            <p className={`mt-4 text-center ${containerClass}`}>
                Didn&apos;t receive a code?{' '}
                {resendAvailable ? (
                    <span
                        className="text-blue-500 cursor-pointer"
                        onClick={handleResend}
                    >
                        Resend Code
                    </span>
                ) : (
                    <span className="text-gray-500">Resend available in {countdown}s</span>
                )}
            </p>
        </div>
    );
};

export default VerifyPop;
