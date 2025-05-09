"use client";
import React, { FC } from "react";

import { AiFillStar } from "react-icons/ai";
import { useTheme } from "next-themes";

type Review = {
  username: string;
  rating: number;
  reviewText: string;
  profileImage?: string;
};

const defaultImage = "/assets/6.png";
const reviews: Review[] = [
  {
    username: "Ayush, NIT Kurukshetra",
    rating: 5,
    reviewText:
      "This test series help me to realise my mistake and reduced the exam pressure. The question were relevant and covered various types of questions.The mentors helped me to understand my weak areas and work on it. They also told the important topics which must be covered and it helped me to boost my score.",
    profileImage: "/reviews/Ayush.jpg",
  },
  {
    username: "Raunak, NIT Durgapur",
    rating: 4,
    reviewText:
      "Their mentorship programme gave me consistent support and motivatation in last moments of JEE preparation. The test series was perfect blueprint of what asked in JEE exam which boosted my rank a lot.",
    profileImage: "",
  },
  {
    username: "Rachit Raj, NIT Bhopal",
    rating: 4,
    reviewText:
      "Their mentorship programme gave me consistent support and motivatation in last moments of JEE preparation. The test series was perfect blueprint of what asked in JEE exam which boosted my rank a lot.",
    profileImage: "/reviews/RachitRaj.jpg",
  },
];

const Reviews: FC = () => {
  const { theme } = useTheme();
  const containerClass =
    theme === "dark"
      ? "bg-gradient-to-b from-gray-800 to-black text-white"
      : "bg-gradient-to-b from-gray-200 to-white text-black";

  const cardClass =
    theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-900";

  return (
    <div className={`w-full py-10 px-4 sm:px-8 md:px-16 ${containerClass}`}>
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-center mb-10 leading-tight">
        What Our Students Say
      </h2>

      <div className="grid gap-6 sm:gap-8 md:gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
        {reviews.map((review, index) => (
          <div
            key={index}
            className={`flex flex-col items-center rounded-xl p-4 sm:p-6 md:p-8 shadow-lg transform transition-transform hover:scale-105 hover:shadow-2xl group border-2 border-transparent hover:border-purple-600 dark:hover:border-indigo-500 ${cardClass}`}
          >
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full overflow-hidden mb-4 shadow-lg transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110">
              <img
                src={review.profileImage || defaultImage}
                alt={`${review.username}'s profile`}
                // layout="fill"
                // objectFit="cover"
                className="rounded-full"
              />
            </div>
            <h3 className="text-lg sm:text-xl md:text-2xl font-semibold mb-2 text-center">
              {review.username}
            </h3>

            <div className="flex mb-3">
              {Array.from({ length: 5 }).map((_, starIndex) => (
                <AiFillStar
                  key={starIndex}
                  className={`text-lg sm:text-xl md:text-2xl transition-colors ${
                    starIndex < review.rating
                      ? "text-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>

            <p className="text-sm sm:text-base md:text-lg leading-relaxed text-center italic text-gray-600 dark:text-gray-300">
              "{review.reviewText}"
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;
