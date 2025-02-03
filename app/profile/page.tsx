'use client'
import React, { FC, useState } from "react";
import Protected from '../hooks/useProtected';
import Heading from "../utils/Heading";
import Header from "../components/Header";
import Loader from "../components/Loader/Loader";
import dynamic from 'next/dynamic';

// Dynamically import the Profile component with a loader
const Profile = dynamic(() => import("../components/Profile/Profile"), {
  loading: () => <Loader message="Profile Loading" />, // Loader to show while Profile component is being loaded
});

type Props = {};

const Page: FC<Props> = () => {
  const [open, setOpen] = useState(false);
  const [activeItem] = useState(0);
  const [route, setRoute] = useState("Login");




  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Protected>
        <Heading
          title={`Profile - EDU GRANTORS`}
          description="EDUGRANTORS is a platform for learning."
          keywords="Programming, MERN"
        />
        <Header
          open={open}
          setOpen={setOpen}
          activeItem={activeItem}
          setRoute={setRoute}
          route={route}
        />
        {/* The Profile component is dynamically loaded */}
        <Profile />
      </Protected>
    </div>
  );
};

export default Page;
