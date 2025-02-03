'use client'
import React, { FC, useState, useEffect } from 'react';
import { useLogOutQuery } from '../../redux/features/auth/authApi';
import { signOut } from "next-auth/react"
import Loader from '../Loader/Loader';
import dynamic from 'next/dynamic';
import { useSelector } from 'react-redux';

const EnrolledCourses = dynamic(() => import('./EnrolledCourses'), {
    loading: () => <Loader message='Loading Courses...'/>,
  });
const UpdatePassword = dynamic(() => import('./UpdatePassword'), {
    loading: () => <Loader message='Loading, please wait...'/>,
  });
const SideBarProfile = dynamic(() => import('./SideBarProfile'), {
    loading: () => <Loader message='Loading Sidebar...'/>,
  });
const ProfileInfo = dynamic(() => import('./ProfileInfo'), {
    loading: () => <Loader message='Loading Profile...'/>,
  });

type Props = {};

const Profile: FC<Props> = () => {
    const [scroll, setScroll] = useState(false);
    const [avatar, setAvatar] = useState(null);
    const [active, setActive] = useState(1);
    const [logout, setLogout] = useState(false);

    const { user } = useSelector((state: any) => state.auth);
    

    const { } = useLogOutQuery(undefined, {
        skip: !logout ? true : false,
    });

    const logOutHandler = async () => {
        setLogout(true);
        await signOut();
    };

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 85) {
                setScroll(true);
            } else {
                setScroll(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll); // Clean up to prevent memory leak
        };
    }, []);

    return (
        <div className="flex w-[85%] mx-auto">
            <div
                className={`w-[30vw]  h-[450px] bg-slate-900 bg-opacity-90 shadow-xl dark:shadow-lg rounded-[25px] shadow-sm mt-[60px] mr-4 mb-[80px] sticky transition-all duration-300 ${scroll ? "top-[110px]" : "top-[30px]"
                    } left-[30px]`}
            >
                <SideBarProfile
                    user={user}
                    active={active}
                    avatar={avatar}
                    setActive={setActive}
                    logOutHandler={logOutHandler}
                />
            </div>
            {
                active === 1 && (
                    <div
                        className=" w-[50vw]  h-full bg-transparent mt-[70px] "
                    >
                        <ProfileInfo
                            avatar={avatar}
                            user={user}
                        />
                    </div>
                )
            }
            {
                active === 2 && (
                    <div
                    className=" w-[50vw]  h-full bg-transparent mt-[70px] "
                    >
                        <EnrolledCourses/>
                    </div>
                )
            }
            {
                active === 3 && (
                    <div
                        className=" w-[50vw]   h-full bg-transparent mt-[70px] "
                    >
                        <UpdatePassword/>
                    </div>
                )
            }
        </div>
    );
};

export default Profile;
