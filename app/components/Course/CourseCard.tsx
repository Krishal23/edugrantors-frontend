// components/CourseCard.tsx
import Link from "next/link";
import React from "react";

import { AiOutlineUnorderedList } from "react-icons/ai";
import { RiPriceTag2Fill } from "react-icons/ri";

type CourseCardProps = {
  item: any;
  id: string;
  title: string;
  description: string;
  isProfile?: boolean;
  thumbnail: string;
};

const img = "/assets/4.jpg";

const CourseCard: React.FC<CourseCardProps> = ({
  item,
  title,
  description,
  isProfile,
}) => {
  return (
    <Link
      href={!isProfile ? `/course/${item._id}` : `course-access/${item._id}`}
    >
      <div className="p-6 bg-[#7b64ab5b] border  dark:border-transparent dark:bg-[#1f2937] rounded-lg shadow-lg hover:shadow-xl transform transition duration-300 hover:scale-105">
        <div className="w-full h-40 bg-gray-200 dark:bg-[#374151] rounded-md overflow-hidden relative">
          <img
            src={item.thumbnail ? item.thumbnail.url : img}
            alt={title}
            // layout="fill"
            // objectFit="cover"
            className="rounded-md"
          />
        </div>
        {/* <div className="w-full flex items-center justify-between">
                    <div className="flex items-center justify-between p-2">
                        <Ratings rating={item.ratings} />
                    </div>
                    <h5 className={`text-black dark:text-white ${isProfile && "hidden 800px:inline"}`}>
                        {item.purchased} Students
                    </h5>
                </div> */}
        <h3 className="mt-4 text-lg font-bold text-gray-900 dark:text-white">
          {title}
        </h3>
        <p className="mt-2 text-gray-900 h-[64px] dark:text-gray-300 text-sm line-clamp-3">
          {description}
        </p>

        {/* Course Price and Buy Button */}
        <div className="mt-4 flex items-center justify-between">
          <div>
            <h2 className="sm:text-3xl text-lg font-semibold text-green-500">
              {item.price === 0 ? "Free" : `${item.price} Rs.`}
            </h2>
            {item.estimatedPrice > item.price && (
              <div className="sm:text-sm text-xs text-gray-600 flex items-center">
                <RiPriceTag2Fill className="mr-1" />
                <span className="line-through">{item.estimatedPrice} Rs.</span>
                {/* <span className="text-green-500 ml-3 font-semibold">{discountPercentage}% off</span> */}
              </div>
            )}
          </div>

          {/* <div className="mt-4 flex items-center justify-between">
                        <h3 className="text-gray-900 dark:text-white">
                            {item.price === 0 ? "Free" : item.price + "Rs."}
                        </h3>
                        <h5 className='pl-3 mb-[4px] text-[12px] line-through opacity-80 text-gray-900 dark:text-white '>
                            {item.estimatedPrice}Rs.
                        </h5>
                    </div> */}

          <div className="flex items-center justify-center">
            <AiOutlineUnorderedList size={15} fill="#fff" />
            <h6 className="text-[15px] pl-2 text-gray-900 dark:text-white">
              {item.courseData?.length} Lectures
            </h6>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;
