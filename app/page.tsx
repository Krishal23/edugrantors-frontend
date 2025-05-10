'use client'
import React, { useState } from "react";
import dynamic from "next/dynamic";
import Heading from "./utils/Heading";
import Header from "./components/Header";
import Loader from "./components/Loader/Loader";  


const Hero = dynamic(() => import("./components/Routes/Hero"), {
  loading: () => <Loader />,
});
const Courses = dynamic(() => import("./components/Routes/Courses"), {
  loading: () => <Loader message="Loading Courses..."/>,
});
const Reviews = dynamic(() => import("./components/Routes/Reviews"), {
  loading: () => <Loader message="Loading Reviews"/>,
});
const FAQ = dynamic(() => import("./components/FAQ/FAQ"), {
  loading: () => <Loader message="Loading Faqs"/>,
});
const Footer = dynamic(() => import("./components/Footer"), {
  loading: () => <Loader message="Loading Footer"/>,
});


const Page = () => {
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
      <Hero />
      <Courses />
      <Reviews />
      <FAQ />
      <Footer />
    </div>
  );
};

export default Page;
