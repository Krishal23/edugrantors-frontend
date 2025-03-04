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
import { useGetCourseDetailsQuery, useValidateCouponMutation } from "@/app/redux/features/courses/coursesApi";

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
  id: string;
  setOpen: (open: boolean) => void;
};

const CourseDetails: FC<Props> = ({ setOpen: setLogin, id }) => {
  const { theme } = useTheme();
  const [couponPop, setCouponPop] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState<string>("");
  const [discountedPrice, setDiscountedPrice] = useState<number>(0);
  const [couponError, setCouponError] = useState<string>("");
  const [isEnrolling, setIsEnrolling] = useState(false);

  // Data fetching
  const { 
    data: courseData, 
    refetch: refetchCourse, 
    isLoading: courseLoading,
    isError: courseError
  } = useGetCourseDetailsQuery(id);
  
  const { 
    data: userData, 
    refetch: refetchUser, 
    isLoading: userLoading
  } = useLoadUserQuery({});

  // Payment mutations
  const [createOrder, { isLoading: isOrderCreating }] = useCreateOrderMutation();
  const [updateCourse, { isLoading: isUpdating }] = useUpdateCourseMutation();
  const [validateCoupon, { isLoading: isValidatingCoupon, error: couponValidationError }] = useValidateCouponMutation();

  // Loading state combines all active loading states
  const isPageLoading = courseLoading || userLoading;
  const isProcessing = isOrderCreating || isUpdating || isValidatingCoupon || isEnrolling;

  // Extract course data
  const course = courseData?.course || {};
  const {
    _id: courseId,
    name,
    thumbnail,
    price = 0,
    estimatedPrice = 0,
    demoUrl,
    description,
    tags,
    level,
    benefits = [],
    prerequisites = [],
    courseData: curriculum = [],
  } = course;

  const user = userData?.user;
  
  // Set initial discounted price when course data loads
  useEffect(() => {
    if (price && discountedPrice === 0) {
      setDiscountedPrice(price);
    }
  }, [price, discountedPrice]);

  // Check if user has already purchased the course
  const isPurchased = user?.courses?.some(
    (item: any) => item.courseId === courseId
  );

  // Calculate discount percentage
  const discountPercentage = estimatedPrice > 0
    ? ((estimatedPrice - price) / estimatedPrice * 100).toFixed(0)
    : "0";

  // Handle coupon validation errors
  useEffect(() => {
    if (couponValidationError && "data" in couponValidationError) {
      const errorMessage = couponValidationError.data?.message || "Invalid coupon";
      setCouponError(errorMessage);
    }
  }, [couponValidationError]);

  // Refresh data after payment
  const refreshData = async () => {
    await Promise.all([refetchUser(), refetchCourse()]);
  };

  // Apply coupon handler
  const handleApplyCoupon = async () => {
    if (!selectedCoupon.trim()) {
      setCouponError("Please enter a coupon code");
      return;
    }
    
    setCouponError("");
    
    try {
      const response: any = await validateCoupon({
        id: courseId,
        couponId: selectedCoupon,
      }).unwrap();
      
      const coupon = response?.coupon;
      if (!coupon) {
        setCouponError("Invalid or expired coupon");
        return;
      }
      
      const newPriced = Math.max(price - (price * coupon.discount) / 100, 0);
      const newPrice = parseFloat(newPriced.toFixed(2));
      setDiscountedPrice(newPrice);
      
      toast.success(`Coupon applied! You saved ${(price - newPrice).toFixed(2)} Rs.`);
    } catch (error) {
      // Error is handled in useEffect
    }
  };

  // Reset coupon handler
  const handleResetCoupon = () => {
    setDiscountedPrice(price);
    setSelectedCoupon("");
    setCouponError("");
  };

  // Handle payment process
  const handlePay = async () => {
    if (!user) {
      setLogin(true);
      return;
    }
    
    try {
      setIsEnrolling(true);
      
      const response = await createOrder({
        amount: discountedPrice,
        currency: "INR",
        receipt: `receipt_${courseId}`,
        notes: { courseName: name },
      }).unwrap();

      if (!response?.order?.id) {
        toast.error("Order creation failed!");
        setIsEnrolling(false);
        return;
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: discountedPrice * 100,
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
            
            toast.success("Payment successful! You are now enrolled.");
            await refreshData();
            setCouponPop(false);
          } catch (error) {
            toast.error("Failed to update enrollment status.");
          } finally {
            setIsEnrolling(false);
          }
        },
        theme: { color: "#3399cc" },
      };

      const razorpayInstance = new (window as any).Razorpay(options);
      
      razorpayInstance.on('payment.failed', function() {
        toast.error("Payment failed. Please try again.");
        setIsEnrolling(false);
      });
      
      razorpayInstance.open();
      
    } catch (error) {
      toast.error("Payment initialization failed. Please try again.");
      setIsEnrolling(false);
    }
  };

  // Render loading state
  if (isPageLoading) {
    return <Loader message="Loading course details..." />;
  }

  // Render error state
  if (courseError) {
    return (
      <div className="w-[95%] md:w-3/4 lg:w-2/3 m-auto py-8 mb-10 bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6">
        <h2 className="text-xl text-red-500 text-center">Failed to load course. Please try again later.</h2>
        <button 
          onClick={() => refetchCourse()} 
          className="mt-4 mx-auto block px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    );
  }

  const titleClass = theme === "dark" ? "text-white" : "text-gray-800";

  return (
    <>
      <div>
        <Script
          src="https://checkout.razorpay.com/v1/checkout.js"
          strategy="lazyOnload"
        />

        <div className="w-[95%] md:w-3/4 lg:w-2/3 m-auto py-8 mb-10 bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 xxs:p-4">
          <div className="relative mb-8 rounded-lg overflow-hidden">
            {thumbnail?.url && (
              <img
                src={thumbnail.url}
                alt="Course Thumbnail"
                width={360}
                height={360}
                className="w-full sm:h-48 xxs:h-16 object-cover rounded-lg"
              />
            )}
            <div className="absolute bottom-0 w-full p-4 bg-gradient-to-t from-black via-transparent">
              <h1 className="sm:text-3xl text-xs font-bold text-white">{name}</h1>
              <p className="sm:text-xl text-xs text-gray-300">Level: {level}</p>
              <p className="sm:text-xl text-xs text-gray-300">Tags: {tags}</p>
            </div>
          </div>

          {demoUrl && <CoursePlayer videoUrl={demoUrl} title={name} />}

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
                    onClick={() => setCouponPop(true)}
                    disabled={isProcessing}
                    className={`sm:px-10 sm:py-3 py-2 px-4 sm:text-lg text-xs bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold rounded-lg shadow-lg hover:scale-105 transform transition duration-300 ${isProcessing ? 'opacity-70 cursor-not-allowed' : ''}`}
                  >
                    {isProcessing ? "Processing..." : "Enroll Now"}
                  </button>
                  
                  {couponPop && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                      <div className="bg-white dark:bg-gray-900 w-full max-w-sm mx-4 rounded-lg shadow-lg p-6 relative">
                        <button
                          onClick={() => setCouponPop(false)}
                          disabled={isProcessing}
                          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none"
                        >
                          ✖
                        </button>
                        <h4 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
                          Apply a Coupon
                        </h4>

                        {(!discountedPrice || discountedPrice === price) ? (
                          <>
                            <div className="flex items-center gap-2">
                              <input
                                type="text"
                                value={selectedCoupon}
                                onChange={(e) => setSelectedCoupon(e.target.value)}
                                disabled={isProcessing}
                                placeholder="Enter Coupon Code"
                                className="p-3 border border-gray-300 rounded-l-md flex-grow text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                              />
                              <button
                                onClick={handleApplyCoupon}
                                disabled={isValidatingCoupon || !selectedCoupon.trim()}
                                className={`bg-indigo-500 text-white px-4 py-2 rounded-r-md hover:bg-indigo-600 text-sm transition ${isValidatingCoupon ? 'opacity-70 cursor-not-allowed' : ''}`}
                              >
                                {isValidatingCoupon ? "..." : "Apply"}
                              </button>
                            </div>
                            {couponError && (
                              <p className="text-red-500 mt-2 text-sm">
                                {couponError}
                              </p>
                            )}
                          </>
                        ) : (
                          <p className="text-green-500 mt-2 text-sm font-medium">
                            Coupon Applied! Discounted Price: {discountedPrice} Rs.
                          </p>
                        )}

                        <div className="mt-6 flex justify-between">
                          <button
                            onClick={handleResetCoupon}
                            disabled={isProcessing}
                            className={`bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 text-sm transition ${isProcessing ? 'opacity-70 cursor-not-allowed' : ''}`}
                          >
                            Reset Coupon
                          </button>
                          <button
                            onClick={handlePay}
                            disabled={isProcessing}
                            className={`bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 text-sm transition ${isProcessing ? 'opacity-70 cursor-not-allowed' : ''}`}
                          >
                            {isProcessing ? "Processing..." : "Pay Now"}
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
            {benefits.length > 0 ? (
              benefits.map((item, index) => (
                <div
                  className="w-full flex py-2 dark:text-gray-400 text-gray-700 leading-relaxed"
                  key={index}
                >
                  <IoMdCheckmark size={20} className="mr-1 text-green-500" />
                  <p>{item.title}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500 italic py-2">No benefits listed for this course.</p>
            )}
          </div>

          <div className="mt-4">
            <h4
              className={`sm:text-2xl text-lg border-l-4 p-2 border-green-500 font-semibold ${titleClass}`}
            >
              Prerequisites:
            </h4>
            {prerequisites.length > 0 ? (
              prerequisites.map((item, index) => (
                <div
                  className="w-full flex py-2 dark:text-gray-400 text-gray-700 leading-relaxed"
                  key={index}
                >
                  <IoMdCheckmark size={20} className="mr-1 text-green-500" />
                  <p>{item.title}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500 italic py-2">No prerequisites required for this course.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseDetails;