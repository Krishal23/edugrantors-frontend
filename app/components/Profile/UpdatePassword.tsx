'use client';
import React, { FC, useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { useTheme } from 'next-themes';
import toast from 'react-hot-toast';
import { useUpdatePasswordMutation } from '@/app/redux/features/user/userApi';

type Props = {};

const schema = Yup.object().shape({
    oldPassword: Yup.string().required('Please enter your old password'),
    newPassword: Yup.string()
        .required('Please enter your new password')
        .min(6, 'Password must be at least 6 characters long'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
        .required('Please confirm your new password'),
});

const UpdatePassword: FC<Props> = ({}) => {
    const [showOld, setShowOld] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [updatePassword, { isSuccess, error }] = useUpdatePasswordMutation();

    const { theme } = useTheme();

    const formik = useFormik({
        initialValues: {
            oldPassword: '',
            newPassword: '',
            confirmPassword: '',
        },
        validationSchema: schema,
        onSubmit: async (values) => {
            await updatePassword(values);
        },
    });

    useEffect(() => {
        if (isSuccess) {
            toast.success('Password updated successfully');
            formik.resetForm();
        }
        if (error) {
            toast.error('Failed to update password');
        }
    }, [isSuccess, error, formik]);

    return (
        <div className="flex flex-col items-center justify-center w-full p-6 bg-gray-100 dark:bg-gray-900 rounded-lg shadow-md">
            <h2 className="mb-4 text-lg font-semibold text-gray-700 dark:text-gray-300">
                Update Password
            </h2>
            <form
                onSubmit={formik.handleSubmit}
                className="flex flex-col w-full max-w-md sm:max-w-lg lg:max-w-xl space-y-4"
            >
                {/* Old Password */}
                <PasswordField
                    label="Old Password"
                    name="oldPassword"
                    value={formik.values.oldPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    showPassword={showOld}
                    setShowPassword={setShowOld}
                    error={formik.touched.oldPassword && formik.errors.oldPassword}
                />

                {/* New Password */}
                <PasswordField
                    label="New Password"
                    name="newPassword"
                    value={formik.values.newPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    showPassword={showNew}
                    setShowPassword={setShowNew}
                    error={formik.touched.newPassword && formik.errors.newPassword}
                />

                {/* Confirm Password */}
                <PasswordField
                    label="Confirm Password"
                    name="confirmPassword"
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    showPassword={showConfirm}
                    setShowPassword={setShowConfirm}
                    error={formik.touched.confirmPassword && formik.errors.confirmPassword}
                />

                <button
                    type="submit"
                    className="w-full py-2 mt-4 sm:text-lg text-xs  text-white bg-[#37a39a] rounded-md shadow-md hover:bg-[#2f8b7f] focus:outline-none"
                >
                    {formik.isSubmitting ? 'Updating...' : 'Update Password'}
                </button>
            </form>
        </div>
    );
};

const PasswordField: FC<{
    label: string;
    name: string;
    value: string;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
    onBlur: React.FocusEventHandler<HTMLInputElement>;
    showPassword: boolean;
    setShowPassword: React.Dispatch<React.SetStateAction<boolean>>;
    error?: string | false;
}> = ({
    label,
    name,
    value,
    onChange,
    onBlur,
    showPassword,
    setShowPassword,
    error,
}) => (
    <div className="w-full">
        <label
            htmlFor={name}
            className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
        >
            {label}
        </label>
        <div className="relative">
            <input
                type={showPassword ? 'text' : 'password'}
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                className="w-full px-3 py-2 text-gray-900 bg-white border border-gray-300 rounded-md shadow-sm dark:bg-gray-800 dark:text-gray-200 focus:outline-none"
            />
            <div
                className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
            >
                {showPassword ? (
                    <AiOutlineEyeInvisible className="text-gray-500 dark:text-gray-400" />
                ) : (
                    <AiOutlineEye className="text-gray-500 dark:text-gray-400" />
                )}
            </div>
        </div>
        {error && <p className="mt-2 text-xs text-red-500">{error}</p>}
    </div>
);

export default UpdatePassword;
