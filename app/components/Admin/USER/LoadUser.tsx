import React, { useState } from "react";
import Loader from "../../Loader/Loader";
import dynamic from "next/dynamic";


const RenderCourses = dynamic(() => import('./RenderCourses'), {
    loading: () => <Loader message="Loading Courses..." />,
  });
const RenderProfile = dynamic(() => import('./RenderProfile'), {
    loading: () => <Loader message="Loading Profile..." />,
  });

const LoadUser = ({ user: userData }: any) => {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <div className="relative max-w-4xl m-8 bg-gray-900 rounded-xl shadow-lg overflow-hidden">
            <div className="flex gap-4 bg-gray-800 p-6">
                <div
                    className={`px-5 py-2 rounded-md text-sm font-medium transition-colors z-1000 ${activeTab === 0
                        ? "bg-indigo-500 text-gray-200"
                        : "bg-gray-700 text-gray-400 hover:bg-gray-600"
                        }`}
                    onClick={() => {

                        setActiveTab(0)
                    }}
                >
                    Profile
                </div>
                <div
                    className={`px-5 py-2 rounded-md text-sm font-medium transition-colors z-1000 ${activeTab === 1
                        ? "bg-indigo-500 text-gray-200"
                        : "bg-gray-700 text-gray-400 hover:bg-gray-600"
                        }`}
                    onClick={() => {
                        setActiveTab(1)
                    }}
                >
                    Courses
                </div>
            </div>
            {
                activeTab===0 && (<RenderProfile userData={userData}/>)
            }
            {
                activeTab===1 && (<RenderCourses userData={userData}/>)
            }
        </div>
    );
};

export default LoadUser;
