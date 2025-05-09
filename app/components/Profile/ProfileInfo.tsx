import React, { FC, useEffect, useState } from "react";

import { AiOutlineCamera } from "react-icons/ai";
import {
  useEditProfileMutation,
  useUpdateAvatarMutation,
} from "@/app/redux/features/user/userApi";
import { useLoadUserQuery } from "@/app/redux/features/api/apiSlice";
import toast from "react-hot-toast";

type Props = {
  avatar: string | null;
  user: any;
};

const ProfileInfo: FC<Props> = ({ avatar, user }) => {
  const avatarIcon = "/assets/6.png";
  const [name, setName] = useState(user?.name || "");
  const [contactNumber, setContactNumber] = useState(user?.contactnumber || "");
  const [classes, setClasses] = useState(user?.classes || "");
  const [stream, setStream] = useState(user?.stream || "");
  const [targetYear, setTargetYear] = useState(user?.targetYear || "");
  const [gender, setGender] = useState(user?.gender || "");
  const [loadUser, setLoadUser] = useState(false);
  const {} = useLoadUserQuery(undefined, { skip: loadUser ? false : true });
  const [editProfile, { isLoading, isSuccess: success, error: updateError }] =
    useEditProfileMutation();
  const [updateAvatar, { isLoading: isAvatarUpdating, isSuccess, error }] =
    useUpdateAvatarMutation();

  const imageHandler = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      const fileReader = new FileReader();

      fileReader.onload = () => {
        if (fileReader.readyState === 2) {
          const avatar = fileReader.result as string;
          if (typeof avatar === "string") {
            updateAvatar({ avatar });
          } else {
            console.error("FileReader result is not a string");
          }
        }
      };

      fileReader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (isSuccess || success) {
      setLoadUser(true);
      toast.success("Profile updated successfully");
    }
    if (error || updateError) {
      console.error(error);
    }
  }, [isSuccess, error, success, updateError]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (name) {
      await editProfile({
        name,
        contactNumber,
        classes,
        stream,
        targetYear,
        gender,
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full p-6  bg-gray-900 rounded-lg shadow-md">
      <div className="relative">
        {isAvatarUpdating ? (
          <div className="flex items-center justify-center rounded-full border-[3px] border-[#37a39a] sm:w-[120px] sm:h-[120px] xxs:w-[60px] xxs:h-[60px]">
            <div className="w-8 h-8 border-4 border-t-[#37a39a] border-gray-300 rounded-full animate-spin"></div>
          </div>
        ) : (
          <img
            src={user.avatar || avatar ? user.avatar.url || avatar : avatarIcon}
            alt="User Avatar"
            width={120}
            height={120}
            className="border-[3px] border-[#37a39a] sm:w-[120px] sm:h-[120px] xxs:w-[60px] xxs:h-[60px] rounded-full object-cover"
          />
        )}

        <input
          type="file"
          id="avatar"
          className="hidden"
          onChange={imageHandler}
        />
        <label htmlFor="avatar">
          <div className="absolute bottom-2 right-2 sm:w-[30px] sm:h-[30px] xxs:w-[10px] xxs:h-[10px] bg-slate-900 dark:bg-gray-100 rounded-full flex items-center justify-center cursor-pointer">
            <AiOutlineCamera size={20} className=" text-black" />
          </div>
        </label>
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center items-center mt-4 space-y-4 "
      >
        <div className="sm:flex gap-8 py-2">
          {/* Left Section */}
          <div>
            <InputField label="Name" value={name} onChange={setName} />
            <StaticField label="Email" value={user.email} />
            <InputField
              label="Contact Number"
              value={contactNumber}
              onChange={setContactNumber}
            />
          </div>

          {/* Right Section */}
          <div>
            {/* Class Selection */}
            <div>
              <label className="block mb-2 text-white font-medium sm:text-sm text-xs">
                Class
              </label>
              <select
                value={classes}
                onChange={(e) => {
                  setClasses(e.target.value);
                  setStream("");
                  setTargetYear("");
                }}
                className="w-full p-2 sm:text-sm text-xs  rounded-md border text-white bg-gray-900"
              >
                <option value="" disabled>
                  Select your class
                </option>
                {Array.from({ length: 8 }, (_, i) => (
                  <option key={i + 5} value={`Class ${i + 5}`}>
                    Class {i + 5}
                  </option>
                ))}
                <option value="JEE ">JEE</option>
                <option value="NEET">NEET</option>
              </select>
            </div>

            {/* Stream Selection (for Class 11/12) */}
            {(classes === "Class 11" || classes === "Class 12") && (
              <div>
                <label className="block mb-2 text-white font-medium sm:text-sm text-xs">
                  Stream
                </label>
                <select
                  value={stream}
                  onChange={(e) => setStream(e.target.value)}
                  className="w-full p-2 sm:text-sm text-xs text-white  rounded-md border bg-gray-900"
                >
                  <option value="" disabled>
                    Select your stream
                  </option>
                  <option value="PCM">PCM</option>
                  <option value="PCB">PCB</option>
                  <option value="Commerce">Commerce</option>
                  <option value="Arts">Arts</option>
                </select>
              </div>
            )}

            {/* Target Year Selection (for JEE/NEET) */}
            {(classes === "JEE" || classes === "NEET") && (
              <div>
                <label className="block mb-2 text-white font-medium sm:text-sm text-xs">
                  Target Year
                </label>
                <select
                  value={targetYear}
                  onChange={(e) => setTargetYear(e.target.value)}
                  className="w-full p-2 sm:text-sm text-xs text-white  rounded-md border bg-gray-900"
                >
                  <option value="" disabled>
                    Select your target year
                  </option>
                  {Array.from({ length: 4 }, (_, i) => {
                    const year = new Date().getFullYear() + i;
                    return (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    );
                  })}
                </select>
              </div>
            )}

            {/* Gender */}
            <div className="mb-4">
              <label
                htmlFor="gender"
                className={`block mb-2  text-white font-medium sm:text-sm text-xs `}
              >
                Gender
              </label>
              <select
                id="gender"
                name="gender"
                className="w-full p-2 sm:text-sm text-xs text-white  rounded-md border bg-gray-900"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="" disabled>
                  Select your gender
                </option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="px-6 sm:py-2 py-1 sm:text-lg  text-sm text-white bg-[#37a39a] rounded-md shadow-md hover:bg-[#2f8b7f] focus:outline-none"
        >
          {isLoading ? "Updating..." : "Update Profile"}
        </button>
      </form>
    </div>
  );
};

const InputField: FC<{
  label: string;
  value: string;
  onChange: (value: string) => void;
}> = ({ label, value, onChange }) => (
  <div className="w-full">
    <label
      htmlFor={label.toLowerCase()}
      className="block sm:text-sm text-xs font-medium  dark:text-gray-200"
    >
      {label}
    </label>
    <input
      type="text"
      id={label.toLowerCase()}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-3 py-2 mt-1 sm:text-sm text-xs  text-gray-900 bg-white border border-gray-300 rounded-md shadow-sm dark:bg-gray-800 dark:text-gray-200"
    />
  </div>
);

const StaticField: FC<{ label: string; value: string }> = ({
  label,
  value,
}) => (
  <div className="w-full">
    <label
      htmlFor={label.toLowerCase()}
      className="block sm:text-sm text-xs font-medium text-gray-700 dark:text-gray-200"
    >
      {label}
    </label>
    <input
      type="text"
      id={label.toLowerCase()}
      value={value}
      readOnly
      className="w-full px-3 py-2 mt-1 sm:text-sm text-xs  text-gray-500 bg-gray-200 border border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:text-gray-400"
    />
  </div>
);

export default ProfileInfo;
