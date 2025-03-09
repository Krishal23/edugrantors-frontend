import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { RiPriceTag2Fill } from "react-icons/ri";
import Link from "next/link";
import {
  FaArchive,
  FaChalkboardTeacher,
  FaCheckCircle,
  FaEye,
} from "react-icons/fa";
import {
  useAddCouponMutation,
  useGetUsersMarksAdminQuery,
  useToggleCoursePublicityMutation,
  useUpdateTestMutation,
} from "@/app/redux/features/courses/coursesApi";
import { SiQuizlet } from "react-icons/si";
import { MdEditSquare, MdOnlinePrediction } from "react-icons/md";
import { GrSend } from "react-icons/gr";
import toast from "react-hot-toast";
import { useLoadUserQuery } from "@/app/redux/features/api/apiSlice";
import dynamic from "next/dynamic";
import Loader from "../../Loader/Loader";
import QuizList from "./QuizList";

const CouponPop = dynamic(() => import("./CouponPop"), {
  ssr: false,
  loading: () => <Loader message="Loading Coupons" />,
});
const AvailableCouponPop = dynamic(() => import("./AvailableCouponPop"), {
  ssr: false,
  loading: () => <Loader message="Loading Coupons" />,
});
const CoursePlayer = dynamic(() => import("@/app/utils/CoursePlayer"), {
  ssr: false,
  loading: () => <Loader message="Loading Player" />,
});

type Props = {
  courseData: any;
  refetch: any;
  teacher?: any;
};

const CourseDetails = ({ courseData, refetch, teacher }: Props) => {
  const { theme } = useTheme();

  const containerClass =
    theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-900";
  const titleClass = theme === "dark" ? "text-gray-100" : "text-gray-800";
  const subTextClass = theme === "dark" ? "text-gray-400" : "text-gray-600";

  const { data } = useLoadUserQuery({});
  const [updateTest] = useUpdateTestMutation();
  const [toggleCoursePublicity] = useToggleCoursePublicityMutation();
  const [addCoupon, { isSuccess, error }] = useAddCouponMutation();

  // const { data:quizData, isLoading, isError } = useGetUsersMarksAdminQuery({}); // Pass id to the query


  const [couponPop, setCouponPop] = useState(false);
  const [isPublic, setIsPublic] = useState(courseData?.isPublic);
  const [showConfirmationPopup, setShowConfirmationPopup] = useState(false);
  const [availableCouponPop, setAvailableCouponPop] = useState(false);
  const role = data?.user?.role;
  const teacherId = courseData?.teacher;

  useEffect(() => {
    if (isSuccess) {
      toast.success("Coupon added Successfully.");
    }
    if (error && "data" in error) {
      const errorMessage =
        (error as { data: { message: string } }).data?.message ||
        "An unknown error occurred";
      toast.error(errorMessage);
    }
  }, [error, isSuccess]);

  const setQuizLive = async (
    courseId: string,
    quizId: string,
    isLive: boolean
  ) => {
    toast.success(`${isLive}`);
    await updateTest({ courseId, quizId, isLive });
    refetch();
  };

  const handleCouponSubmit = async (couponData: {
    code: string;
    validity: string;
    discount: number;
    maxAllowed: number;
  }) => {
    await addCoupon({ id: courseData?._id, data: couponData });
    setCouponPop(false);
    refetch();
  };

  const handleClose = () => {
    setCouponPop(false);
  };
  const handleCloseAvailableCoupon = () => {
    setAvailableCouponPop(false);
  };

  const discountPercentage =
    ((courseData?.estimatedPrice - courseData?.price) /
      courseData?.estimatedPrice) *
    100;
  const discountPercentagePrice = discountPercentage.toFixed(0);

  const toggleCourseVisibility = async () => {
    try {
      await toggleCoursePublicity({
        courseId: courseData._id,
      });
      setIsPublic((prev: boolean) => !prev);
      refetch();
      toast.success(
        `Course is now ${!isPublic ? "Live" : "Archived"} successfully`
      );
    } catch (error) {
      console.error("Error toggling course visibility:", error);
      toast.error("Failed to update course visibility");
    }
    setShowConfirmationPopup(false);
  };


  console.log(courseData?.quizzes)
  return (
    <div
      className={` flex-col-reverse  text-zinc-800 dark:text-white justify-center w-[900px] ml-[2rem] p-8 my-24 rounded-lg shadow-lg ${containerClass}`}
    >
      {/* Course Header and Thumbnail */}
      <div className="relative mb-8 rounded-lg overflow-hidden">
        <img
          src={courseData?.thumbnail?.url}
          alt="Course Thumbnail"
          height={1800}
          width={1000}
          className="w-full h-48 object-cover rounded-lg"
        />
        <div className="absolute bottom-0 w-full p-4 bg-gradient-to-t from-black via-transparent">
          <h1 className="text-3xl font-bold text-white">{courseData?.name}</h1>
          <p className="text-gray-300">Level: {courseData?.level}</p>
          <p className="text-gray-300">Tags: {courseData?.tags}</p>
        </div>
      </div>

      {/* Video Demo */}
      <div className="mt-8">
        <div className="flex justify-between items-center">
          <h2 className={`text-2xl font-semibold ${titleClass}`}>
            Course Status
          </h2>
          <div className="flex flex-col mt-4">
            <button
              onClick={() => setShowConfirmationPopup(true)}
              className={`flex items-center justify-center px-6 py-3 text-white rounded-lg shadow-md transition-all duration-300 transform ${
                isPublic
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-gray-600 hover:bg-gray-700"
              }`}
            >
              {isPublic ? (
                <>
                  <FaCheckCircle className="mr-2" />
                  Live
                </>
              ) : (
                <>
                  <FaArchive className="mr-2" />
                  Archive
                </>
              )}
            </button>
          </div>
        </div>
        {/* Confirmation Popup */}
        {showConfirmationPopup && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="p-6 bg-gray-800 text-white rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold mb-4">
                Are you sure you want to{" "}
                <span className="font-bold">
                  {isPublic ? "Archive" : "Go Live"}
                </span>{" "}
                this course?
              </h3>
              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setShowConfirmationPopup(false)}
                  className="px-4 py-2 bg-gray-500 rounded-lg hover:bg-gray-600 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={toggleCourseVisibility}
                  className="px-4 py-2 bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-all"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}

        <CoursePlayer videoUrl={courseData?.demoUrl} title={courseData?.name} />
      </div>

      <div className="flex items-center justify-between my-4">
        <div className="flex items-center my-4">
          <h1 className={`pt-5 text-[25px] font-bold`}>
            {courseData?.price === 0 ? "Free" : `${courseData?.price} Rs.`}
          </h1>
          <h5 className="pl-3 text-[20px] mt-3 line-through opacity-80">
            <RiPriceTag2Fill className="inline mr-1" />
            {courseData?.estimatedPrice} Rs.
          </h5>
          <h4 className="pl-5 pt-4 text-[22px] text-green-600 font-semibold">
            {discountPercentagePrice}% off
          </h4>
        </div>
        {role === "admin" && (
          <div className="flex gap-2">
            <button
              onClick={() => {
                setAvailableCouponPop(true);
              }}
              className="flex items-center mt-4 px-6 py-3 text-white bg-indigo-600 hover:bg-indigo-700  rounded-lg shadow-md transition-all duration-300 transform hover:scale-105"
            >
              Available Coupons
            </button>
            <button
              onClick={() => {
                setCouponPop(true);
              }}
              className="flex items-center mt-4 px-6 py-3 text-white bg-gray-600 hover:bg-gray-700  rounded-lg shadow-md transition-all duration-300 transform hover:scale-105"
            >
              Create Coupons
            </button>
          </div>
        )}
      </div>
      <h3
        className={`text-lg mt-4 font-medium ${titleClass} transition-colors duration-300`}
      >
        {courseData?.description}
      </h3>

      {/* Key Details */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className={`text-lg font-semibold ${titleClass}`}>Level</h3>
          <p className={subTextClass}>{courseData?.level || "Not specified"}</p>
        </div>
        <div>
          <Link
            href={`/admin/enrolled-users/${courseData._id}`}
            className={`flex items-center gap-3 text-lg font-semibold ${titleClass}`}
          >
            Purchased <FaEye />
          </Link>
          <p className={subTextClass}>
            {courseData?.purchased} Students Enrolled{" "}
          </p>
        </div>
      </div>

      {/* Benefits */}
      <div className="mt-8">
        <h2 className={`text-2xl font-semibold ${titleClass}`}>
          What You’ll Learn
        </h2>
        <ul className="mt-4 space-y-3">
          {courseData?.benefits?.map((benefit: any, index: number) => (
            <li key={index} className={subTextClass}>
              - {benefit.title}
            </li>
          ))}
        </ul>
      </div>

      {/* Prerequisites */}
      <div className="mt-8">
        <h2 className={`text-2xl font-semibold ${titleClass}`}>
          Prerequisites
        </h2>
        <ul className="mt-4 space-y-3">
          {courseData?.prerequisites?.map((item: any, index: number) => (
            <li key={index} className={subTextClass}>
              - {item.title}
            </li>
          ))}
        </ul>
      </div>
      {/* Course Instructor */}
      <div className="mt-8">
        <h2 className={`text-2xl font-semibold ${titleClass}`}>
          Course Instructor
        </h2>

        <Link href={`/admin/user/${teacherId}`} passHref>
          <div className="group p-4 rounded-lg shadow-md border border-zinc-300 dark:border-zinc-700 max-w-xs mt-2 bg-white dark:bg-gray-700 hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-700 hover:shadow-lg transition-all duration-300 cursor-pointer">
            <div className="flex items-center space-x-3">
              <FaChalkboardTeacher className="text-white text-xl" />
              <span className="text-zinc-800 dark:text-white group-hover:text-white font-medium">
                {teacher}
              </span>
            </div>
          </div>
        </Link>
      </div>

      {/* Ratings & Reviews */}
      {/* <div className="mt-8">
        <h2 className={`text-2xl font-semibold ${titleClass}`}>Ratings & Reviews</h2>
        <div className="flex items-center mt-4">
          {Array.from({ length: 5 }, (_, index) => (
            <AiFillStar
              key={index}
              className={index < Math.round(courseData?.ratings) ? "text-yellow-500" : "text-gray-300"}
              size={24}
            />
          ))}
          <span className={`ml-4 text-lg ${subTextClass}`}>{courseData?.ratings} out of 5</span>
        </div>
        <div className="mt-4">
          <ul className="space-y-4">
            {courseData?.reviews?.map((review: any, index: number) => (
              <li key={index} className={`border-b pb-4 ${subTextClass}`}>
                <p>"{review.comment}"</p>
                <p className="mt-1 text-sm text-gray-500">- {review.user}</p>
              </li>
            ))}
          </ul>
        </div>
      </div> */}

      {/* Tags */}
      <div className="mt-8">
        <h2 className={`text-2xl font-semibold ${titleClass}`}>Tags</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {courseData?.tags?.split(",").map((tag: string, index: number) => (
            <span
              key={index}
              className="px-3 py-1 bg-purple-100 text-purple-600 rounded-lg text-sm"
            >
              {tag.trim()}
            </span>
          ))}
        </div>
      </div>

  
      

      <QuizList courseData={courseData} setQuizLive={setQuizLive}/>



      {/* Metadata */}
      <div className="mt-8">
        <h2 className={`text-2xl font-semibold ${titleClass}`}>Metadata</h2>
        <p className={`mt-4 ${subTextClass}`}>
          Created At: {new Date(courseData?.createdAt).toLocaleString()}
        </p>
        <p className={subTextClass}>
          Updated At: {new Date(courseData?.updatedAt).toLocaleString()}
        </p>
        <p className={subTextClass}>Course ID: {courseData?._id}</p>
      </div>

      {couponPop && (
        <div
          className={`fixed ml-14 inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50`}
        >
          <div
            className={` h-[90vh] overflow-y-scroll p-6 bg-gray-800 text-white rounded-lg shadow-lg`}
          >
            <CouponPop onSubmit={handleCouponSubmit} onClose={handleClose} />
          </div>
        </div>
      )}
      {availableCouponPop && (
        <div
          className={`fixed ml-14  inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50`}
        >
          <div
            className={` h-[80vh]  overflow-y-scroll p-6 bg-transparent text-white rounded-lg shadow-lg`}
          >
            <AvailableCouponPop
              courseId={courseData?._id}
              onClose={handleCloseAvailableCoupon}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseDetails;
