import React from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';

export const navItemsData = [
    { name: "Home", url: "/" },
    { name: "About Us", url: "/about" },
    { name: "Courses", url: "/courses" },
    { name: "Resources", url: "/resources" },
    // { name: "Policy", url: "/policy" },
    // { name: "FAQ", url: "/faq" },
];

type Props = {
    activeItem: number;
    isMobile: boolean;
};

const NavItems: React.FC<Props> = ({ activeItem, isMobile }) => {
    return (
        <>
            <div className="hidden 800px:flex">
                {navItemsData.map((item, index) => (
                    <Link href={item.url} key={index}>
                        <span
                            className={`${activeItem === index
                                ? "dark:text-[#37a39a] text-[crimson]"
                                : "text-black dark:text-white"}
                                text-[18px] px-6 font-Poppins font-[400]`}>
                            {item.name}
                        </span>
                    </Link>
                ))}
            </div>
            {isMobile && (
                <div className="800px:hidden mt-5 ">
                    <div className="w-full text-center py-6">
                        <Link href={"/"} passHref>
                            <span
                                className={` text-[25px] font-Poppins font-[500] text-black dark:text-white  border-b-2 p-2`}>EDU GRANTORS</span>
                            

                        </Link>
                    </div>
                        {navItemsData.map((item, index) => (
                            <Link href={item.url} key={index}>
                                <span
                                    className={`${activeItem === index
                                        ? "dark:text-[#37a39a] text-[crimson]"
                                        : "text-black dark:text-white"}
                                        block py-5 text-[18px] px-6 font-Poppins font-[400]`}>
                                    {item.name}
                                </span>
                            </Link>
                        ))}
                    
                </div>
            )}
        </>
    );
};

export default NavItems;







