import { useGetUsersAllCoursesQuery } from '@/app/redux/features/courses/coursesApi';
import React, {  useEffect, useState } from 'react';
import Loader from '../Loader/Loader';
import toast from 'react-hot-toast';
import dynamic from 'next/dynamic';

const CourseCard = dynamic(() => import('../Course/CourseCard'), { 
  loading: () => <Loader message='Loading Course..'/>, 
});


const Courses = () => {
    const { data, isLoading, error } = useGetUsersAllCoursesQuery({});
    const [courses, setCourses] = useState<any[]>([]);
    const [visibleCourses, setVisibleCourses] = useState(4); // Initial courses to display

    useEffect(() => {
        setCourses(data?.courses || []);
        if (error) {
            toast.error("Could not load page. Try to refresh.");
        }
    }, [data, error]);

       const handleSeeMore = () => {
        setVisibleCourses((prevVisibleCourses) => prevVisibleCourses + 6); // Load 6 more courses on each click
    };

    


    return (
        <>
            {
                isLoading|| error ? (
                    error && (<>Courses Loading</>)
                    // <Loader/>
                ) : (
                    <div className="w-full min-h-screen flex flex-col items-center py-[70px] bg-gradient-to-br from-[#9b88bc] to-[#a188d7] dark:from-gray-800 dark:to-gray-900 text-white">

                        {/* <div className={`w-full min-h-screen flex justify-center ${containerClass} py-10`}> */}
                        <div className="max-w-[1100px] w-[90%] mx-auto">
                            <div className="text-center py-10">
                                <h1 className="text-[2.5rem] font-bold leading-tight mb-2">
                                    Unlock your <span className="text-[#050410] dark:text-[#7c3aed]">Potential</span>
                                </h1>
                                <h2 className="text-[2.5rem] font-bold leading-tight mb-4">
                                    with our <span className="text-[#050410] dark:text-[#7c3aed]">Personal Mentorship</span> Programme
                                </h2>
                                
                                <p className="text-[1rem] mt-4 text-gray-900 dark:text-gray-300">
                                    Discover a world of learning and growth, tailored to help you reach your career goals.
                                </p>
                            </div>

                            {/* Course Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
                                {courses.slice(0, visibleCourses).map((item: any, index: number) => (
                                    <CourseCard
                                        key={index}
                                        item={item}
                                        id={item.id}
                                        title={item.title}
                                        description={item.description}
                                        thumbnail={item.thumbnail}
                                    />
                                ))}
                            </div>

                            {/* See More Button */}
                            {visibleCourses < courses.length && (
                                <div className="flex justify-center mt-8">
                                    <button
                                        onClick={handleSeeMore}
                                        className="px-6 py-3 text-lg rounded-full transition-all duration-300 bg-[#6b5cee] text-white hover:bg-[#4e4ab1] shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-[#6b5cee] focus:ring-opacity-50"
                                    >
                                        See More
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                )
            }
        </>

    );
};

export default Courses;
