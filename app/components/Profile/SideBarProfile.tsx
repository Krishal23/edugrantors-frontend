"use client";
import React, { FC } from "react";

import { useTheme } from "next-themes";
import { RiLockPasswordLine } from "react-icons/ri";
import { SiCoursera } from "react-icons/si";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import Link from "next/link";

type Props = {
  user: any;
  active: number;
  avatar: string | null;
  setActive: (active: number) => void;
  logOutHandler: any;
};

const avatarDefault = "/assets/6.png";
const SideBarProfile: FC<Props> = ({
  user,
  active,
  avatar,
  setActive,
  logOutHandler,
}) => {
  const { theme } = useTheme();

  // Theme-specific classes for dark and light mode
  const containerClass =
    theme === "dark"
      ? "bg-gray-900 text-gray-300"
      : "bg-gray-200 text-gray-900";
  const profileClass = theme === "dark" ? " text-white" : " text-gray-900";
  const hoverClass =
    theme === "dark"
      ? "hover:bg-gray-600 hover:text-white"
      : "hover:bg-gray-300 hover:text-gray-900";
  const activeClass =
    theme === "dark" ? "bg-gray-700 text-white" : "bg-gray-400 text-white";
  const logoutButtonClass =
    theme === "dark"
      ? "bg-red-600 hover:bg-red-700"
      : "bg-red-500 hover:bg-red-600";

  return (
    <div
      className={`w-full flex flex-col items-center ${containerClass} h-full p-1 pb-6 shadow-xl dark:shadow-sm`}
    >
      {/* Profile Section */}
      <div
        className={`w-full overflow-clip flex flex-col items-center px-4 py-5 cursor-pointer rounded-md transition-all duration-300 ${
          active === 1 ? activeClass : hoverClass
        }`}
        onClick={() => setActive(1)}
      >
        <img
          src={
            user.avatar || avatar ? user.avatar.url || avatar : avatarDefault
          }
          alt=""
          className="w-14 h-14 rounded-full shadow-lg"
          width={56}
          height={56}
        />
        <div className="mt-3 text-center">
          <h2
            className={`sm:text-sm xxs:text-[10px] font-semibold font-Poppins ${profileClass} `}
          >
            {user.name || "Guest"}
          </h2>
          <p className="sm:text-xs xxs:text-[6px] font-Poppins text-gray-900 dark:text-gray-300">
            {user.email || "guest@example.com"}
          </p>
        </div>
      </div>

      {/* Sidebar Menu */}
      <div className="mt-8 w-full">
        <ul className="w-full flex flex-col space-y-2">
          <li>
            {(user.role === "admin" || user.role === "teacher") && (
              <Link
                className={`w-full flex gap-3 sm:px-6 xxs:px-3 py-3 sm:text-sm xxs:text-[10px] font-semibold cursor-pointer rounded-lg transition-colors duration-200 ${
                  active === 0 ? activeClass : hoverClass
                }`}
                href={"/admin"}
              >
                <MdOutlineAdminPanelSettings size={20} />
                {user.role === "admin" ? <>Admin</> : <>Teacher</>} Dashboard
              </Link>
            )}
          </li>
          <li>
            <div
              className={`w-full flex gap-3 sm:px-6 xxs:px-3 py-3 sm:text-sm xxs:text-[10px] font-semibold cursor-pointer rounded-lg transition-colors duration-200 ${
                active === 2 ? activeClass : hoverClass
              }`}
              onClick={() => setActive(2)}
            >
              <SiCoursera size={20} />
              Enrolled Courses
            </div>
          </li>
          <li>
            <div
              className={`w-full flex gap-3 sm:px-6 xxs:px-3 py-3 sm:text-sm xxs:text-[10px] font-semibold cursor-pointer rounded-lg transition-colors duration-200 ${
                active === 3 ? activeClass : hoverClass
              }`}
              onClick={() => setActive(3)}
            >
              <RiLockPasswordLine size={20} />
              Change Password
            </div>
          </li>
        </ul>
      </div>
      <div className=" mt-auto w-full px-6">
        <button
          className={`w-full  text-white sm:text-sm xxs:text-[10px] font-medium py-2 rounded-md transition-colors duration-300 ${logoutButtonClass}`}
          onClick={logOutHandler}
        >
          Log Out
          {/* <AiOutlineLogout size={20} /> */}
        </button>
      </div>
    </div>
  );
};

export default SideBarProfile;
