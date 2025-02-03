import React from 'react';
import { useGetEnrolledCoursesQuery } from '@/app/redux/features/user/userApi';
import Link from 'next/link';

type Props = {};

const EnrolledCourses: React.FC<Props> = ({  }) => {
  const { data, error, isLoading } = useGetEnrolledCoursesQuery({});

  if (isLoading) return <p className="loading">Loading...</p>;
  if (error) return <p className="error">Error: Unable to fetch enrolled courses</p>;

  return (
    <div className="container max-w-sm mx-auto p-6  rounded-lg shadow-md">
      <h1 className="sm:text-lg text-xs font-semibold text-center text-gray-900 dark:text-gray-100 mb-6">
        Your Enrolled Courses
      </h1>
      {data?.enrolledCourses?.length > 0 ? (
        <ul className="space-y-4 ">
          {data.enrolledCourses.map((course: { _id: string; name: string }) => (
            <li
              key={course._id}
              className=" border-[#44375991] border sm:p-4 px-4 flex justify-center items-center rounded-lg shadow transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
            >
              <Link
                href={`/course/${course._id}`}
                className="w-full flex justify-center items-center text-left bg-[#19043c2b] dark:bg-[#22083e19] rounded-lg sm:p-4 px-4 py-2 hover:bg-[#5b2ebc39] dark:hover:bg-[#3d1b4c] text-lg font-medium text-gray-900 dark:text-gray-200 hover:text-[#37a39a] transition-colors duration-300"
              >
                {course.name}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-500 dark:text-gray-400">
          You haven't enrolled in any courses yet.
        </p>
      )}
    </div>
  );
};

export default EnrolledCourses;
