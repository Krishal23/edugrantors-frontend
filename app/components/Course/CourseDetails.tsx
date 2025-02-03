import React, { FC, useEffect, useState } from "react";
import { RiPriceTag2Fill } from "react-icons/ri";
import Link from "next/link";
import Script from "next/script";
import dynamic from "next/dynamic";
import { useLoadUserQuery } from "@/app/redux/features/api/apiSlice";
import {
  useCreateOrderMutation,
  useUpdateCourseMutation,
} from "@/app/redux/features/orders/orderApi";
import toast from "react-hot-toast";
import Loader from "../Loader/Loader";
import { IoMdCheckmark } from "react-icons/io";
import { useTheme } from "next-themes";
import { useValidateCouponMutation } from "@/app/redux/features/courses/coursesApi";

const CoursePlayer = dynamic(() => import("@/app/utils/CoursePlayer"), {
  loading: () => <Loader message="Loading Video..." />,
});

const CourseContentList = dynamic(
  () => import("../Admin/Course/CourseContentList"),
  {
    loading: () => <Loader message="Loading Curriculum..." />,
  }
);

type Props = {
  courseData: {
    _id: string;
    name: string;
    thumbnail: { url: string };
    price: number;
    estimatedPrice: number;
    demoUrl: string;
    description: string;
    tags: string;
    level: string;
    benefits: { title: string }[];
    prerequisites: { title: string }[];
    courseData: any;
  };
  setOpen: (open: boolean) => void;
  refetch: any;
};

const CourseDetails: FC<Props> = ({
  courseData,
  setOpen: setLogin,
  refetch: refetchCourse,
}) => {
  const {
    _id: courseId,
    name,
    thumbnail,
    price,
    estimatedPrice,
    demoUrl,
    description,
    tags,
    level,
    benefits,
    prerequisites,
    courseData: curriculum,
  } = courseData;
  const { theme } = useTheme();
  const { data: userData, refetch } = useLoadUserQuery({});
  const user = userData;

  const [createOrder] = useCreateOrderMutation();
  const [updateCourse] = useUpdateCourseMutation();

  const [couponPop, setCouponPop] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState<string>("");
  const [discountedPrice, setDiscountedPrice] = useState<number>(price);
  const [couponError, setCouponError] = useState<string>("");

  const isPurchased = user?.user?.courses?.some(
    (item: any) => item.courseId === courseId
  );
  const discountPercentage = (
    ((estimatedPrice - price) / estimatedPrice) *
    100
  ).toFixed(0);

  const [validateCoupon, { error }] = useValidateCouponMutation();

  useEffect(() => {
    if (error && "data" in error) {
      const errorMessage = error.data?.message || "An unknown error occurred";
      toast.error(errorMessage);
    }
    refetch();
  }, [refetch, error]);

  const handleApplyCoupon = async () => {
    const response: any = await validateCoupon({
      id: courseId,
      couponId: selectedCoupon,
    });
    const coupon = response?.data?.coupon;
    if (!coupon) {
      setCouponError("Invalid or expired coupon.");
      return;
    }
    const newPriced = Math.max(price - (price * coupon.discount) / 100, 0);
    const newPrice = parseFloat(newPriced.toFixed(2));
    setDiscountedPrice(newPrice);

    setCouponError("");
    toast.success(`Coupon applied! You saved ${price - newPrice} Rs.`);
  };

  const handlePay = async () => {
    if (!user) {
      setLogin(true);
      return;
    }
    try {
      const response = await createOrder({
        amount: discountedPrice ? discountedPrice : price,
        currency: "INR",
        receipt: `receipt_${courseId}`,
        notes: { courseName: name },
      }).unwrap();

      if (!response?.order?.id) {
        toast.error("Order creation failed!");
        return;
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: price * 100,
        currency: "INR",
        name: "Edu GRANTORS",
        description: "Course Payment",
        image: "/assets/6.png",
        order_id: response.order.id,
        handler: async (paymentResponse: any) => {
          try {
            await updateCourse({
              courseId,
              courseName: name,
              payment_info: paymentResponse,
              couponCode: selectedCoupon,
            }).unwrap();
            toast.success("Payment successful!");
          } catch {
            toast.error("Failed to update course information.");
          }
        },
        // prefill: {
        //   name: 'Edu Grantors',
        //   email: 'edugrantor@gmail.com',
        //   contact: '9798790328',
        // },
        theme: { color: "#3399cc" },
      };

      const razorpayInstance = new (window as any).Razorpay(options);
      razorpayInstance.open();
      refetch();
      refetchCourse();

      setCouponPop(false);
    } catch {
      toast.error("Payment failed. Please try again.");
    }
  };

  const titleClass = theme === "dark" ? "text-white" : "text-gray-800";

  return (
    <div>
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="lazyOnload"
      />

      <div className="w-[95%] md:w-3/4 lg:w-2/3 m-auto py-8 mb-10 bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 xxs:p-4">
        <div className="relative mb-8 rounded-lg overflow-hidden">
          <img
            src={thumbnail?.url}
            alt="Course Thumbnail"
            width={360}
            height={360}
            className="w-full sm:h-48 xxs:h-16 object-cover rounded-lg"
          />
          <div className="absolute bottom-0 w-full p-4 bg-gradient-to-t from-black via-transparent">
            <h1 className="sm:text-3xl text-xs font-bold text-white">{name}</h1>
            <p className="sm:text-xl text-xs text-gray-300">Level: {level}</p>
            <p className="sm:text-xl text-xs text-gray-300">Tags: {tags}</p>
          </div>
        </div>

        <CoursePlayer videoUrl={demoUrl} title={name} />

        <div className="flex items-center justify-between mt-6 px-2">
          <div>
            <h2 className="sm:text-3xl text-lg font-semibold text-green-500">
              {price === 0 ? "Free" : `${price} Rs.`}
            </h2>
            {estimatedPrice > price && (
              <div className="sm:text-lg text-sm text-gray-600 flex items-center">
                <RiPriceTag2Fill className="mr-1" />
                <span className="line-through">{estimatedPrice} Rs.</span>
                <span className="text-green-500 ml-3 font-semibold">
                  {discountPercentage}% off
                </span>
              </div>
            )}
          </div>
          <div>
            {isPurchased ? (
              <Link
                href={`/course-access/${courseId}`}
                className="sm:px-10 sm:py-3 py-2 px-4 sm:text-lg text-xs bg-gradient-to-r from-green-600 to-blue-600 text-white font-bold rounded-lg shadow-lg hover:scale-105 transform transition duration-300"
              >
                Learn
              </Link>
            ) : (
              <div>
                <button
                  onClick={() => {
                    setCouponPop(true);
                  }}
                  className="sm:px-10 sm:py-3 py-2 px-4 sm:text-lg text-xs bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold rounded-lg shadow-lg hover:scale-105 transform transition duration-300"
                >
                  Enroll Now
                </button>
                {couponPop && (
                  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white dark:bg-gray-900 w-full max-w-sm mx-4 rounded-lg shadow-lg p-6 relative">
                      <button
                        onClick={() => setCouponPop(false)}
                        className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none"
                      >
                        ✖
                      </button>
                      <h4 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
                        Apply a Coupon
                      </h4>

                      {!discountedPrice || discountedPrice === price ? (
                        <>
                          <div className="flex items-center gap-2">
                            <input
                              type="text"
                              value={selectedCoupon}
                              onChange={(e) =>
                                setSelectedCoupon(e.target.value)
                              }
                              placeholder="Enter Coupon Code"
                              className="p-3 border border-gray-300 rounded-l-md flex-grow text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                            <button
                              onClick={handleApplyCoupon}
                              className="bg-indigo-500 text-white px-4 py-2 rounded-r-md hover:bg-indigo-600 text-sm transition"
                            >
                              Apply
                            </button>
                          </div>
                          {couponError && (
                            <p className="text-red-500 mt-2 text-sm">
                              {couponError}
                            </p>
                          )}
                        </>
                      ) : (
                        <p className="text-green-500 mt-2 text-sm">
                          Coupon Applied! Discounted Price: {discountedPrice}{" "}
                          Rs.
                        </p>
                      )}

                      <div className="mt-6 flex justify-between">
                        <button
                          onClick={() => {
                            setDiscountedPrice(price);
                            setSelectedCoupon("");
                          }}
                          className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 text-sm transition"
                        >
                          Reset Coupon
                        </button>
                        <button
                          onClick={handlePay}
                          className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 text-sm transition"
                        >
                          Pay Now
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 px-2 border-l-4 border-indigo-500 pl-4">
          <h2 className="sm:text-2xl text-lg dark:text-gray-400 text-black font-semibold mb-4">
            Course Description
          </h2>
          <p className="dark:text-gray-300 text-black leading-relaxed">
            {description}
          </p>
        </div>

        <div className="mt-8 px-2">
          <h3 className="sm:text-2xl text-lg font-semibold dark:text-gray-400 text-black mb-4 border-b-2 border-indigo-500 pb-2">
            Curriculum
          </h3>
          <CourseContentList data={curriculum} />
        </div>

        <div className="mt-4">
          <h4
            className={`sm:text-2xl text-lg border-l-4 p-2 border-orange-500 font-semibold ${titleClass}`}
          >
            What will you learn from this Course:
          </h4>
          {benefits?.map((item, index) => (
            <div
              className="w-full flex py-2 text-gray-400 leading-relaxed"
              key={index}
            >
              <IoMdCheckmark size={20} className="mr-1" />
              <p>{item.title}</p>
            </div>
          ))}
        </div>

        <div className="mt-4">
          <h4
            className={`sm:text-2xl text-lg border-l-4 p-2 border-green-500 font-semibold ${titleClass}`}
          >
            Prerequisites:
          </h4>
          {prerequisites?.map((item, index) => (
            <div
              className="w-full flex py-2 text-gray-400 leading-relaxed"
              key={index}
            >
              <IoMdCheckmark size={20} className="mr-1" />
              <p>{item.title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
