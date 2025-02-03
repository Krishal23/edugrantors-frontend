"use client";
import React from "react";
import { useTheme } from "next-themes";

const robins = "/assets/team/robins.png";
const ashok = "/assets/team/TKSS_ASHOK.jpg";
const yash = "/assets/team/yash.jpg";

const Team = () => {
  const { theme } = useTheme();

  const containerClass =
    theme === "dark"
      ? "bg-gradient-to-b from-gray-900 to-black text-white"
      : "bg-white text-gray-900";

  const teamMembers = [
    { name: "Robins", college: "IIT Patna", image: robins },
    { name: "TKSS Ashok", college: "IIT Bombay", image: ashok },
    { name: "Yash", college: "IIT Roorkee", image: yash },
  ];

  return (
    <div className={`w-full min-h-screen py-4 ${containerClass}`}>
      <div className="parallax bg-fixed bg-center bg-cover relative">
        <div className="flex items-center justify-center h-full">
          <h1 className="text-5xl font-bold text-white drop-shadow-lg">
            Our Team
          </h1>
        </div>
      </div>
      <div className="max-w-[1100px] mx-auto text-center mt-12">
        <p className="text-lg text-gray-500 dark:text-gray-400 mb-12">
          A passionate team of IITians and NITians committed to guiding you
          toward success.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="flex flex-col items-center bg-gray-100 dark:bg-gray-800 rounded-lg p-6 shadow-lg"
            >
              <img
                src={member.image}
                alt={member.name}
                width={120}
                height={120}
                className="rounded-full mb-4"
              />
              <h2 className="text-xl font-semibold mb-2">{member.name}</h2>
              <p className="text-gray-500 dark:text-gray-400">
                {member.college}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Team;
