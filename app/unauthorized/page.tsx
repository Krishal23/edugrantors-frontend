'use client';
import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Heading from "../utils/Heading";
import { IoBanOutline } from "react-icons/io5";

const Unauthorized = () => {

    const [open, setOpen] = useState(false);
    const [activeItem,] = useState(0);
    const [route, setRoute] = useState("Login");
    return (

        <div>
            <Heading
                title="EDU GRANTORS"
                description="EDU GRANTORS is a platform for learning."
                keywords="Programming, Mern"
            />
            <Header
                open={open}
                setOpen={setOpen}
                activeItem={activeItem}
                setRoute={setRoute}
                route={route}
            />
            <div className="flex flex-col items-center justify-center h-screen text-center px-4">

                <span className="text-4xl font-bold text-red-600 mb-4"> <IoBanOutline size={40} />Unauthorized Access</span>
                
                <p className="text-lg text-gray-600 mb-6">
                    You do not have permission to view this page.
                </p>
            </div>
            <Footer />
        </div>

    );
};

export default Unauthorized;
