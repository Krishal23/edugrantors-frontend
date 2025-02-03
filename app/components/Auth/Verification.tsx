import React, { FC, useRef, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { VscWorkspaceTrusted } from 'react-icons/vsc';
import { useTheme } from 'next-themes';
import { useSelector } from 'react-redux';
import { useActivationMutation, useRegisterMutation } from '../../redux/features/auth/authApi'; // Adjust the path based on your folder structure


type Props = {
    setRoute: (route: string) => void;
    submissionDataStore: any;
    setSubmissionDataStore: (data: any) => void;
    isResend: boolean;
    setIsResend: (isResend: boolean) => void;
}

type VerifyNumber = {
    "0": string;
    "1": string;
    "2": string;
    "3": string;
}

const Verification: FC<Props> = ({ setRoute, submissionDataStore, setSubmissionDataStore, setIsResend, isResend }) => {
    const { token } = useSelector((state: any) => state.auth);
    const [activation, { isSuccess, error }] = useActivationMutation();
    const { theme } = useTheme();
    const [invalidError, setInvalidError] = useState<boolean>(false);
    const [register, { data, isSuccess:isSuccessReg, error:isErrorReg }] = useRegisterMutation();

     useEffect(() => {
            if (isSuccessReg) {
                toast.success(data?.message || 'Registration successful');
                setRoute('Verification');
            }
            if (isErrorReg && 'data' in isErrorReg) {
                toast.error((isErrorReg as any).data?.message || 'Registration failed');
            }
        }, [isSuccessReg, isErrorReg, data, setRoute]);


    useEffect(() => {
        if (isSuccess) {
            toast.success("Account activated successfully");
            setRoute("Login");
        };
        if (error) {
            if ("data" in error) {
                const errorData = error as any;
                toast.error(errorData.data.message)
                setInvalidError(true)
            } else {
                console.log('An error occured', error);
            }
        }

    }, [isSuccess, error, setRoute]);


    const inputRefs = [
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null)
    ];
    const [verifyNumber, setVerifyNumber] = useState<VerifyNumber>({
        0: "",
        1: "",
        2: "",
        3: "",
    });

    const [resendAvailable, setResendAvailable] = useState<boolean>(false);
    const [countdown, setCountdown] = useState<number>(30);

    // Countdown effect
    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (countdown > 0) {
            timer = setTimeout(() => setCountdown(countdown - 1), 1000);
        } else {
            setResendAvailable(true);
        }
        return () => clearTimeout(timer);
    }, [countdown]);

    const handleResend = async () => {
        toast("Code resent!");
        // setIsResend(true);
        await register(submissionDataStore);

        setResendAvailable(false);
        setCountdown(30); 
    };

    const verificationHandler = async () => {
        const verificationNumber = Object.values(verifyNumber).join('');
        if (verificationNumber.length != 4) { 
            setInvalidError(true);
            return;
        }
        await activation({
            activation_token: token,
            activation_code: verificationNumber,
        })
    }

    const handleInputChange = (index: number, value: string) => {
        setInvalidError(false);
        const newVerifyNumber = { ...verifyNumber, [index]: value };
        setVerifyNumber(newVerifyNumber);

        if (value === "" && index > 0) {
            inputRefs[index - 1].current?.focus();
        } else if (value.length === 1 && index < 3) {
            inputRefs[index + 1].current?.focus();
        }
    }

    // Dynamic theme-based classes
    const containerClass = theme === 'dark' ? 'bg-gray-900 text-white' : 'text-gray-900';
    const formClass = theme === 'dark' ? 'bg-gray-800' : 'bg-white';
    const inputClass = theme === 'dark' ? 'border-gray-600 focus:border-indigo-500 bg-gray-700 text-gray-200' : 'border-gray-300 focus:border-indigo-500 bg-gray-50';
    const buttonClass = theme === 'dark' ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-indigo-500 hover:bg-indigo-600';
    const errorClass = 'text-red-500 text-sm mt-1';

    return (
        <div>
            <h2 className={`text-2xl font-bold text-center mb-6 ${containerClass}`}>Verify Your Account</h2>
            <h6 className={`text-sm font-light text-center mb-6 ${containerClass}`}>We have sent an OTP to your email</h6>
            {/* Icon */}
            <div className="flex items-center justify-center mb-6">
                <div className="flex items-center justify-center w-[80px] h-[80px] rounded-full bg-[#497DF2]">
                    <VscWorkspaceTrusted size={40} className="text-white" />
                </div>
            </div>

            <div className={`   flex items-center justify-around ${containerClass}`}>
                {Object.keys(verifyNumber).map((key, index) => (
                    <input
                        type="number"
                        key={key}
                        ref={inputRefs[index]}
                        maxLength={1}
                        value={verifyNumber[key as keyof verifyNumber]}

                        onChange={(e) => handleInputChange(index, e.target.value)}
                        className={`w-12 h-12 m-[2px] text-center text-2xl border rounded-md ${inputClass} ${invalidError
                                ? "shake border-red-500"
                                : "dark:border-white border-[#0000004a] "
                            }`}
                    />
                ))}
            </div>
            {invalidError && (
                <p className={errorClass}>Invalid code, please try again.</p>
            )}
            {/* Submit Button */}
            <button
                type="button"
                onClick={verificationHandler}
                className={`w-full mt-6 text-white p-3 rounded-md font-semibold transition duration-300 ${buttonClass}`}
            >
                Verify
            </button>

            <p className={`mt-4 text-center ${containerClass}`}>
                Didn't receive a code?{" "}
                {resendAvailable ? (
                    <span
                        className="text-[#2190ff] cursor-pointer"
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

export default Verification;
