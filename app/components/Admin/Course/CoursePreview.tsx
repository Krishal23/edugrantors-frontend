import React, { FC } from 'react';
import CoursePlayer from '../../../utils/CoursePlayer';
import { useTheme } from 'next-themes';
import { RiPriceTag2Fill } from 'react-icons/ri';
import { AiFillStar } from 'react-icons/ai';
import { IoMdCheckmark } from 'react-icons/io';

type Props = {
    active: number;
    setActive: (active: number) => void;
    courseData: any;
    handleCourseCreate: any;
    isEdit?:boolean;
    isloading:any;

}

const CoursePreview: FC<Props> = ({
    active,
    setActive,
    courseData,
    handleCourseCreate,
    isEdit,
    isloading
}) => {
    const discountPercentage = (
        (courseData?.estimatedPrice - courseData?.price) /
        courseData?.estimatedPrice * 100
    );
    const discountPercentagePrice = discountPercentage.toFixed(0);

    const { theme } = useTheme();

    const containerClass = theme === 'dark' ? 'text-white' : 'text-gray-900';
    const titleClass = theme === 'dark' ? 'text-white' : 'text-gray-800';

    return (
        <div className={`w-[90%] m-auto py-5 mb-5 ${containerClass} rounded-lg shadow-lg p-4`}>
            <div className="w-full relative">
                <div className="w-full mt-10">
                    <CoursePlayer
                        videoUrl={courseData?.demoUrl}
                        title={courseData?.name}
                    />
                </div>
                <div className="flex items-center my-4">
                    <h1 className={`pt-5 text-[25px] font-bold mx-8`}>
                        {courseData?.price === 0 ? "Free" : `${courseData?.price} Rs.`}
                    </h1>
                    <h5 className='pl-3 text-[20px] mt-3 line-through opacity-80'>
                        <RiPriceTag2Fill className="inline mr-1" />{courseData?.estimatedPrice} Rs.
                    </h5>
                    <h4 className='pl-5 pt-4 text-[22px] text-green-600 font-semibold'>
                        {discountPercentagePrice}% off
                    </h4>
                </div>
                <div className="mt-4  px-2">
                    <h3 className={`text-2xl mx-8 font-semibold ${titleClass} transition-colors duration-300`}>
                        {courseData?.name}
                    </h3>
                    <p className="my-2 mx-8 text-sm text-gray-500 leading-relaxed">
                        {courseData?.description}
                    </p>
                </div>

                {/* Ratings Section */}
                <div className="flex items-center mx-8 mt-4">
                    {Array.from({ length: 5 }, (_, index) => (
                        <AiFillStar key={index} className="text-yellow-500" />
                    ))}
                    <span className="ml-2 text-sm text-gray-500">({courseData?.ratings} Ratings)</span>
                </div>

                {/* What You'll Learn Section */}
                <div className="mt-4 mx-8">
                    <h4 className={`text-xl font-semibold ${titleClass}`}>What will you learn from this Course:</h4>
                    {courseData?.benefits?.map((item:any, index: number)=>(
                        <div className="w-full flex py-2 800px:items-center" key={index} >
                            <div className="mr-1 w-[15px] ">
                                <IoMdCheckmark size={20}/>
                            </div>
                            <p className='pl-2' >{item.title}</p>
                
                        </div>
                    ))}
                </div>
                


                {/* Prerequisites Section */}
                <div className="mt-4 mx-8">
                    <h4 className={`text-xl font-semibold ${titleClass}`}>Prerequisites:</h4>
                    {courseData?.prerequisites?.map((item:any, index: number)=>(
                        <div className="w-full flex py-2 800px:items-center" key={index} >
                            <div className="mr-1 w-[15px] ">
                                <IoMdCheckmark size={20}/>
                            </div>
                            <p className='pl-2' >{item.title}</p>
                
                        </div>
                    ))}
                </div>
               

                {/* Action Buttons */}
                <div className="flex justify-between mx-8 mt-6">
                    <button
                        onClick={() => setActive(active - 1)} // Navigate to previous step
                        className={`px-4 py-2 bg-gray-400 text-white font-bold rounded-lg shadow-md transform transition duration-300 hover:bg-gray-500 focus:outline-none  ${isloading && 'cursor-not-allowed'}`}
                    >
                        Previous
                    </button>
                    <button
                        onClick={handleCourseCreate}
                        className={`px-8 py-2 bg-purple-600 text-white font-bold rounded-lg shadow-md transform transition duration-300 hover:bg-purple-700 hover:scale-105 focus:outline-none ${isloading && 'cursor-not-allowed'}`}
                    >
                        {
                            isEdit ? isloading?"Updating":"Update" : isloading?"Creating": "Create"
                        }
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CoursePreview;
