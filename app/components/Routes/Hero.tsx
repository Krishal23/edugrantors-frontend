"use client";
import Link from "next/link";
import React, { FC } from "react";
import { useTheme } from "next-themes";

const Hero: FC = () => {
  const { theme } = useTheme();
  const logo = "/assets/edugrantorsLogo.png";
  const blueLogo = "/assets/blueLogo.png";

  const containerClass =
    theme === "dark"
      ? "bg-gradient-to-b from-gray-900 to-black text-white"
      : "bg-white text-black";
  const buttonClass =
    theme === "dark"
      ? "bg-[#1f2937] hover:bg-[#7c3aed]"
      : "bg-[#e0e0e0] hover:bg-[#7c3aed]";

  return (
    <div
      className={`w-full min-h-screen flex items-center justify-center ${containerClass} relative`}
    >
      <div className="max-w-[1100px] w-[90%] mx-auto relative">
        {/* Background Section */}
        <div className="flex flex-col items-center justify-center">
          <img
            src={theme === "dark" ? logo : blueLogo}
            alt="User Avatar"
            width={360}
            height={360}
            className=" hidden md:block mb-4 mt-[-14px]"
          />
          {/* Header Text Section */}
          <div className="text-center py-4">
            <h1 className="text-4xl font-bold mb-4 leading-snug">
              Achieve Your <span className="text-[#7c3aed]">Dreams</span> with
              Our
              <br /> Expert{" "}
              <span className="text-[#7c3aed]">IITians & NITians</span>
            </h1>
            <p className="text-[1.5rem] mt-4 text-black dark:text-[#9CA3AF]">
              <span>
                500+ students have already benefited from this opportunity—what
                are you waiting for?
              </span>
              Join now and take the first step toward your success!
            </p>
          </div>

          {/* Call to Action Button */}
          <div className="mt-6">
            <Link
              href="/courses"
              className={`px-6 py-3 text-lg rounded-full transition-all duration-300 ${buttonClass}`}
            >
              Explore Courses
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
