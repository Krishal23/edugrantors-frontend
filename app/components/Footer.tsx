// components/Footer.tsx
'use client';
import React from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTelegram, FaYoutube } from 'react-icons/fa';
import { FaXTwitter } from "react-icons/fa6";
const Footer: React.FC = () => {
  const { theme } = useTheme();

  // Dynamic styling based on theme
  const containerClass = theme === 'dark'
    ? 'bg-gray-900 text-white'
    : 'bg-gray-100 text-gray-800';

  return (
    <footer className={`w-full py-10 ${containerClass}`}>
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-start px-6 md:px-10">
        <div className="mb-8 md:mb-0 w-full md:w-1/3">
          <h2 className="text-3xl font-bold mb-4">Join Our Community</h2>
          <p className="mb-4">Stay updated with our latest courses, events, and resources.</p>
          <div className="flex space-x-4">
            <a href="https://www.facebook.com/share/17vtyh1pQ4/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-600 transition-colors duration-300">
              <FaFacebookF size={24} />
            </a>
            <a href="https://x.com/Edugrantor?t=ajEYw1symy85PluRc8bn1g&s=09" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition-colors duration-300">
              <FaXTwitter size={24} />
            </a>
            <a href="https://www.instagram.com/edugrantors?igsh=azl3eXdlMmJrOGRh" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-pink-500 transition-colors duration-300">
              <FaInstagram size={24} />
            </a>
            <a href="https://www.linkedin.com/company/edugrantors/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-700 transition-colors duration-300">
              <FaLinkedinIn size={24} />
            </a>
            <a href="https://youtube.com/@edugrantors?si=EkQMXeM2GzHGk1sJ" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-700 transition-colors duration-300">
              <FaYoutube size={24} />
            </a>
            <a href="https://t.me/alish2512r" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-700 transition-colors duration-300">
              <FaTelegram size={24} />
            </a></div>
        </div>
        <div className="mb-8 md:mb-0 w-full md:w-1/3">
          <h3 className="text-xl font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/about" className="hover:underline hover:text-blue-600 transition-colors duration-300">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/courses" className="hover:underline hover:text-blue-600 transition-colors duration-300">
                Courses
              </Link>
            </li>
            <li>
              <a
                // href="https://res.cloudinary.com/drjgdryev/image/upload/v1737710771/Privacy__Policy_1_dxakeu.pdf" // Replace with the actual path to your PDF
                href="/tnc"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline hover:text-blue-600 transition-colors duration-300"
              >
                Terms & Conditions
              </a>
              {/* <Link href="https://res.cloudinary.com/drjgdryev/image/upload/v1737710862/Terms_and_Conditions_1_chklhq.pdf" className="hover:underline hover:text-blue-600 transition-colors duration-300">
                Terms & Conditions
              </Link> */}
            </li>
            <li>
              <a
                // href="https://res.cloudinary.com/drjgdryev/image/upload/v1737710771/Privacy__Policy_1_dxakeu.pdf" // Replace with the actual path to your PDF
                href="/refund-policy"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline hover:text-blue-600 transition-colors duration-300"
              >
                Refund / Cancellation Policy
              </a>
              {/* <Link href="https://res.cloudinary.com/drjgdryev/image/upload/v1737710935/Refund_1_gwfs4g.pdf" className="hover:underline hover:text-blue-600 transition-colors duration-300">
                Refund / Cancellation Policy
              </Link> */}
            </li>
            <li>
              <a
                // href="https://res.cloudinary.com/drjgdryev/image/upload/v1737710771/Privacy__Policy_1_dxakeu.pdf" // Replace with the actual path to your PDF
                href="/privacy-policy"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline hover:text-blue-600 transition-colors duration-300"
              >
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>
        <div className="w-full md:w-1/3">
          <h3 className="text-xl font-semibold mb-2">Contact Us</h3>
          <p className="mb-2">
            Email:{" "}
            <a href="mailto:support@edugrantor.com" className="text-blue-600 hover:underline">
              support@edugrantor.com
            </a>
          </p>
          <p>
            Phone:{" "}
            <a href="tel:+919798790328" className="text-blue-600 hover:underline">
              +91 979797XXXX
            </a>
          </p>
        </div>


      </div>
      <div className="border-t border-gray-300 mt-10 pt-6">
        <div className="text-center">

          <p className="text-sm">Copyright &copy; {new Date().getFullYear()} EDU GRANTORS. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
