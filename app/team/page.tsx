"use client";
import React from "react";
import { useTheme } from "next-themes";
import { FaLinkedin, FaGithub } from "react-icons/fa";

const mayank = "/assets/team/mayank.png";
const kushal = "/assets/team/kushal.jpeg";
const dhoni = "/assets/team/dhoni.jpeg";
const sachin = "/assets/team/sachin.png";
const atul = "/assets/team/dummy.png";
const himanshu = "/assets/team/himanshu.png";
const karan = "/assets/team/karan.jpeg";
const robin = "/assets/team/robins.png";



const Team = () => {
  const { theme } = useTheme();

  const containerClass =
    theme === "dark"
      ? "bg-gradient-to-b from-gray-900 to-black text-white"
      : "bg-white text-gray-900";

  const teamMembers = [
    { name: "Robins", role: "Founder", college: "IIT Patna", image: robin, Linkedin: "https://www.linkedin.com/in/robins-033862241/" },
    { name: "Karan Kumar Das", role: "Developer", college: "IIT BHU", image: karan, Linkedin: "https://www.linkedin.com/in/karan-iitbhu/", github: "https://github.com/karankoder" },
    { name: "Kushal Kesharwani ", role: "Developer", college: "IIT Patna ", image: kushal, Linkedin: "https://www.linkedin.com/in/kushal-kesharwani-49000525b/", github: "https://github.com/Krishal23" },
    { name: "Mayank Jha", role: "Developer", college: "IIT Patna", image: mayank, Linkedin: "https://www.linkedin.com/in/mayank-jha-aaa4b5289/" },
    // { name: "Atul Raj Chaudhary", role: "Developer", college: "IIT Patna ", image: atul, Linkedin: "https://www.linkedin.com/in/atul-raj-b3b4b630a/" },
    // { name: "Himanshu Kumar", role: "Developer", college: "IIT Patna ", image: himanshu, Linkedin: "https://www.linkedin.com/in/himanshu-kumar-b2a7b0282/" },
    { name: "Dhoni naik Gugulothu", role: "Creative Lead", college: "IIT Patna", image: dhoni, Linkedin: "https://www.linkedin.com/in/dhoni-naik-gugulothu-74a95a298/" },
    { name: "Sachin Kumar", role: "Creative Lead", college: "IIT Patna", image: sachin },

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
              {
                member.role && <h5 className="text-lg font-medium text-gray-600 dark:text-gray-300 mb-1">{member.role}</h5>
              }
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                {member.college}
              </p>

              {/* Social Icons Container */}
              <div className="flex gap-4 mt-auto">
                {member.Linkedin && (
                  <a
                    href={member.Linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#0077b5] hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-300"
                    aria-label={`${member.name}'s LinkedIn`}
                  >
                    <FaLinkedin size={24} />
                  </a>
                )}
                {member.github && (
                  <a
                    href={member.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-900 hover:text-gray-600 dark:text-white dark:hover:text-gray-300 transition-colors duration-300"
                    aria-label={`${member.name}'s GitHub`}
                  >
                    <FaGithub size={24} />
                  </a>
                )}
              </div>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Team;