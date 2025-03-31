"use client";
import Link from "next/link";
import React, { FC, useState, useEffect } from "react";
import NavItems from "../utils/NavItems";
import ThemeSwitcher from "../utils/ThemeSwitcher";
import { HiOutlineMenuAlt3, HiOutlineUserCircle } from "react-icons/hi";
import CustomModal from "../utils/CustomModal";
import { useTheme } from "next-themes";
import { useSelector } from "react-redux";

import { useSession } from "next-auth/react";
import { useSocialAuthMutation } from "../redux/features/auth/authApi";
import toast from "react-hot-toast";
import dynamic from "next/dynamic";
import Loader from "./Loader/Loader";

// Lazy loading for the modals
const Login = dynamic(() => import("./Auth/Login"), {
  loading: () => <Loader />,
});
const SignUp = dynamic(() => import("./Auth/SignUp"), {
  loading: () => <Loader />,
});
const Verification = dynamic(() => import("./Auth/Verification"), {
  loading: () => <Loader />,
});
const VerifyOTPPassword = dynamic(() => import("./Auth/VerifyOTPPassword"), {
  loading: () => <Loader />,
});

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  activeItem: number;
  route: string;
  setRoute: (route: string) => void;
};

const Header: FC<Props> = ({ open, setOpen, activeItem, route, setRoute }) => {
  const avatar = "/assets/6.png";
  const avatarDefault = "/assets/6.png";
  const logo = "/assets/edugrantorsLogo.png";
  const blueLogo = "/assets/blueLogo.png";

  const [active, setActive] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);
  const { user } = useSelector((state: any) => state.auth);
  const { data } = useSession();
  const [socialAuth, { isSuccess, error }] = useSocialAuthMutation();
  const [logout, setLogout] = useState(false);
  const [submissionDataStore, setSubmissionDataStore] = useState({});
  const [isResend, setIsResend] = useState(false);
  const [itemActive, setItemActive] = useState(activeItem);
  const { theme } = useTheme();

  useEffect(() => {
    if (!user) {
      if (data) {
        socialAuth({
          email: data?.user?.email,
          name: data?.user?.name,
          avatar: data?.user?.image,
        });
      }
    }
    if (data === null) {
      if (isSuccess) {
        toast.success("Login Successfully");
      }
    }
    if (data === null) {
      setLogout(true);
    }
  }, [data, user]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleScroll = () => {
        setActive(window.scrollY > 80);
      };
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, []);

  const handleClose = (e: { target: { id: string } }) => {
    if (e.target.id === "screen") {
      setOpenSidebar(false);
    }
  };
  // Helper function to set profile as activeItem
  const profileHighlight = () => {
    setItemActive(10);
  };

  return (
    <div className="w-full relative">
      <div
        className={`${
          active
            ? "dark:bg-opacity-50 dark:bg-gradient-to-b dark:from-gray-900 dark:to-black fixed bg-white top-0 left-0 w-full h-[80px] z-[80] border-b dark:border-[#ffffff1c] shadow-xl transition duration-500 "
            : "w-full border-b dark:border-[rgba(255,255,255,0.11)] h-[80px] z-[80] dark:shadow "
        }`}
      >
        <div className="w-[95%] 800px:w-[92%] m-auto py-2 h-full">
          <div className="w-full h-[80px] flex items-center justify-between p-3">
            <Link
              href="/"
              className="text-[25px] font-Poppins font-[500] text-black dark:text-white"
            >
              {/* EDU GRANTORS */}
              <img
                src={theme === "dark" ? logo : blueLogo}
                alt="User Avatar"
                width={180}
                height={180}
                className="mb-4"
              />
            </Link>
            <div className="flex items-center">
              <NavItems activeItem={setItemActive} isMobile={false} />
              <div className="800px:hidden m-2">
                <HiOutlineMenuAlt3
                  size={25}
                  className="cursor-pointer dark:text-white text-black"
                  onClick={() => setOpenSidebar(true)}
                />
              </div>

              {user ? (
                <Link href="/profile">
                  <img
                    src={user?.avatar?.url || avatar || avatarDefault}
                    alt="User Avatar"
                    width={45}
                    height={45}
                    className="rounded-full border-2 border-[#37a39a] w-[40px] h-[40px] shadow-md"
                    onClick={profileHighlight} // Highlight the profile tab
                  />
                </Link>
              ) : (
                <HiOutlineUserCircle
                  size={25}
                  className="cursor-pointer mx-4 dark:text-white text-black"
                  onClick={() => setOpen(true)}
                />
              )}
              <ThemeSwitcher />
            </div>
          </div>
        </div>

        {openSidebar && (
          <div
            className="fixed w-full h-screen top-0 left-0 z-[99999] dark:bg-[unset] bg-[#00000024]"
            onClick={handleClose}
            id="screen"
          >
            <div className="fixed w-[70%] h-screen top-0 right-0 z-[99999999999] dark:bg-slate-900 bg-[#ffffff]">
              <NavItems activeItem={activeItem} isMobile={true} />
              {user ? (
                <Link href="/profile">
                  <img
                    className="rounded-full border-2 border-[#37a39a] ml-4 w-[60px] h-[60px] shadow-md"
                    src={user?.avatar?.url || avatar || avatarDefault}
                    alt="User Avatar"
                    width={50}
                    height={50}
                  />
                </Link>
              ) : (
                <HiOutlineUserCircle
                  size={25}
                  className="cursor-pointer mx-4 dark:text-white text-black"
                  onClick={() => setOpen(true)}
                />
              )}
              <p className="text-[16px] px-2 pl-5 text-black dark:text-white">
                Copyright &copy; 2023 EDU GRANTORS
              </p>
            </div>
          </div>
        )}

        {/* Conditionally Render Modals */}
        {/* {route === "Login" && open && (
                    <CustomModal open={open} setOpen={setOpen} setRoute={setRoute} activeItem={activeItem} component={Login} />
                )}
                {route === "Sign-Up" && open && (
                    <CustomModal open={open} setOpen={setOpen} setRoute={setRoute} activeItem={activeItem} component={SignUp} submissionDataStore={submissionDataStore} setSubmissionDataStore={setSubmissionDataStore} isResend={isResend} setIsResend={setIsResend}/>
                )}
                {route === "Verification" && open && (
                    <CustomModal open={open} setOpen={setOpen} setRoute={setRoute} activeItem={activeItem} component={Verification} submissionDataStore={submissionDataStore} setSubmissionDataStore={setSubmissionDataStore} isResend={isResend} setIsResend={setIsResend} />
                )}
                {route === "forgot-password" && open && (
                    <CustomModal open={open} setOpen={setOpen} setRoute={setRoute} activeItem={activeItem} component={VerifyOTPPassword} />
                )} */}

        {route === "Login" && open && (
          <CustomModal
            open={open}
            setOpen={setOpen}
            activeItem={activeItem}
            setRoute={setRoute}
            component={Login}
          />
        )}
        {route === "Sign-Up" && open && (
          <CustomModal
            open={open}
            setOpen={setOpen}
            activeItem={activeItem}
            setRoute={setRoute}
            component={SignUp}
            isResend={isResend}
            setIsResend={setIsResend}
            submissionDataStore={submissionDataStore}
            setSubmissionDataStore={setSubmissionDataStore}
          />
        )}
        {route === "Verification" && open && (
          <CustomModal
            open={open}
            setOpen={setOpen}
            activeItem={activeItem}
            setRoute={setRoute}
            component={Verification}
            isResend={isResend}
            setIsResend={setIsResend}
            submissionDataStore={submissionDataStore}
            setSubmissionDataStore={setSubmissionDataStore}
          />
        )}
        {route === "forgot-password" && open && (
          <CustomModal
            open={open}
            setOpen={setOpen}
            activeItem={activeItem}
            setRoute={setRoute}
            component={VerifyOTPPassword}
          />
        )}
      </div>
    </div>
  );
};

export default Header;
